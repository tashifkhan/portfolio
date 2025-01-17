export type Project = {
   _id?: string
   name: string
   description: string
   url: string
   technologies: string[]
   githubLink?: string
   liveLink?: string
   playstoreLink?: string
   createdAt: Date
   updatedAt: Date
}

export type Education = {
   _id?: string
   institution: string
   degree: string
   field: string
   startDate: Date
   endDate?: Date
   grade?: string
   description?: string
   createdAt: Date
   updatedAt: Date
}

export type Skill = {
   _id?: string
   name: string
   category: "frontend" | "backend" | "tools" | "other"
   proficiency: number // 1-5
   yearsOfExperience: number
   createdAt: Date
   updatedAt: Date
}
