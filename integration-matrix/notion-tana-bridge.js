// 🧠 NOTION → TANA INTEGRATION
// Transforms Notion databases into TANA graph nodes
// 100% Private, JSON-based transformation

import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';

class NotionTanaBridge {
  constructor() {
    this.notion = new Client({
      auth: process.env.NOTION_TOKEN
    });
    
    this.config = {
      notionDatabaseId: process.env.NOTION_DATABASE_ID,
      tanaOutputPath: 'D:/Evie-of-the-Mental-Weave/tana-notes',
      supertags: {
        'GitHub Commit': '#github-commit',
        'GitHub Release': '#github-release', 
        'Project': '#project',
        'Task': '#task',
        'Note': '#note',
        'Insight': '#insight'
      }
    };
  }

  async exportNotionToTana() {
    try {
      console.log('🧠 Starting Notion → TANA export...');
      
      const database = await this.notion.databases.query({
        database_id: this.config.notionDatabaseId,
        page_size: 100
      });

      const tanaNodes = [];
      
      for (const page of database.results) {
        const tanaNode = await this.convertPageToTanaNode(page);
        if (tanaNode) {
          tanaNodes.push(tanaNode);
        }
      }

      await this.saveTanaFile(tanaNodes);
      console.log(`✅ Exported ${tanaNodes.length} nodes to TANA`);
      
      return tanaNodes;
    } catch (error) {
      console.error('❌ Notion → TANA export failed:', error.message);
    }
  }

  async convertPageToTanaNode(page) {
    try {
      const properties = page.properties;
      
      // Extract basic properties
      const title = this.extractTitle(properties.Title || properties.Name);
      const type = this.extractSelect(properties.Type);
      const date = this.extractDate(properties.Date);
      const url = this.extractUrl(properties.URL);
      
      // Get page content
      const content = await this.getPageContent(page.id);
      
      // Generate TANA node
      const supertag = this.config.supertags[type] || '#notion-import';
      
      const tanaNode = {
        name: title,
        supertag: supertag,
        children: [
          {
            name: `Type: ${type}`,
            supertag: '#property'
          },
          {
            name: `Date: ${date}`,
            supertag: '#date'
          }
        ]
      };

      if (url) {
        tanaNode.children.push({
          name: `URL: ${url}`,
          supertag: '#link'
        });
      }

      if (content) {
        tanaNode.children.push({
          name: 'Content',
          supertag: '#content',
          children: content.map(block => ({
            name: block.text,
            supertag: '#text-block'
          }))
        });
      }

      return tanaNode;
    } catch (error) {
      console.error('❌ Page conversion failed:', error.message);
      return null;
    }
  }

  async getPageContent(pageId) {
    try {
      const blocks = await this.notion.blocks.children.list({
        block_id: pageId
      });

      return blocks.results.map(block => {
        if (block.type === 'paragraph') {
          return {
            text: block.paragraph.rich_text.map(t => t.plain_text).join('')
          };
        }
        return { text: `[${block.type}]` };
      });
    } catch (error) {
      return [];
    }
  }

  extractTitle(titleProperty) {
    if (!titleProperty) return 'Untitled';
    return titleProperty.title.map(t => t.plain_text).join('');
  }

  extractSelect(selectProperty) {
    if (!selectProperty || !selectProperty.select) return 'Unknown';
    return selectProperty.select.name;
  }

  extractDate(dateProperty) {
    if (!dateProperty || !dateProperty.date) return new Date().toISOString().split('T')[0];
    return dateProperty.date.start;
  }

  extractUrl(urlProperty) {
    if (!urlProperty) return null;
    return urlProperty.url;
  }

  async saveTanaFile(nodes) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `notion-export-${timestamp}.json`;
    const filepath = path.join(this.config.tanaOutputPath, filename);

    // Ensure directory exists
    if (!fs.existsSync(this.config.tanaOutputPath)) {
      fs.mkdirSync(this.config.tanaOutputPath, { recursive: true });
    }

    // Save as JSON (TANA can import JSON)
    const tanaExport = {
      version: '1.0',
      source: 'Notion',
      timestamp: new Date().toISOString(),
      nodes: nodes
    };

    fs.writeFileSync(filepath, JSON.stringify(tanaExport, null, 2));
    
    // Also save as markdown for manual import
    const markdownPath = filepath.replace('.json', '.md');
    const markdown = this.convertToMarkdown(nodes);
    fs.writeFileSync(markdownPath, markdown);

    console.log(`📁 Files saved:`);
    console.log(`   JSON: ${filepath}`);
    console.log(`   Markdown: ${markdownPath}`);
  }

  convertToMarkdown(nodes) {
    let markdown = '# Notion → TANA Export\n\n';
    
    for (const node of nodes) {
      markdown += `## ${node.name} ${node.supertag}\n\n`;
      
      if (node.children) {
        for (const child of node.children) {
          markdown += `- ${child.name} ${child.supertag}\n`;
          
          if (child.children) {
            for (const grandchild of child.children) {
              markdown += `  - ${grandchild.name}\n`;
            }
          }
        }
      }
      
      markdown += '\n';
    }
    
    return markdown;
  }

  async startScheduledExport() {
    console.log('📅 Starting scheduled Notion → TANA export...');
    
    // Export immediately
    await this.exportNotionToTana();
    
    // Schedule daily exports
    setInterval(async () => {
      await this.exportNotionToTana();
    }, 24 * 60 * 60 * 1000); // 24 hours
  }
}

// CLI Interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const bridge = new NotionTanaBridge();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'export':
      await bridge.exportNotionToTana();
      break;
    case 'scheduled':
      await bridge.startScheduledExport();
      break;
    default:
      console.log(`
🧠 Notion → TANA Integration Bridge

Usage:
  node notion-tana-bridge.js export      # Export Notion to TANA format
  node notion-tana-bridge.js scheduled   # Start scheduled daily exports

Environment Variables Required:
  NOTION_TOKEN=your_notion_token
  NOTION_DATABASE_ID=your_database_id

Output:
  - JSON files for TANA import
  - Markdown files for manual review
      `);
  }
}

export default NotionTanaBridge;