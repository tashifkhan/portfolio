import { NextResponse } from 'next/server'
import { DatabaseService } from '@/utils/database'
import { isAuthenticated } from '@/utils/auth'
import { Education } from '@/types/content'

export async function GET() {
  try {
    const education = await DatabaseService.getEducation()
    return NextResponse.json(education)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch education data' },
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

    const educationData: Omit<Education, '_id'> = await request.json()
    const newEducation = await DatabaseService.createEducation(educationData)
    
    return NextResponse.json(newEducation, { status: 201 })
  } catch (error) {
    console.error('Create education error:', error)
    return NextResponse.json(
      { error: 'Failed to create education entry' },
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

    const { id, ...updates }: { id: string } & Partial<Education> = await request.json()
    
    if (!id) {
      return NextResponse.json(
        { error: 'Education ID is required' },
        { status: 400 }
      )
    }

    const success = await DatabaseService.updateEducation(id, updates)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Education entry not found or not updated' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update education error:', error)
    return NextResponse.json(
      { error: 'Failed to update education entry' },
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
        { error: 'Education ID is required' },
        { status: 400 }
      )
    }

    const success = await DatabaseService.deleteEducation(id)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Education entry not found or not deleted' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete education error:', error)
    return NextResponse.json(
      { error: 'Failed to delete education entry' },
      { status: 500 }
    )
  }
}