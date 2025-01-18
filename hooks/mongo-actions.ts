"use server"

import { revalidatePath } from "next/cache"
import { ObjectId } from "mongodb"
import clientPromise from "@/utils/mongo"
import { Project, Education, Skill } from "@/types/content"

// Generic function to handle CRUD operations
async function handleDbOperation<T>(
   collection: string,
   operation: "get" | "add" | "update",
   data?: Partial<T>
) {
   try {
      const client = await clientPromise
      const db = client.db()

      switch (operation) {
         case "get": {
            const items = await db
               .collection(collection)
               .find({})
               .sort({ createdAt: -1 })
               .toArray()
            return { data: JSON.parse(JSON.stringify(items)) }
         }

         case "add": {
            const result = await db.collection(collection).insertOne({
               ...data,
               createdAt: new Date(),
               updatedAt: new Date()
            })
            return { success: true, id: result.insertedId }
         }

         case "update": {
            const { _id, ...updateData } = data as any
            await db.collection(collection).updateOne(
               { _id: new ObjectId(_id) },
               {
                  $set: {
                     ...updateData,
                     updatedAt: new Date()
                  }
               }
            )
            return { success: true }
         }
      }
   } catch (error) {
      console.error(`Database operation failed:`, error)
      return { error: `Failed to ${operation} ${collection}` }
   }
}

// Typed server actions
export async function getProjects() {
   "use server"
   return handleDbOperation<Project>("projects", "get")
}

export async function addProject(project: Omit<Project, "_id">) {
   "use server"
   const result = await handleDbOperation<Project>("projects", "add", project)
   revalidatePath("/update")
   return result
}

export async function updateProject(project: Project) {
   "use server"
   const result = await handleDbOperation<Project>("projects", "update", project)
   revalidatePath("/update")
   return result
}

// Education
export async function getEducation() {
   "use server"
   return handleDbOperation<Education>("education", "get")
}

export async function addEducation(education: Omit<Education, "_id">) {
   "use server"
   const result = await handleDbOperation<Education>("education", "add", education)
   revalidatePath("/update")
   return result
}

export async function updateEducation(education: Education) {
   "use server"
   const result = await handleDbOperation<Education>("education", "update", education)
   revalidatePath("/update")
   return result
}

// Skills
export async function getSkills() {
   "use server"
   return handleDbOperation<Skill>("skills", "get")
}

export async function addSkill(skill: Omit<Skill, "_id">) {
   "use server"
   const result = await handleDbOperation<Skill>("skills", "add", skill)
   revalidatePath("/update")
   return result
}

export async function updateSkill(skill: Skill) {
   "use server"
   const result = await handleDbOperation<Skill>("skills", "update", skill)
   revalidatePath("/update")
   return result
}
