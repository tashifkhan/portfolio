import { NextResponse } from 'next/server'
import clientPromise from '@/utils/mongo'
import { Collection } from 'mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const collection: Collection = client.db("Portfolio").collection("EducationalDesc")
    
    // Retrieve all documents sorted by published date
    const entireData = await collection
      .find({})
      .toArray()
    
    if (!entireData.length) {
      return NextResponse.json(
        { error: "No cached data found. Please scrape first." },
        { status: 404 }
      )
    }
    
    return NextResponse.json(entireData)
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to retrieve cached data: ${error}` },
      { status: 500 }
    )
  }
}