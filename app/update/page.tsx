import { Suspense } from "react"
import { Loader } from "@/components/ui/loader"
import { UpdatePageContent } from "./UpdatePageContent"

export default function UpdatePage() {
   return (
      <main className="min-h-screen flex items-center justify-center p-4">
         <div className="w-full max-w-md">
            <Suspense fallback={<Loader />}>
               <UpdatePageContent />
            </Suspense>
         </div>
      </main>
   )
}
