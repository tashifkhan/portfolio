import { NextResponse } from 'next/server'
import clientPromise from '@/utils/mongo'
import { Collection, MongoClient, ObjectId } from 'mongodb'
import { isAuthenticated } from '@/utils/auth'

export async function GET() {
   try {
      const client = await Promise.race([
         clientPromise,
         new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Database connection timeout')), 5000)
         )
      ]) as MongoClient
      
      const collection: Collection = client.db("Portfolio").collection("Project Collection")
      const entireData = await collection.find({}).sort({ position: 1 }).toArray()
      
      return NextResponse.json(entireData)
   } catch (error) {
      console.error('Database error:', error)
      return NextResponse.json(
         { error: 'Failed to fetch projects' },
         { status: 500 }
      )
   }
}

export async function POST(request: Request) {
   try {
      const isAuthed = await isAuthenticated()
      if (!isAuthed) {
         return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
         )
      }

      const client = await clientPromise
      const collection: Collection = client.db("Portfolio").collection("Project Collection")
      const projectData = await request.json()
      
      const result = await collection.insertOne({
         ...projectData,
         createdAt: new Date(),
         updatedAt: new Date()
      })
      
      return NextResponse.json({ _id: result.insertedId, ...projectData }, { status: 201 })
   } catch (error) {
      console.error('Create project error:', error)
      return NextResponse.json(
         { error: 'Failed to create project' },
         { status: 500 }
      )
   }
}

export async function PUT(request: Request) {
   try {
      const isAuthed = await isAuthenticated()
      if (!isAuthed) {
         return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
         )
      }

      const client = await clientPromise
      const collection: Collection = client.db("Portfolio").collection("Project Collection")
      const { _id, ...updates } = await request.json()
      
      if (!_id) {
         return NextResponse.json(
            { error: 'Project ID is required' },
            { status: 400 }
         )
      }

      const result = await collection.updateOne(
         { _id: new ObjectId(_id) },
         { $set: { ...updates, updatedAt: new Date() } }
      )
      
      if (result.matchedCount === 0) {
         return NextResponse.json(
            { error: 'Project not found' },
            { status: 404 }
         )
      }

      return NextResponse.json({ success: true })
   } catch (error) {
      console.error('Update project error:', error)
      return NextResponse.json(
         { error: 'Failed to update project' },
         { status: 500 }
      )
   }
}

export async function DELETE(request: Request) {
   try {
      const isAuthed = await isAuthenticated()
      if (!isAuthed) {
         return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
         )
      }

      const client = await clientPromise
      const collection: Collection = client.db("Portfolio").collection("Project Collection")
      const { _id } = await request.json()
      
      if (!_id) {
         return NextResponse.json(
            { error: 'Project ID is required' },
            { status: 400 }
         )
      }

      const result = await collection.deleteOne({ _id: new ObjectId(_id) })
      
      if (result.deletedCount === 0) {
         return NextResponse.json(
            { error: 'Project not found' },
            { status: 404 }
         )
      }

      return NextResponse.json({ success: true })
   } catch (error) {
      console.error('Delete project error:', error)
      return NextResponse.json(
         { error: 'Failed to delete project' },
         { status: 500 }
      )
   }
}