import { NextResponse } from "next/server"
import clientPromise from "@/utils/mongo"
import { Collection } from "mongodb"
import { isAuthenticated } from "@/utils/auth"

interface EducationItem {
   title: string
   institution: string
   score: string
   duration: string
}

interface ResponsibilityItem {
   title: string
   organization: string
   duration: string
   type: string
}

interface InfoData {
   educationData: EducationItem[]
   responsibilitiesData: ResponsibilityItem[]
}

export async function PUT(req: Request) {
   try {
      const isAuthed = await isAuthenticated()
      if (!isAuthed) {
         return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
         )
      }

      const client = await clientPromise
      const collection: Collection = client.db("Portfolio").collection("EducationalDesc")
      
      const body: InfoData = await req.json()
      
      if (!body.educationData || !body.responsibilitiesData) {
         return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
         )
      }

      const result = await collection.findOneAndUpdate(
         {},
         {
            $set: {
               educationData: body.educationData,
               responsibilitiesData: body.responsibilitiesData
            }
         },
         { returnDocument: "after", upsert: true }
      )

      const updated = result?.value ?? (await collection.findOne({}))
      if (!updated) {
         return NextResponse.json({ error: "Failed to update data" }, { status: 500 })
      }

      return NextResponse.json({ message: "Data updated successfully", data: updated })
   } catch (error: any) {
      return NextResponse.json(
         { error: `Failed to update data: ${error}` },
         { status: 500 }
      )
   }
}
