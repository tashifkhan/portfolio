import { NextResponse } from 'next/server'
import clientPromise from '@/utils/mongo'
import { Collection, MongoClient } from 'mongodb'

export async function GET() {
   try {
      const client = await Promise.race([
         clientPromise,
         new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Database connection timeout')), 5000)
         )
      ]) as MongoClient
      
      const collection: Collection = client.db("Portfolio").collection("Project Collection")
      const entireData = await collection.find({}).sort({ location: 1 }).toArray()
      
      return NextResponse.json(entireData)
   } catch (error) {
      console.error('Database error:', error)
      return NextResponse.json(
         { error: 'Failed to fetch projects' },
         { status: 500 }
      )
   }
}