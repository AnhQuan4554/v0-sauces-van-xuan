"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Sidebar from "./sidebar"

export default function MobileFilterToggle() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 mb-4 bg-card border rounded-lg"
      >
        <span className="font-semibold text-primary">FILTER</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </Button>

      {isOpen && (
        <div className="mb-6">
          <Sidebar />
        </div>
      )}
    </div>
  )
}
