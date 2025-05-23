import { NextResponse } from "next/server"
import clientPromise from "@/utils/mongo"
import { Collection } from "mongodb"
import { isAuthenticated } from "@/utils/auth"

interface LanguageItem {
   name: string
   icon: string
}

interface FrameworkItem {
   name: string
   description: string
}

interface ToolItem {
   name: string
   icon: string
   description: string
}

interface SoftSkillItem {
   name: string
   icon: string
   category: string
}

interface SkillsData {
   languages: LanguageItem[]
   frameworks: FrameworkItem[]
   tools: ToolItem[]
   softSkills: SoftSkillItem[]
}

export async function GET() {
   try {
      const client = await clientPromise
      const collection: Collection = client.db("Portfolio").collection("SkillsDesc")
      
      const data = await collection.findOne({})
      
      if (!data) {
         return NextResponse.json(
            { error: "No skills data found" },
            { status: 404 }
         )
      }

      return NextResponse.json(data)
   } catch (error: any) {
      return NextResponse.json(
         { error: `Failed to retrieve skills data: ${error}` },
         { status: 500 }
      )
   }
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
      const collection: Collection = client.db("Portfolio").collection("SkillsDesc")
      
      const body: SkillsData = await req.json()
      
      if (!body.languages || !body.frameworks || !body.tools || !body.softSkills) {
         return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
         )
      }

      const result = await collection.findOneAndUpdate(
         {},
         {
            $set: {
               languages: body.languages,
               frameworks: body.frameworks,
               tools: body.tools,
               softSkills: body.softSkills
            }
         },
         { returnDocument: "after" }
      )

      if (!result || !result.value) {
         return NextResponse.json(
            { error: "Failed to update skills data" },
            { status: 404 }
         )
      }

      return NextResponse.json({
         message: "Skills data updated successfully",
         data: result.value
      })
   } catch (error: any) {
      return NextResponse.json(
         { error: `Failed to update skills data: ${error}` },
         { status: 500 }
      )
   }
}
