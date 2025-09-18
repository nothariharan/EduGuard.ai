"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function DashboardHeader() {
  const [notificationCount, setNotificationCount] = useState(0)

  // Fetch notification count on component mount
  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const res = await fetch("http://localhost:5000/get_notifications")
        const data = await res.json()
        setNotificationCount(data?.notifications?.length || 0)
      } catch (err) {
        console.error("Failed to fetch notification count", err)
        setNotificationCount(0)
      }
    }

    fetchNotificationCount()
    
    // Refresh notification count every 30 seconds
    const interval = setInterval(fetchNotificationCount, 30000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Institute name and search */}
        <div className="flex items-center gap-6">
          <div className="hidden md:block">
            <h2 className="text-xl font-semibold text-foreground">IIIT SriCity</h2>
            <p className="text-sm text-muted-foreground">Student Dropout Prevention System</p>
          </div>

          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search students..." className="pl-10" />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive">
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
