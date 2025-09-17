"use client"

import { useState } from "react"
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
  const [templateNotifications, setTemplateNotifications] = useState<any[]>([])

  // Compose form state (no extra imports used)
  const [composeRecipientType, setComposeRecipientType] = useState("mentor")
  const [composePriority, setComposePriority] = useState("medium")
  const [composeStudent, setComposeStudent] = useState("")
  const [students, setStudents] = useState<any[]>([])
  const [composeSubject, setComposeSubject] = useState("")
  const [composeMessage, setComposeMessage] = useState("")
  const [sendEmail, setSendEmail] = useState(false)
  const [sendSms, setSendSms] = useState(false)
  const [sendPush, setSendPush] = useState(false)

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
      7: "Priya Patel (IT2021145)",
      8: "Karan Gupta (EC2021092)",
    }
    return map[id] ?? String(id)
  }

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/get_notifications")
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
      const res = await fetch("http://localhost:5000/students")
      const data = await res.json()
      setStudents(data?.students ?? [])
    } catch (err) {
      console.error("Failed to fetch students", err)
    }
  }

  const sendNotification = async () => {
    try {
      // Validation: ensure student, subject, and message are provided
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
      // If no channel selected, default to push (as requested)
      if (channels.length === 0) channels.push("push")

      // Map compose selections to IDs
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
        const res = await fetch("/send_notification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payloadBase, channel }),
        })
        if (!res.ok) throw new Error(await res.text())
      }

      // Refresh list and close dialog
      await fetchNotifications()
      setIsComposeOpen(false)
      // Reset compose fields (keep selections)
      setComposeSubject("")
      setComposeMessage("")
    } catch (err) {
      console.error("Failed to send notification", err)
    }
  }

  
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([])
  const [isComposeOpen, setIsComposeOpen] = useState(false)

  // Filter notifications
  const filteredNotifications = notificationsData.filter((notification) => {
    const matchesType = filterType === "all" || notification.type.toLowerCase().includes(filterType.toLowerCase())
    const matchesStatus = filterStatus === "all" || notification.status === filterStatus
    const matchesPriority = filterPriority === "all" || notification.priority === filterPriority
    const matchesSearch =
      searchTerm === "" ||
      notification.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.recipent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesType && matchesStatus && matchesPriority && matchesSearch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Sent</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="risk-critical">High</Badge>
      case "medium":
        return <Badge className="risk-warning">Medium</Badge>
      case "low":
        return <Badge className="risk-safe">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <Phone className="h-4 w-4" />
      case "push":
        return <Bell className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Sent"
    return new Date(dateString).toLocaleString()
  }

  const handleSelectNotification = (id: number) => {
    setSelectedNotifications((prev) => (prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <div className="md:ml-64">
        <DashboardHeader />

        <main className="p-6">
          {/* Page header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
              <p className="text-muted-foreground">Manage alerts and communications to mentors and guardians</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={fetchNotifications}>Refresh</Button>
              <Dialog open={isComposeOpen} onOpenChange={(open) => { setIsComposeOpen(open); if (open) { fetchStudents(); } }}>
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
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Recipient Type</label>
                        <Select value={composeRecipientType} onValueChange={setComposeRecipientType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select recipient type" />
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
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Student</label>
                      <Select value={composeStudent} onValueChange={setComposeStudent}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                        <SelectContent>
                          {students.map((s) => (
                            <SelectItem key={s.id} value={s.name_rollno}>
                              {s.name_rollno} ({s.parent_mentor})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Subject</label>
                      <Input placeholder="Enter notification subject" value={composeSubject} onChange={(e) => setComposeSubject(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Message</label>
                      <Textarea placeholder="Enter your message here..." rows={6} value={composeMessage} onChange={(e) => setComposeMessage(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium">Send via:</label>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email" checked={sendEmail} onCheckedChange={() => setSendEmail((v) => !v)} />
                      <label htmlFor="email" className="text-sm">
                        Email
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sms" checked={sendSms} onCheckedChange={() => setSendSms((v) => !v)} />
                      <label htmlFor="sms" className="text-sm">
                        SMS
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="push" checked={sendPush} onCheckedChange={() => setSendPush((v) => !v)} />
                      <label htmlFor="push" className="text-sm">
                        Push
                      </label>
                    </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={sendNotification}>
                      <Send className="h-4 w-4 mr-2" />
                      Send Notification
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-foreground">{notificationsData.length}</div>
                <p className="text-sm text-muted-foreground">Total Notifications</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {notificationsData.filter((n) => n.status === "sent").length}
                </div>
                <p className="text-sm text-muted-foreground">Sent Successfully</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-yellow-600">
                  {notificationsData.filter((n) => n.status === "pending").length}
                </div>
                <p className="text-sm text-muted-foreground">Pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">
                  {notificationsData.filter((n) => n.priority === "high").length}
                </div>
                <p className="text-sm text-muted-foreground">High Priority</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="notifications" className="space-y-6">
            <TabsList>
              <TabsTrigger value="notifications">Notification History</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="notifications" className="space-y-6">
              {/* Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters & Search
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="relative">
                      <Input
                        placeholder="Search notifications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="attendance">Attendance Issues</SelectItem>
                        <SelectItem value="fee">Fee Issues</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="high risk">High Risk Only</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterPriority} onValueChange={setFilterPriority}>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      onClick={() => {
                        setFilterType("all")
                        setFilterStatus("all")
                        setFilterPriority("all")
                        setSearchTerm("")
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Bulk actions */}
              {selectedNotifications.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {selectedNotifications.length} notification(s) selected
                      </span>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          Resend Selected
                        </Button>
                        <Button size="sm" variant="outline">
                          Mark as Read
                        </Button>
                        <Button size="sm" variant="destructive">
                          Delete Selected
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Notifications list */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Notification History ({filteredNotifications.length})</CardTitle>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedNotifications.length === filteredNotifications.length}
                        onCheckedChange={handleSelectAll}
                      />
                      <span className="text-sm text-muted-foreground">Select All</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                      >
                        <Checkbox
                          checked={selectedNotifications.includes(notification.id)}
                          onCheckedChange={() => handleSelectNotification(notification.id)}
                        />

                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-foreground">{notification.title || notification.subject || ""}</h4>
                              <p className="text-sm text-muted-foreground">
                                To: {notification.recipent} • Student: {notification.student}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {getPriorityBadge(notification.priority)}
                              {getStatusBadge(notification.status)}
                            </div>
                          </div>

                          <p className="text-sm text-foreground">{notification.message}</p>

                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                {getChannelIcon(notification.channel)}
                                <span>{notification.channel.toUpperCase()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>Sent: {formatDate(notification.sentAt)}</span>
                              </div>
                              {notification.readAt && (
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3" />
                                  <span>Read: {formatDate(notification.readAt)}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost">
                                View Details
                              </Button>
                              {notification.status === "failed" && (
                                <Button size="sm" variant="outline">
                                  Resend
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredNotifications.length === 0 && (
                    <div className="text-center py-8">
                      <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No notifications found</h3>
                      <p className="text-muted-foreground">No notifications match your current filters.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Templates</CardTitle>
                  <CardDescription>Pre-configured templates for common alert scenarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {templateNotifications.map((template) => (
                      <Card key={template.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                Edit Template
                              </Button>
                              <Button size="sm">Use Template</Button>
                            </div>
                          </div>
                          <CardDescription>Subject: {template.subject}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-medium mb-2">Triggers:</h5>
                              <div className="flex flex-wrap gap-2">
                                {template.triggers.map((trigger: string, index: number) => (
                                  <Badge key={index} variant="outline">
                                    {trigger}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">Template:</h5>
                              <div className="bg-muted p-3 rounded-lg text-sm whitespace-pre-line">
                                {template.template}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure automatic notification rules and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Automatic Alert Thresholds</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Critical Attendance Threshold</label>
                        <Select defaultValue="60">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="50">50%</SelectItem>
                            <SelectItem value="60">60%</SelectItem>
                            <SelectItem value="70">70%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Fee Pending Alert (months)</label>
                        <Select defaultValue="2">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 month</SelectItem>
                            <SelectItem value="2">2 months</SelectItem>
                            <SelectItem value="3">3 months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">Default Recipients</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="auto-mentor" defaultChecked />
                        <label htmlFor="auto-mentor" className="text-sm">
                          Automatically notify assigned mentors for high-risk alerts
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="auto-parent" />
                        <label htmlFor="auto-parent" className="text-sm">
                          Automatically notify parents/guardians for critical alerts
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="auto-admin" defaultChecked />
                        <label htmlFor="auto-admin" className="text-sm">
                          Copy administrators on all high-priority notifications
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">Delivery Preferences</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="email-enabled" defaultChecked />
                        <label htmlFor="email-enabled" className="text-sm">
                          Enable email notifications
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="sms-enabled" defaultChecked />
                        <label htmlFor="sms-enabled" className="text-sm">
                          Enable SMS notifications
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="push-enabled" />
                        <label htmlFor="push-enabled" className="text-sm">
                          Enable push notifications
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button>Save Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
