"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Clock, User, Mail, Phone, TrendingDown } from "lucide-react"

// Mock alerts data
const alertsData = [
  {
    id: 1,
    studentId: "CS2021001",
    studentName: "Mohan Kumar",
    riskLevel: "Critical",
    triggers: ["Attendance < 60%", "Failed 2 consecutive exams", "No recent submissions"],
    lastUpdated: "2024-01-25T10:30:00",
    department: "Computer Science",
    semester: "6th",
    mentorNotified: false,
    parentNotified: true,
    actionTaken: false,
  },
  {
    id: 2,
    studentId: "ME2021089",
    studentName: "Aisha Khan",
    riskLevel: "Critical",
    triggers: ["Attendance < 50%", "Average score < 40%", "No class participation"],
    lastUpdated: "2024-01-25T09:15:00",
    department: "Mechanical Engineering",
    semester: "5th",
    mentorNotified: true,
    parentNotified: false,
    actionTaken: false,
  },
  {
    id: 3,
    studentId: "EE2021045",
    studentName: "Arjun Mehta",
    riskLevel: "Warning",
    triggers: ["Fee pending > 2 months", "Declining test scores"],
    lastUpdated: "2024-01-24T16:45:00",
    department: "Electrical Engineering",
    semester: "4th",
    mentorNotified: true,
    parentNotified: true,
    actionTaken: true,
  },
  {
    id: 4,
    studentId: "CS2021156",
    studentName: "Rohan Verma",
    riskLevel: "Warning",
    triggers: ["Test scores declining", "Missed 3 assignments"],
    lastUpdated: "2024-01-24T14:20:00",
    department: "Computer Science",
    semester: "3rd",
    mentorNotified: false,
    parentNotified: false,
    actionTaken: false,
  },
  {
    id: 5,
    studentId: "IT2021145",
    studentName: "Priya Patel",
    riskLevel: "Warning",
    triggers: ["Attendance dropping", "Fee pending 1 month"],
    lastUpdated: "2024-01-23T11:30:00",
    department: "Information Technology",
    semester: "4th",
    mentorNotified: true,
    parentNotified: false,
    actionTaken: false,
  },
]

export default function AlertsPage() {
  const [riskFilter, setRiskFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [actionFilter, setActionFilter] = useState("all")

  const filteredAlerts = alertsData.filter((alert) => {
    const matchesRisk = riskFilter === "all" || alert.riskLevel === riskFilter
    const matchesDepartment = departmentFilter === "all" || alert.department === departmentFilter
    const matchesAction =
      actionFilter === "all" ||
      (actionFilter === "pending" && !alert.actionTaken) ||
      (actionFilter === "completed" && alert.actionTaken)

    return matchesRisk && matchesDepartment && matchesAction
  })

  const getRiskBadgeClass = (risk: string) => {
    switch (risk) {
      case "Critical":
        return "risk-critical"
      case "Warning":
        return "risk-warning"
      default:
        return ""
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
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
              <h1 className="text-3xl font-bold text-foreground mb-2">Risk Alerts</h1>
              <p className="text-muted-foreground">Monitor and manage student risk alerts</p>
            </div>
            <Button className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Send Bulk Notifications
            </Button>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-foreground">{alertsData.length}</div>
                <p className="text-sm text-muted-foreground">Total Alerts</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">
                  {alertsData.filter((a) => a.riskLevel === "Critical").length}
                </div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-yellow-600">
                  {alertsData.filter((a) => a.riskLevel === "Warning").length}
                </div>
                <p className="text-sm text-muted-foreground">Warning Alerts</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {alertsData.filter((a) => !a.actionTaken).length}
                </div>
                <p className="text-sm text-muted-foreground">Pending Action</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filter Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Risk Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="Warning">Warning</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                    <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                    <SelectItem value="Information Technology">Information Technology</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Action Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="pending">Pending Action</SelectItem>
                    <SelectItem value="completed">Action Taken</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => {
                    setRiskFilter("all")
                    setDepartmentFilter("all")
                    setActionFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Alerts list */}
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <Card
                key={alert.id}
                className={`border-l-4 ${alert.riskLevel === "Critical" ? "border-l-red-500" : "border-l-yellow-500"}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle
                        className={`h-6 w-6 ${alert.riskLevel === "Critical" ? "text-red-500" : "text-yellow-500"}`}
                      />
                      <div>
                        <CardTitle className="text-lg">{alert.studentName}</CardTitle>
                        <CardDescription>
                          {alert.studentId} • {alert.department} • {alert.semester} Semester
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getRiskBadgeClass(alert.riskLevel)}>{alert.riskLevel}</Badge>
                      {alert.actionTaken && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Action Taken
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Risk triggers */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Risk Triggers:</h4>
                      <div className="flex flex-wrap gap-2">
                        {alert.triggers.map((trigger, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <TrendingDown className="h-3 w-3 mr-1" />
                            {trigger}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Notification status */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Mentor Notified:</span>
                        <Badge variant={alert.mentorNotified ? "default" : "destructive"}>
                          {alert.mentorNotified ? "Yes" : "No"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Parent Notified:</span>
                        <Badge variant={alert.parentNotified ? "default" : "destructive"}>
                          {alert.parentNotified ? "Yes" : "No"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Last Updated:</span>
                        <span className="text-sm text-muted-foreground">{formatDate(alert.lastUpdated)}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-2 border-t border-border">
                      <Button size="sm" variant="outline">
                        View Student Profile
                      </Button>
                      {!alert.mentorNotified && (
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4 mr-1" />
                          Notify Mentor
                        </Button>
                      )}
                      {!alert.parentNotified && (
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-1" />
                          Notify Parent
                        </Button>
                      )}
                      {!alert.actionTaken && (
                        <Button size="sm" className="ml-auto">
                          Mark Action Taken
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAlerts.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No alerts found</h3>
                <p className="text-muted-foreground">No alerts match your current filters.</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
