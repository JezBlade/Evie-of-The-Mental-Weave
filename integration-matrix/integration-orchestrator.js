// 🌐 TOTAL INTEGRATION ORCHESTRATOR
// Master controller for all inter-app automations
// Manages the complete integration matrix

import GitHubNotionBridge from './github-notion-sync.js';
import NotionTanaBridge from './notion-tana-bridge.js';
import fs from 'fs';
import path from 'path';

class IntegrationOrchestrator {
  constructor() {
    this.bridges = {
      githubNotion: new GitHubNotionBridge(),
      notionTana: new NotionTanaBridge()
    };
    
    this.config = this.loadConfig();
    this.status = {
      active: false,
      lastSync: null,
      errors: [],
      successCount: 0
    };
  }

  loadConfig() {
    const configPath = 'D:/Evie-of-the-Mental-Weave/integration-matrix/total-integration-architecture.json';
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }

  async startTotalIntegration() {
    console.log('🌐 Starting Total Integration Matrix...');
    this.status.active = true;
    
    try {
      // Phase 1: GitHub → Notion
      console.log('\n📊 Phase 1: GitHub → Notion Sync');
      await this.bridges.githubNotion.syncCommitsToNotion();
      await this.bridges.githubNotion.syncReleasesToNotion();
      
      // Phase 2: Notion → TANA  
      console.log('\n🧠 Phase 2: Notion → TANA Export');
      await this.bridges.notionTana.exportNotionToTana();
      
      // Phase 3: Update status
      this.status.lastSync = new Date().toISOString();
      this.status.successCount++;
      
      console.log('\n✅ Total Integration Cycle Complete');
      await this.generateIntegrationReport();
      
    } catch (error) {
      console.error('❌ Integration cycle failed:', error.message);
      this.status.errors.push({
        timestamp: new Date().toISOString(),
        error: error.message
      });
    }
  }

  async generateIntegrationReport() {
    const report = {
      timestamp: new Date().toISOString(),
      status: this.status,
      integrationFlows: this.config.totalIntegrationMatrix.integrationFlows,
      nextActions: this.getNextActions()
    };

    const reportPath = 'D:/Evie-of-the-Mental-Weave/integration-matrix/integration-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`📋 Integration report saved: ${reportPath}`);
  }

  getNextActions() {
    const priority = this.config.totalIntegrationMatrix.implementationPriority;
    const completed = ['github-to-notion', 'notion-to-tana'];
    
    return priority.filter(action => !completed.includes(action));
  }

  async startContinuousIntegration() {
    console.log('🔄 Starting Continuous Integration Mode...');
    
    // Initial run
    await this.startTotalIntegration();
    
    // Schedule every 30 minutes
    setInterval(async () => {
      await this.startTotalIntegration();
    }, 30 * 60 * 1000);
  }

  async healthCheck() {
    console.log('🏥 Running Integration Health Check...');
    
    const health = {
      timestamp: new Date().toISOString(),
      nodes: {},
      flows: {},
      overall: 'HEALTHY'
    };

    // Check each integration node
    for (const [nodeId, node] of Object.entries(this.config.totalIntegrationMatrix.integrationNodes)) {
      health.nodes[nodeId] = {
        status: node.status,
        connections: node.connections.length,
        capabilities: node.capabilities.length
      };
    }

    // Check integration flows
    for (const [flowId, flow] of Object.entries(this.config.totalIntegrationMatrix.integrationFlows)) {
      health.flows[flowId] = {
        status: flow.status,
        method: flow.method,
        frequency: flow.frequency
      };
    }

    // Determine overall health
    const activeFlows = Object.values(health.flows).filter(f => f.status === 'ACTIVE').length;
    const totalFlows = Object.keys(health.flows).length;
    
    if (activeFlows < totalFlows * 0.5) {
      health.overall = 'DEGRADED';
    }
    
    if (this.status.errors.length > 5) {
      health.overall = 'CRITICAL';
    }

    console.log(`📊 Health Status: ${health.overall}`);
    console.log(`📈 Active Flows: ${activeFlows}/${totalFlows}`);
    
    return health;
  }

  async showIntegrationMatrix() {
    console.log('\n🌐 TOTAL INTEGRATION MATRIX');
    console.log('═══════════════════════════════════════');
    
    const matrix = this.config.totalIntegrationMatrix;
    
    console.log('\n📊 Integration Nodes:');
    for (const [id, node] of Object.entries(matrix.integrationNodes)) {
      console.log(`  ${node.status === 'ACTIVE' ? '✅' : '⏳'} ${id}: ${node.type}`);
    }
    
    console.log('\n🔄 Integration Flows:');
    for (const [id, flow] of Object.entries(matrix.integrationFlows)) {
      const statusIcon = flow.status === 'ACTIVE' ? '✅' : 
                        flow.status === 'READY' ? '🟡' : '⏳';
      console.log(`  ${statusIcon} ${flow.source} → ${flow.target} (${flow.method})`);
    }
    
    console.log('\n🎯 Implementation Priority:');
    matrix.implementationPriority.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item}`);
    });
  }
}

// CLI Interface
if (process.argv[1] && process.argv[1].endsWith('integration-orchestrator.js')) {
  const orchestrator = new IntegrationOrchestrator();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'start':
      await orchestrator.startTotalIntegration();
      break;
    case 'continuous':
      await orchestrator.startContinuousIntegration();
      break;
    case 'health':
      await orchestrator.healthCheck();
      break;
    case 'matrix':
      await orchestrator.showIntegrationMatrix();
      break;
    default:
      console.log(`
🌐 Total Integration Orchestrator

Usage:
  node integration-orchestrator.js start       # Run single integration cycle
  node integration-orchestrator.js continuous  # Start continuous integration
  node integration-orchestrator.js health      # Check integration health
  node integration-orchestrator.js matrix      # Show integration matrix

Integration Flow:
  GitHub → Notion → TANA → Todoist → Google → Docker → VS Code
      `);
  }
}

export default IntegrationOrchestrator;