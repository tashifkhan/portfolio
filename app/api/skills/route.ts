import { NextResponse } from 'next/server'
import { DatabaseService } from '@/utils/database'
import { isAuthenticated } from '@/utils/auth'
import { Skill } from '@/types/content'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    
    const skills = type 
      ? await DatabaseService.getSkillsByType(type)
      : await DatabaseService.getSkills()
    
    return NextResponse.json(skills)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch skills data' },
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

    const skillData: Omit<Skill, '_id'> = await request.json()
    const newSkill = await DatabaseService.createSkill(skillData)
    
    return NextResponse.json(newSkill, { status: 201 })
  } catch (error) {
    console.error('Create skill error:', error)
    return NextResponse.json(
      { error: 'Failed to create skill' },
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

    const { id, ...updates }: { id: string } & Partial<Skill> = await request.json()
    
    if (!id) {
      return NextResponse.json(
        { error: 'Skill ID is required' },
        { status: 400 }
      )
    }

    const success = await DatabaseService.updateSkill(id, updates)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Skill not found or not updated' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update skill error:', error)
    return NextResponse.json(
      { error: 'Failed to update skill' },
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

    const { id }: { id: string } = await request.json()
    
    if (!id) {
      return NextResponse.json(
        { error: 'Skill ID is required' },
        { status: 400 }
      )
    }

    const success = await DatabaseService.deleteSkill(id)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Skill not found or not deleted' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete skill error:', error)
    return NextResponse.json(
      { error: 'Failed to delete skill' },
      { status: 500 }
    )
  }
}