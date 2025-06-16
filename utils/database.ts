import { ObjectId } from 'mongodb'
import clientPromise from './mongo'
import {
  Project,
  NotableProject,
  Education,
  Responsibility,
  Skill,
  ProgrammingLanguage,
  Framework,
  BaseSkill,
  SoftSkill,
  Socials
} from '@/types/content'

const DB_NAME = 'Portfolio'

// Generic database operations
export class DatabaseService {
  private static async getCollection(collectionName: string) {
    const client = await clientPromise
    return client.db(DB_NAME).collection(collectionName)
  }

  // Projects operations - using original collection name
  static async getProjects(): Promise<Project[]> {
    const collection = await this.getCollection('Project Collection')
    const results = await collection.find({}).sort({ position: 1 }).toArray()
    return results.map(doc => ({
      ...doc,
      _id: doc._id.toString()
    })) as Project[]
  }

  static async createProject(project: Omit<Project, '_id'>): Promise<Project> {
    const collection = await this.getCollection('Project Collection')
    const newProject = {
      ...project,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const result = await collection.insertOne(newProject)
    return { ...newProject, _id: result.insertedId.toString() }
  }

  static async updateProject(id: string, updates: Partial<Project>): Promise<boolean> {
    const collection = await this.getCollection('Project Collection')
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    )
    return result.modifiedCount > 0
  }

  static async deleteProject(id: string): Promise<boolean> {
    const collection = await this.getCollection('Project Collection')
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  }

  static async reorderProjects(projectIds: string[]): Promise<boolean> {
    const collection = await this.getCollection('Project Collection')
    const bulkOps = projectIds.map((id, index) => ({
      updateOne: {
        filter: { _id: new ObjectId(id) },
        update: { $set: { position: index + 1, updatedAt: new Date() } }
      }
    }))
    const result = await collection.bulkWrite(bulkOps)
    return result.modifiedCount > 0
  }

  // Notable Projects operations - using original collection name
  static async getNotableProjects(): Promise<NotableProject[]> {
    const collection = await this.getCollection('MajorProjects')
    const results = await collection.find({}).toArray()
    return results.map(doc => ({
      ...doc,
      _id: doc._id.toString()
    })) as NotableProject[]
  }

  static async createNotableProject(project: Omit<NotableProject, '_id'>): Promise<NotableProject> {
    const collection = await this.getCollection('MajorProjects')
    const result = await collection.insertOne(project)
    return { ...project, _id: result.insertedId.toString() }
  }

  static async updateNotableProject(id: string, updates: Partial<NotableProject>): Promise<boolean> {
    const collection = await this.getCollection('MajorProjects')
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    )
    return result.modifiedCount > 0
  }

  static async deleteNotableProject(id: string): Promise<boolean> {
    const collection = await this.getCollection('MajorProjects')
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  }

  // Education operations - using original collection name
  static async getEducation(): Promise<Education[]> {
    const collection = await this.getCollection('EducationalDesc')
    const results = await collection.find({}).toArray()
    return results.map(doc => ({
      ...doc,
      _id: doc._id.toString()
    })) as Education[]
  }

  static async createEducation(education: Omit<Education, '_id'>): Promise<Education> {
    const collection = await this.getCollection('EducationalDesc')
    const newEducation = {
      ...education,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const result = await collection.insertOne(newEducation)
    return { ...newEducation, _id: result.insertedId.toString() }
  }

  static async updateEducation(id: string, updates: Partial<Education>): Promise<boolean> {
    const collection = await this.getCollection('EducationalDesc')
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    )
    return result.modifiedCount > 0
  }

  static async deleteEducation(id: string): Promise<boolean> {
    const collection = await this.getCollection('EducationalDesc')
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  }

  // Skills operations - using original collection name
  static async getSkills(): Promise<Skill[]> {
    const collection = await this.getCollection('SkillDesc')
    const results = await collection.find({}).toArray()
    return results.map(doc => ({
      ...doc,
      _id: doc._id.toString()
    })) as Skill[]
  }

  static async getSkillsByType(type: string): Promise<Skill[]> {
    const collection = await this.getCollection('SkillDesc')
    const results = await collection.find({ type }).toArray()
    return results.map(doc => ({
      ...doc,
      _id: doc._id.toString()
    })) as Skill[]
  }

  static async createSkill(skill: Omit<Skill, '_id'>): Promise<Skill> {
    const collection = await this.getCollection('SkillDesc')
    const newSkill = {
      ...skill,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const result = await collection.insertOne(newSkill)
    return { ...newSkill, _id: result.insertedId.toString() } as Skill
  }

  static async updateSkill(id: string, updates: Partial<Skill>): Promise<boolean> {
    const collection = await this.getCollection('SkillDesc')
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    )
    return result.modifiedCount > 0
  }

  static async deleteSkill(id: string): Promise<boolean> {
    const collection = await this.getCollection('SkillDesc')
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  }

  // Responsibilities operations - I need to find the correct collection name
  static async getResponsibilities(): Promise<Responsibility[]> {
    const collection = await this.getCollection('ResponsibilityDesc')
    const results = await collection.find({}).toArray()
    return results.map(doc => ({
      ...doc,
      _id: doc._id.toString()
    })) as Responsibility[]
  }

  static async createResponsibility(responsibility: Omit<Responsibility, '_id'>): Promise<Responsibility> {
    const collection = await this.getCollection('ResponsibilityDesc')
    const newResponsibility = {
      ...responsibility,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const result = await collection.insertOne(newResponsibility)
    return { ...newResponsibility, _id: result.insertedId.toString() }
  }

  static async updateResponsibility(id: string, updates: Partial<Responsibility>): Promise<boolean> {
    const collection = await this.getCollection('ResponsibilityDesc')
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    )
    return result.modifiedCount > 0
  }

  static async deleteResponsibility(id: string): Promise<boolean> {
    const collection = await this.getCollection('ResponsibilityDesc')
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  }

  // Programming Languages
  static async getLanguages(): Promise<ProgrammingLanguage[]> {
    return await this.getSkillsByType('language') as ProgrammingLanguage[]
  }

  // Frameworks
  static async getFrameworks(): Promise<Framework[]> {
    return await this.getSkillsByType('framework') as Framework[]
  }

  // Tools
  static async getTools(): Promise<BaseSkill[]> {
    return await this.getSkillsByType('tool') as BaseSkill[]
  }

  // Soft Skills
  static async getSoftSkills(): Promise<SoftSkill[]> {
    return await this.getSkillsByType('softSkill') as SoftSkill[]
  }

  // Socials operations
  static async getSocials(): Promise<Socials | null> {
    const collection = await this.getCollection('Socials')
    const result = await collection.findOne({})
    if (!result) return null
    return {
      ...result,
      _id: result._id.toString()
    } as Socials
  }

  static async updateSocials(updates: Partial<Socials>): Promise<boolean> {
    const collection = await this.getCollection('Socials')
    const result = await collection.updateOne(
      {}, // Update the first (and only) document
      { $set: { ...updates, updatedAt: new Date() } },
      { upsert: true } // Create if doesn't exist
    )
    return result.modifiedCount > 0 || result.upsertedCount > 0
  }

  static async createSocials(socials: Omit<Socials, '_id'>): Promise<Socials> {
    const collection = await this.getCollection('Socials')
    const newSocials = {
      ...socials,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const result = await collection.insertOne(newSocials)
    return { ...newSocials, _id: result.insertedId.toString() }
  }
}
