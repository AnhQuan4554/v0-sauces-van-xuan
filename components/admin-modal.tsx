"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

const ADMIN_CODE = "1111"

interface AdminModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AdminModal({ open, onOpenChange }: AdminModalProps) {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (code === ADMIN_CODE) {
      router.push("/admin")
      onOpenChange(false)
      setCode("")
      setError("")
    } else {
      setError("Invalid code. Please try again.")
      setCode("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md mx-2 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Admin Access</DialogTitle>
          <DialogDescription className="text-sm">Enter the admin code to access the admin panel.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code" className="text-sm">
              Admin Code
            </Label>
            <Input
              id="code"
              type="password"
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                setError("")
              }}
              placeholder="Enter admin code"
              className="w-full text-sm sm:text-base cursor-text"
            />
            {error && <p className="text-xs sm:text-sm text-destructive">{error}</p>}
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="soft-button text-sm cursor-pointer"
            >
              Cancel
            </Button>
            <Button type="submit" className="soft-button text-sm cursor-pointer">
              Access Admin
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
