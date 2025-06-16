import { NextResponse } from 'next/server'
import { DatabaseService } from '@/utils/database'
import { isAuthenticated } from '@/utils/auth'

export async function POST(req: Request) {
   try {
      const authenticated = await isAuthenticated()
      if (!authenticated) {
         return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
         )
      }

      const body = await req.json()
      console.log('Reorder request body:', body)
      
      const { projectIds } = body
      
      if (!Array.isArray(projectIds) || projectIds.length === 0) {
         console.error('Invalid projectIds:', projectIds)
         return NextResponse.json(
            { error: 'Valid project IDs array is required', received: body },
            { status: 400 }
         )
      }

      // Validate that all projectIds are strings
      const invalidIds = projectIds.filter(id => typeof id !== 'string' || !id.trim())
      if (invalidIds.length > 0) {
         console.error('Invalid project IDs found:', invalidIds)
         return NextResponse.json(
            { error: 'All project IDs must be valid strings', invalidIds },
            { status: 400 }
         )
      }

      console.log('Reordering projects with IDs:', projectIds)
      const success = await DatabaseService.reorderProjects(projectIds)
      
      if (!success) {
         console.error('DatabaseService.reorderProjects returned false')
         return NextResponse.json(
            { error: 'Failed to reorder projects' },
            { status: 500 }
         )
      }

      console.log('Projects reordered successfully')
      return NextResponse.json({ success: true })
   } catch (error) {
      console.error('Reorder projects error:', error)
      return NextResponse.json(
         { error: 'Failed to reorder projects', details: error instanceof Error ? error.message : 'Unknown error' },
         { status: 500 }
      )
   }
}
