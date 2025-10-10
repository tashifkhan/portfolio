import { NextResponse } from 'next/server'
import clientPromise from '@/utils/mongo'
import { Collection, MongoClient, ObjectId } from 'mongodb'
import { isAuthenticated } from '@/utils/auth'

export async function GET() {
  try {
    const client = await Promise.race([
      clientPromise,
      new Promise((_, reject) => setTimeout(() => reject(new Error('Database connection timeout')), 5000))
    ]) as MongoClient

    const collection: Collection = client.db('Portfolio').collection('Experience Collection')
    const data = await collection.find({}).sort({ startDate: -1 }).toArray()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Experience GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const isAuthed = await isAuthenticated()
    if (!isAuthed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const client = await clientPromise
    const collection: Collection = client.db('Portfolio').collection('Experience Collection')
    const experience = await request.json()

    const result = await collection.insertOne({ ...experience, createdAt: new Date(), updatedAt: new Date() })

    return NextResponse.json({ _id: result.insertedId, ...experience }, { status: 201 })
  } catch (error) {
    console.error('Experience POST error:', error)
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const isAuthed = await isAuthenticated()
    if (!isAuthed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const client = await clientPromise
    const collection: Collection = client.db('Portfolio').collection('Experience Collection')
    const { _id, ...updates } = await request.json()

    if (!_id) return NextResponse.json({ error: 'Experience ID required' }, { status: 400 })

    const result = await collection.updateOne({ _id: new ObjectId(_id) }, { $set: { ...updates, updatedAt: new Date() } })

    if (result.matchedCount === 0) return NextResponse.json({ error: 'Experience not found' }, { status: 404 })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Experience PUT error:', error)
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const isAuthed = await isAuthenticated()
    if (!isAuthed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const client = await clientPromise
    const collection: Collection = client.db('Portfolio').collection('Experience Collection')
    const { _id } = await request.json()

    if (!_id) return NextResponse.json({ error: 'Experience ID required' }, { status: 400 })

    const result = await collection.deleteOne({ _id: new ObjectId(_id) })

    if (result.deletedCount === 0) return NextResponse.json({ error: 'Experience not found' }, { status: 404 })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Experience DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 })
  }
}
