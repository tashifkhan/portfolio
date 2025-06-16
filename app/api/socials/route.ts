import { NextResponse } from 'next/server'
import clientPromise from '@/utils/mongo'
import { Collection, MongoClient } from 'mongodb'
import { isAuthenticated } from '@/utils/auth'

export async function GET() {
   try {
      const client = await Promise.race([
         clientPromise,
         new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Database connection timeout')), 5000)
         )
      ]) as MongoClient
      
      const collection: Collection = client.db("Portfolio").collection("Socials")
      const socials = await collection.findOne({})
      
      if (!socials) {
         return NextResponse.json(
            { error: 'Socials not found' },
            { status: 404 }
         )
      }
      
      return NextResponse.json(socials)
   } catch (error) {
      console.error('Database error:', error)
      return NextResponse.json(
         { error: 'Failed to fetch socials' },
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
      const collection: Collection = client.db("Portfolio").collection("Socials")
      const socialsData = await request.json()
      
      const result = await collection.updateOne(
         {}, // Update the first (and only) document
         { 
            $set: { 
               ...socialsData, 
               updatedAt: new Date() 
            } 
         },
         { upsert: true } // Create if doesn't exist
      )
      
      if (result.modifiedCount === 0 && result.upsertedCount === 0) {
         return NextResponse.json(
            { error: 'Failed to update socials' },
            { status: 400 }
         )
      }
      
      return NextResponse.json({ message: 'Socials updated successfully' })
   } catch (error) {
      console.error('Update socials error:', error)
      return NextResponse.json(
         { error: 'Failed to update socials' },
         { status: 500 }
      )
   }
}
