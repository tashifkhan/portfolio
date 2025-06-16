import { NextResponse } from 'next/server'
import clientPromise from '@/utils/mongo'
import { Collection, ObjectId } from 'mongodb'
import { isAuthenticated } from '@/utils/auth'

export async function GET() {
  try {
    const client = await clientPromise
    const collection: Collection = client.db("Portfolio").collection("MajorProjects")
    
    const entireData = await collection
      .find({})
      .toArray()
    
    return NextResponse.json(entireData)
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to retrieve cached data: ${error}` },
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
    const collection: Collection = client.db("Portfolio").collection("MajorProjects")
    const projectData = await request.json()
    
    const result = await collection.insertOne(projectData)
    
    return NextResponse.json({ _id: result.insertedId, ...projectData }, { status: 201 })
  } catch (error) {
    console.error('Create notable project error:', error)
    return NextResponse.json(
      { error: 'Failed to create notable project' },
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
    const collection: Collection = client.db("Portfolio").collection("MajorProjects")
    const { _id, ...updates } = await request.json()
    
    if (!_id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      )
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updates }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update notable project error:', error)
    return NextResponse.json(
      { error: 'Failed to update notable project' },
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
    const collection: Collection = client.db("Portfolio").collection("MajorProjects")
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
    console.error('Delete notable project error:', error)
    return NextResponse.json(
      { error: 'Failed to delete notable project' },
      { status: 500 }
    )
  }
}