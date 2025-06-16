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

      const { projectIds } = await req.json()
      
      if (!Array.isArray(projectIds) || projectIds.length === 0) {
         return NextResponse.json(
            { error: 'Valid project IDs array is required' },
            { status: 400 }
         )
      }

      const success = await DatabaseService.reorderProjects(projectIds)
      
      if (!success) {
         return NextResponse.json(
            { error: 'Failed to reorder projects' },
            { status: 500 }
         )
      }

      return NextResponse.json({ success: true })
   } catch (error) {
      console.error('Reorder projects error:', error)
      return NextResponse.json(
         { error: 'Failed to reorder projects' },
         { status: 500 }
      )
   }
}
