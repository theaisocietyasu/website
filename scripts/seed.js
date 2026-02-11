/**
 * Software Corner Seed Script
 *
 * Usage: node scripts/seed.js
 *
 * This script seeds the database with sample projects for testing.
 * Make sure to set MONGODB_URI in your .env.local file.
 */

const { MongoClient, ObjectId } = require('mongodb')
const path = require('path')
const fs = require('fs')

// Load environment variables
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') })

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in environment variables')
  console.error('Please create a .env.local file with MONGODB_URI')
  process.exit(1)
}

const sampleProjects = [
  {
    title: 'AI Chatbot with GPT-4',
    description: 'A conversational AI chatbot built with OpenAI\'s GPT-4 API, featuring context-aware responses, conversation history, and a beautiful React frontend. Includes sentiment analysis and response streaming for a smooth user experience.',
    github_url: 'https://github.com/example/ai-chatbot',
    live_url: 'https://ai-chatbot-demo.vercel.app',
    collaborators: ['octocat', 'torvalds'],
    published: true,
    owner_discord_id: 'sample_officer_001',
  },
  {
    title: 'Real-time Collaboration Platform',
    description: 'A web-based collaboration tool with real-time editing, video conferencing, and shared whiteboards. Built with WebRTC, Socket.io, and Next.js for seamless team communication.',
    github_url: 'https://github.com/example/collab-platform',
    live_url: 'https://collab-demo.app',
    collaborators: ['gaearon', 'sophiebits'],
    published: true,
    owner_discord_id: 'sample_officer_002',
  },
  {
    title: 'Machine Learning Image Classifier',
    description: 'A deep learning model trained on ImageNet to classify images into 1000+ categories. Features a user-friendly web interface for uploading images and getting instant predictions with confidence scores.',
    github_url: 'https://github.com/example/ml-classifier',
    live_url: '',
    collaborators: ['fchollet'],
    published: true,
    owner_discord_id: 'sample_officer_001',
  },
  {
    title: 'Blockchain-based Voting System',
    description: 'A secure and transparent voting platform built on Ethereum blockchain. Ensures vote integrity, anonymity, and verifiability through smart contracts. Perfect for student elections and organizational decisions.',
    github_url: 'https://github.com/example/blockchain-voting',
    live_url: '',
    collaborators: ['vitalik'],
    published: true,
    owner_discord_id: 'sample_officer_003',
  },
  {
    title: 'Weather Prediction Dashboard',
    description: 'An interactive dashboard displaying weather forecasts with machine learning predictions. Uses historical data and LSTM networks to predict temperature, precipitation, and severe weather events.',
    github_url: 'https://github.com/example/weather-dashboard',
    live_url: 'https://weather-ml.vercel.app',
    collaborators: [],
    published: true,
    owner_discord_id: 'sample_officer_002',
  },
  {
    title: 'Code Review Assistant (Draft)',
    description: 'An AI-powered code review tool that analyzes pull requests and provides suggestions for improvements, bug detection, and best practices. Currently in development.',
    github_url: 'https://github.com/example/code-review-ai',
    live_url: '',
    collaborators: ['tj', 'sindresorhus'],
    published: false,
    owner_discord_id: 'sample_officer_001',
  },
]

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI, {
    maxPoolSize: 10,
  })

  try {
    console.log('🔌 Connecting to MongoDB...')
    await client.connect()
    console.log('✅ Connected to MongoDB')

    const db = client.db()
    const projectsCollection = db.collection('projects')

    // Clear existing projects (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing projects...')
    await projectsCollection.deleteMany({})
    console.log('✅ Cleared existing projects')

    // Insert sample projects
    console.log('📝 Inserting sample projects...')
    const projectsToInsert = sampleProjects.map((project) => ({
      ...project,
      created_at: new Date(),
      updated_at: new Date(),
    }))

    const result = await projectsCollection.insertMany(projectsToInsert)
    console.log(`✅ Inserted ${result.insertedCount} sample projects`)

    // Create indexes
    console.log('🔍 Creating indexes...')
    await projectsCollection.createIndex({ published: 1, created_at: -1 })
    await projectsCollection.createIndex({ title: 'text', description: 'text' })
    await projectsCollection.createIndex({ collaborators: 1 })
    await projectsCollection.createIndex({ owner_discord_id: 1 })
    console.log('✅ Created indexes')

    console.log('\n🎉 Seeding completed successfully!')
    console.log(`\n📊 Summary:`)
    console.log(`   Total projects: ${sampleProjects.length}`)
    console.log(`   Published: ${sampleProjects.filter((p) => p.published).length}`)
    console.log(`   Drafts: ${sampleProjects.filter((p) => !p.published).length}`)
    console.log(`\n💡 Note: These projects use sample GitHub usernames and Discord IDs.`)
    console.log(`   You won't be able to edit/delete them unless your Discord ID matches.`)
    console.log(`   Create your own projects through the admin dashboard!\n`)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  } finally {
    await client.close()
    console.log('🔌 Disconnected from MongoDB')
  }
}

seedDatabase()
