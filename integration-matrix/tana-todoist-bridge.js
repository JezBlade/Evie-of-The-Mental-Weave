// 🎯 TANA → TODOIST INTEGRATION
// Converts TANA insights into actionable Todoist tasks
// Step A of the next integration chain

// Using standard fetch for Todoist REST API
import { RetryHandler, CircuitBreaker, AuditLogger } from './resilience-utils.js';
import fs from 'fs';
import path from 'path';

class TanaToDoistBridge {
  constructor() {
    this.todoistToken = process.env.TODOIST_API_TOKEN;
    this.todoistBaseUrl = 'https://api.todoist.com/rest/v2';
    this.circuitBreaker = new CircuitBreaker(3, 30000);
    this.auditLogger = new AuditLogger('D:/Evie-of-the-Mental-Weave/logs/tana-todoist-audit.jsonl');
    
    this.config = {
      tanaNotesPath: 'D:/Evie-of-the-Mental-Weave/tana-notes',
      actionTags: ['#task', '#action', '#todo', '#project'],
      defaultProject: 'Evie Mental Weave',
      dryRun: false
    };
  }

  async syncTanaToTodoist(options = {}) {
    this.config.dryRun = options.dryRun || false;
    
    try {
      console.log('🎯 Starting TANA → Todoist sync...');
      await this.auditLogger.log('tana_todoist_sync_start', { dryRun: this.config.dryRun });

      const tanaFiles = this.getTanaFiles();
      const actionableNodes = await this.extractActionableNodes(tanaFiles);
      const tasks = await this.convertToTodoistTasks(actionableNodes);
      
      if (!this.config.dryRun) {
        await this.createTodoistTasks(tasks);
      }

      console.log(`✅ Processed ${tasks.length} actionable items (dry-run: ${this.config.dryRun})`);
      await this.auditLogger.log('tana_todoist_sync_complete', { 
        tasksProcessed: tasks.length, 
        dryRun: this.config.dryRun 
      });

      return tasks;
    } catch (error) {
      console.error('❌ TANA → Todoist sync failed:', error.message);
      await this.auditLogger.log('tana_todoist_sync_error', { error: error.message });
      throw error;
    }
  }

  getTanaFiles() {
    if (!fs.existsSync(this.config.tanaNotesPath)) {
      return [];
    }

    return fs.readdirSync(this.config.tanaNotesPath)
      .filter(file => file.endsWith('.json') || file.endsWith('.md'))
      .map(file => path.join(this.config.tanaNotesPath, file));
  }

  async extractActionableNodes(files) {
    const actionableNodes = [];

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        
        if (file.endsWith('.json')) {
          const data = JSON.parse(content);
          if (data.nodes) {
            actionableNodes.push(...this.findActionableInNodes(data.nodes));
          }
        } else if (file.endsWith('.md')) {
          actionableNodes.push(...this.findActionableInMarkdown(content, file));
        }
      } catch (error) {
        console.warn(`⚠️ Failed to process ${file}:`, error.message);
      }
    }

    return actionableNodes;
  }

  findActionableInNodes(nodes) {
    const actionable = [];
    
    for (const node of nodes) {
      if (this.isActionableNode(node)) {
        actionable.push({
          title: node.name,
          content: this.extractNodeContent(node),
          supertag: node.supertag,
          source: 'tana-json',
          priority: this.determinePriority(node)
        });
      }
      
      if (node.children) {
        actionable.push(...this.findActionableInNodes(node.children));
      }
    }
    
    return actionable;
  }

  findActionableInMarkdown(content, filePath) {
    const actionable = [];
    const lines = content.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Look for lines with action tags
      if (this.config.actionTags.some(tag => line.includes(tag))) {
        actionable.push({
          title: line.replace(/#+\s*/, '').replace(/#\w+/g, '').trim(),
          content: this.extractMarkdownContext(lines, i),
          supertag: this.extractSupertag(line),
          source: path.basename(filePath),
          priority: this.determinePriorityFromText(line)
        });
      }
    }
    
    return actionable;
  }

  isActionableNode(node) {
    return this.config.actionTags.some(tag => 
      node.supertag?.includes(tag) || node.name?.includes(tag)
    );
  }

  extractNodeContent(node) {
    if (!node.children) return '';
    
    return node.children
      .filter(child => child.supertag === '#content' || child.supertag === '#text-block')
      .map(child => child.name)
      .join(' ');
  }

  extractMarkdownContext(lines, index) {
    const contextLines = [];
    
    // Get next few lines as context
    for (let i = index + 1; i < Math.min(index + 4, lines.length); i++) {
      if (lines[i].trim() && !lines[i].startsWith('#')) {
        contextLines.push(lines[i].trim());
      } else {
        break;
      }
    }
    
    return contextLines.join(' ');
  }

  extractSupertag(text) {
    const match = text.match(/#(\w+)/);
    return match ? match[0] : '#task';
  }

  determinePriority(node) {
    const urgentKeywords = ['urgent', 'critical', 'asap', 'priority'];
    const text = (node.name + ' ' + this.extractNodeContent(node)).toLowerCase();
    
    return urgentKeywords.some(keyword => text.includes(keyword)) ? 4 : 1;
  }

  determinePriorityFromText(text) {
    const urgentKeywords = ['urgent', 'critical', 'asap', 'priority'];
    return urgentKeywords.some(keyword => text.toLowerCase().includes(keyword)) ? 4 : 1;
  }

  async convertToTodoistTasks(actionableNodes) {
    return actionableNodes.map(node => ({
      content: node.title,
      description: node.content,
      priority: node.priority,
      labels: [node.supertag.replace('#', ''), 'tana-import'],
      project_id: null // Will be resolved when creating
    }));
  }

  async createTodoistTasks(tasks) {
    const project = await this.getOrCreateProject();
    
    for (const task of tasks) {
      try {
        task.project_id = project.id;
        
        await this.circuitBreaker.execute(async () => {
          return await RetryHandler.withRetry(async () => {
            return await this.createTask(task);
          });
        });
        
        console.log(`✅ Created task: ${task.content}`);
      } catch (error) {
        console.error(`❌ Failed to create task "${task.content}":`, error.message);
      }
    }
  }

  async createTask(task) {
    const response = await fetch(`${this.todoistBaseUrl}/tasks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.todoistToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    
    if (!response.ok) {
      throw new Error(`Todoist API error: ${response.status}`);
    }
    
    return await response.json();
  }

  async getOrCreateProject() {
    try {
      const response = await fetch(`${this.todoistBaseUrl}/projects`, {
        headers: { 'Authorization': `Bearer ${this.todoistToken}` }
      });
      
      const projects = await response.json();
      let project = projects.find(p => p.name === this.config.defaultProject);
      
      if (!project) {
        const createResponse = await fetch(`${this.todoistBaseUrl}/projects`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.todoistToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: this.config.defaultProject })
        });
        
        project = await createResponse.json();
        console.log(`📁 Created project: ${this.config.defaultProject}`);
      }
      
      return project;
    } catch (error) {
      console.error('❌ Project resolution failed:', error.message);
      throw error;
    }
  }
}

// CLI Interface
if (process.argv[1] && process.argv[1].endsWith('tana-todoist-bridge.js')) {
  const bridge = new TanaToDoistBridge();
  
  const command = process.argv[2];
  const isDryRun = process.argv.includes('--dry');
  
  switch (command) {
    case 'sync':
      await bridge.syncTanaToTodoist({ dryRun: isDryRun });
      break;
    case 'dry':
      await bridge.syncTanaToTodoist({ dryRun: true });
      break;
    default:
      console.log(`
🎯 TANA → Todoist Integration Bridge

Usage:
  node tana-todoist-bridge.js sync      # Sync TANA to Todoist
  node tana-todoist-bridge.js dry       # Dry run (no actual tasks created)
  node tana-todoist-bridge.js sync --dry # Sync with dry run flag

Environment Variables Required:
  TODOIST_API_TOKEN=your_todoist_token

Features:
  - Extracts actionable items from TANA notes
  - Converts to Todoist tasks with proper metadata
  - Retry logic and circuit breaker for reliability
  - Audit logging for all operations
      `);
  }
}

export default TanaToDoistBridge;