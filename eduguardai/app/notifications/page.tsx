"use client"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Bell, Send, Clock, CheckCircle, Mail, Phone, MessageSquare, Filter, Plus } from "lucide-react"

export default function NotificationsPage() {
  const [notificationsData, setNotificationsData] = useState<any[]>([])
  const [students, setStudents] = useState<any[]>([])
  const [composeRecipientType, setComposeRecipientType] = useState("mentor")
  const [composePriority, setComposePriority] = useState("medium")
  const [composeStudent, setComposeStudent] = useState("")
  const [composeSubject, setComposeSubject] = useState("")
  const [composeMessage, setComposeMessage] = useState("")
  const [sendEmail, setSendEmail] = useState(false)
  const [sendSms, setSendSms] = useState(false)
  const [sendPush, setSendPush] = useState(false)
  const [isComposeOpen, setIsComposeOpen] = useState(false)

  // Load data on component mount
  useEffect(() => {
    fetchNotifications()
    fetchStudents()
  }, [])

  // Backend helpers
  const mapPriorityIdToText = (priority_id: number) => {
    if (priority_id === 1) return "high"
    if (priority_id === 2) return "medium"
    if (priority_id === 3) return "low"
    return "low"
  }

  const mapPriorityTextToId = (priority: string) => {
    if (priority === "high") return 1
    if (priority === "medium") return 2
    return 3
  }

  const recipentIdToLabel = (id: number) => {
    if (id === 1) return "Mentor"
    if (id === 2) return "Parent/Guardian"
    if (id === 3) return "Both"
    return String(id)
  }

  const studentIdToLabel = (id: number) => {
    const map: Record<number, string> = {
      1: "Mohan Kumar (CS2021001)",
      2: "Arjun Mehta (EE2021045)",
      3: "Aisha Khan (ME2021089)",
      4: "Rohan Verma (CS2021156)",
      5: "Neha Sharma (BT2021234)",
      6: "Vikram Singh (CE2021078)",
      7: "Karan Gupta (EC2021092)",
    }
    return map[id] ?? String(id)
  }

  const fetchNotifications = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      console.log('API URL being used:', apiUrl)
      const res = await fetch(`${apiUrl}/get_notifications`)
      const data = await res.json()
      const list = (data?.notifications ?? []).map((n: any, idx: number) => ({
        id: idx + 1,
        type: n?.channel ?? "general",
        status: "sent",
        priority: mapPriorityIdToText(Number(n?.priority_id ?? 1)),
        title: n?.subject ?? "",
        message: n?.message ?? "",
        student: studentIdToLabel(Number(n?.student_id ?? 0)),
        recipent: recipentIdToLabel(Number(n?.recipent_id ?? 0)),
        channel: n?.channel ?? "email",
        sentAt: n?.created_at ?? null,
        readAt: null,
      }))
      setNotificationsData(list)
    } catch (err) {
      console.error("Failed to fetch notifications", err)
    }
  }

  const fetchStudents = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      console.log('API URL for students:', apiUrl)
      const res = await fetch(`${apiUrl}/students`)
      const data = await res.json()
      setStudents(data?.students ?? [])
    } catch (err) {
      console.error("Failed to fetch students", err)
    }
  }

  const sendNotification = async () => {
    try {
      // Validation
      if (!composeStudent) {
        alert("Please select a student")
        return
      }
      if (!composeSubject.trim()) {
        alert("Subject is required")
        return
      }
      if (!composeMessage.trim()) {
        alert("Message is required")
        return
      }

      const channels: string[] = []
      if (sendEmail) channels.push("email")
      if (sendSms) channels.push("sms")
      if (sendPush) channels.push("push")
      if (channels.length === 0) channels.push("email")

      // Map selections to IDs
      const selectedStudent = students.find((s) => s.name_rollno === composeStudent)
      const student_id = selectedStudent?.id
      const recipent_id = composeRecipientType === "mentor" ? 1 : composeRecipientType === "parent" ? 2 : 3

      const payloadBase: any = {
        recipent_id,
        priority_id: mapPriorityTextToId(composePriority),
        subject: composeSubject,
        message: composeMessage,
      }
      if (typeof student_id === "number") {
        payloadBase.student_id = student_id
      } else {
        payloadBase.student_name = composeStudent
      }

      for (const channel of channels) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
        console.log('API URL for sending notification:', apiUrl)
        const res = await fetch(`${apiUrl}/send_notification`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payloadBase, channel }),
        })
        if (!res.ok) throw new Error(await res.text())
      }

      // Refresh list and close dialog
      await fetchNotifications()
      setIsComposeOpen(false)
      setComposeSubject("")
      setComposeMessage("")
      alert("Notification sent successfully!")
    } catch (err) {
      console.error("Failed to send notification", err)
      alert("Failed to send notification: " + err)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                  <p className="text-muted-foreground">Manage alerts and communications to mentors and guardians</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={fetchNotifications}>Refresh</Button>
                  <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Compose Notification
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Compose New Notification</DialogTitle>
                        <DialogDescription>Send a custom notification to mentors or parents</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div>
                          <label className="text-sm font-medium">Recipient Type</label>
                          <Select value={composeRecipientType} onValueChange={setComposeRecipientType}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mentor">Mentor</SelectItem>
                              <SelectItem value="parent">Parent/Guardian</SelectItem>
                              <SelectItem value="both">Both</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Priority</label>
                          <Select value={composePriority} onValueChange={setComposePriority}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Student</label>
                          <Select value={composeStudent} onValueChange={setComposeStudent}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select student" />
                            </SelectTrigger>
                            <SelectContent>
                              {students.map((student) => (
                                <SelectItem key={student.id} value={student.name_rollno}>
                                  {student.name_rollno}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Subject</label>
                          <Input 
                            placeholder="Enter notification subject" 
                            value={composeSubject}
                            onChange={(e) => setComposeSubject(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Message</label>
                          <Textarea 
                            placeholder="Enter your message here..." 
                            rows={6}
                            value={composeMessage}
                            onChange={(e) => setComposeMessage(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <label className="text-sm font-medium">Send via:</label>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="email" 
                              checked={sendEmail}
                              onCheckedChange={(checked) => setSendEmail(checked === true)}
                            />
                            <label htmlFor="email" className="text-sm">Email</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="sms" 
                              checked={sendSms}
                              onCheckedChange={(checked) => setSendSms(checked === true)}
                            />
                            <label htmlFor="sms" className="text-sm">SMS</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="push" 
                              checked={sendPush}
                              onCheckedChange={(checked) => setSendPush(checked === true)}
                            />
                            <label htmlFor="push" className="text-sm">Push</label>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={sendNotification}>
                          <Send className="h-4 w-4 mr-2" />
                          Send Notification
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications ({notificationsData.length})
                </CardTitle>
                <CardDescription>All sent notifications and their status</CardDescription>
              </CardHeader>
              <CardContent>
                {notificationsData.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No notifications found. Create your first notification above.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notificationsData.map((notification) => (
                      <div key={notification.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={notification.priority === "high" ? "destructive" : notification.priority === "medium" ? "default" : "secondary"}>
                                {notification.priority}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {notification.channel}
                              </span>
                            </div>
                            <h3 className="font-medium">{notification.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span>Student: {notification.student}</span>
                              <span>Recipient: {notification.recipent}</span>
                              <span>Sent: {notification.sentAt ? new Date(notification.sentAt).toLocaleString() : 'Unknown'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}