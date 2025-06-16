import { NextResponse } from 'next/server'
import { DatabaseService } from '@/utils/database'
import { isAuthenticated } from '@/utils/auth'
import { Responsibility } from '@/types/content'

export async function GET() {
  try {
    const responsibilities = await DatabaseService.getResponsibilities()
    return NextResponse.json(responsibilities)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch responsibilities data' },
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

    const responsibilityData: Omit<Responsibility, '_id'> = await request.json()
    const newResponsibility = await DatabaseService.createResponsibility(responsibilityData)
    
    return NextResponse.json(newResponsibility, { status: 201 })
  } catch (error) {
    console.error('Create responsibility error:', error)
    return NextResponse.json(
      { error: 'Failed to create responsibility' },
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

    const { id, ...updates }: { id: string } & Partial<Responsibility> = await request.json()
    
    if (!id) {
      return NextResponse.json(
        { error: 'Responsibility ID is required' },
        { status: 400 }
      )
    }

    const success = await DatabaseService.updateResponsibility(id, updates)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Responsibility not found or not updated' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update responsibility error:', error)
    return NextResponse.json(
      { error: 'Failed to update responsibility' },
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
        { error: 'Responsibility ID is required' },
        { status: 400 }
      )
    }

    const success = await DatabaseService.deleteResponsibility(id)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Responsibility not found or not deleted' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete responsibility error:', error)
    return NextResponse.json(
      { error: 'Failed to delete responsibility' },
      { status: 500 }
    )
  }
}
