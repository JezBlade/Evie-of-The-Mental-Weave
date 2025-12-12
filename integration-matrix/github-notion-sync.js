// 🔗 GITHUB → NOTION INTEGRATION
// Real automation bridge between GitHub and Notion
// 100% Private, API-based, webhook-triggered

import { Octokit } from '@octokit/rest';
import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';

class GitHubNotionBridge {
  constructor() {
    this.github = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });
    
    this.notion = new Client({
      auth: process.env.NOTION_TOKEN
    });
    
    this.config = {
      githubRepo: process.env.GITHUB_REPO || 'JezBlade/Evie-of-the-Mental-Weave',
      notionDatabaseId: process.env.NOTION_DATABASE_ID,
      syncInterval: 300000 // 5 minutes
    };
  }

  async syncCommitsToNotion() {
    try {
      const commits = await this.github.rest.repos.listCommits({
        owner: this.config.githubRepo.split('/')[0],
        repo: this.config.githubRepo.split('/')[1],
        per_page: 10
      });

      for (const commit of commits.data) {
        await this.createNotionPage({
          title: `Commit: ${commit.commit.message}`,
          type: 'GitHub Commit',
          sha: commit.sha,
          author: commit.commit.author.name,
          date: commit.commit.author.date,
          url: commit.html_url,
          message: commit.commit.message
        });
      }

      console.log(`✅ Synced ${commits.data.length} commits to Notion`);
    } catch (error) {
      console.error('❌ GitHub → Notion sync failed:', error.message);
    }
  }

  async syncReleasesToNotion() {
    try {
      const releases = await this.github.rest.repos.listReleases({
        owner: this.config.githubRepo.split('/')[0],
        repo: this.config.githubRepo.split('/')[1],
        per_page: 5
      });

      for (const release of releases.data) {
        await this.createNotionPage({
          title: `Release: ${release.name}`,
          type: 'GitHub Release',
          version: release.tag_name,
          date: release.published_at,
          url: release.html_url,
          body: release.body,
          prerelease: release.prerelease
        });
      }

      console.log(`✅ Synced ${releases.data.length} releases to Notion`);
    } catch (error) {
      console.error('❌ Release sync failed:', error.message);
    }
  }

  async createNotionPage(data) {
    try {
      const response = await this.notion.pages.create({
        parent: {
          database_id: this.config.notionDatabaseId
        },
        properties: {
          'Title': {
            title: [
              {
                text: {
                  content: data.title
                }
              }
            ]
          },
          'Type': {
            select: {
              name: data.type
            }
          },
          'Date': {
            date: {
              start: data.date
            }
          },
          'URL': {
            url: data.url
          }
        },
        children: [
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: data.message || data.body || 'No description'
                  }
                }
              ]
            }
          }
        ]
      });

      return response;
    } catch (error) {
      if (!error.message.includes('already exists')) {
        console.error('❌ Notion page creation failed:', error.message);
      }
    }
  }

  async startContinuousSync() {
    console.log('🔄 Starting GitHub → Notion continuous sync...');
    
    setInterval(async () => {
      await this.syncCommitsToNotion();
      await this.syncReleasesToNotion();
    }, this.config.syncInterval);

    // Initial sync
    await this.syncCommitsToNotion();
    await this.syncReleasesToNotion();
  }
}

// CLI Interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const bridge = new GitHubNotionBridge();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'sync-commits':
      await bridge.syncCommitsToNotion();
      break;
    case 'sync-releases':
      await bridge.syncReleasesToNotion();
      break;
    case 'continuous':
      await bridge.startContinuousSync();
      break;
    default:
      console.log(`
🔗 GitHub → Notion Integration Bridge

Usage:
  node github-notion-sync.js sync-commits    # Sync recent commits
  node github-notion-sync.js sync-releases   # Sync recent releases  
  node github-notion-sync.js continuous      # Start continuous sync

Environment Variables Required:
  GITHUB_TOKEN=your_github_token
  NOTION_TOKEN=your_notion_token
  NOTION_DATABASE_ID=your_database_id
  GITHUB_REPO=owner/repo
      `);
  }
}

export default GitHubNotionBridge;