"use client"
import { useParams } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  ArrowLeft,
  AlertTriangle,
  Calendar,
  DollarSign,
  BookOpen,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"

// mock student data - in real app this would come from API
const getStudentData = (id: string) => {
  const students = {
    CS2021001: {
      id: "CS2021001",
      name: "Mohan Kumar",
      email: "mohan.kumar@student.edu",
      phone: "+91 9876543210",
      address: "123 Main St, Tarnaka, Telangana, India",
      department: "Computer Science",
      semester: "6th",
      enrollmentDate: "2021-08-15",
      mentor: "Dr. Rakesh Sharma",
      currentRisk: "Critical",
      riskScore: 85,
      attendance: 58,
      avgScore: 42,
      feeStatus: "Pending",
      feePendingMonths: 3,
      totalFees: 15000,
      paidFees: 9000,

      // Attendance trend data
      attendanceHistory: [
        { month: "Aug", attendance: 92 },
        { month: "Sep", attendance: 88 },
        { month: "Oct", attendance: 82 },
        { month: "Nov", attendance: 75 },
        { month: "Dec", attendance: 68 },
        { month: "Jan", attendance: 58 },
      ],

      // Test scores data
      testScores: [
        { subject: "Data Structures", score: 35 },
        { subject: "Algorithms", score: 42 },
        { subject: "Database Systems", score: 38 },
        { subject: "Web Development", score: 48 },
        { subject: "Software Engineering", score: 45 },
      ],

      // Assignment attempts
      assignments: [
        { name: "Project 1", status: "Submitted", score: 78, dueDate: "2024-01-10" },
        { name: "Assignment 2", status: "Late", score: 65, dueDate: "2024-01-15" },
        { name: "Project 2", status: "Missing", score: 0, dueDate: "2024-01-20" },
        { name: "Assignment 3", status: "Missing", score: 0, dueDate: "2024-01-25" },
      ],

      // Fee payment timeline
      feePayments: [
        { date: "2021-08-15", amount: 3000, type: "Semester 1" },
        { date: "2022-01-15", amount: 3000, type: "Semester 2" },
        { date: "2022-08-15", amount: 3000, type: "Semester 3" },
        { date: "2023-01-15", amount: 0, type: "Semester 4 - Pending" },
        { date: "2023-08-15", amount: 0, type: "Semester 5 - Pending" },
        { date: "2024-01-15", amount: 0, type: "Semester 6 - Pending" },
      ],

      // Risk factors
      riskFactors: [
        { factor: "Low Attendance", severity: "High", impact: 35 },
        { factor: "Poor Test Performance", severity: "High", impact: 30 },
        { factor: "Missing Assignments", severity: "Medium", impact: 20 },
        { factor: "Fee Pending", severity: "Medium", impact: 15 },
      ],

      // Suggested actions
      suggestedActions: [
        "Schedule immediate counseling session",
        "Contact parents/guardians",
        "Arrange peer tutoring support",
        "Discuss fee payment plan",
        "Monitor daily attendance",
      ],
    },
  }

  return students[id as keyof typeof students] || null
}

export default function StudentProfilePage() {
  const params = useParams()
  const studentId = params.id as string
  const student = getStudentData(studentId)

  if (!student) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <div className="md:ml-64">
          <DashboardHeader />
          <main className="p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-4">Student Not Found</h1>
              <Link href="/students">
                <Button>Back to Students</Button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    )
  }

  const getRiskBadgeClass = (risk: string) => {
    switch (risk) {
      case "Critical":
        return "risk-critical"
      case "Warning":
        return "risk-warning"
      case "Safe":
        return "risk-safe"
      default:
        return ""
    }
  }

  const riskColors = ["#ef4444", "#f59e0b", "#10b981"]

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <div className="md:ml-64">
        <DashboardHeader />

        <main className="p-6">
          {/* Back button and header */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/students">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Students
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">{student.name}</h1>
              <p className="text-muted-foreground">
                {student.id} • {student.department}
              </p>
            </div>
            <Badge className={getRiskBadgeClass(student.currentRisk)}>
              {student.currentRisk === "Critical" && <AlertTriangle className="h-3 w-3 mr-1" />}
              {student.currentRisk} Risk
            </Badge>
          </div>

          {/* Student overview cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Attendance</span>
                </div>
                <div className="text-2xl font-bold text-red-600">{student.attendance}%</div>
                <Progress value={student.attendance} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Avg Score</span>
                </div>
                <div className="text-2xl font-bold text-red-600">{student.avgScore}%</div>
                <Progress value={student.avgScore} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Fee Status</span>
                </div>
                <div className="text-2xl font-bold text-red-600">{student.feeStatus}</div>
                <p className="text-xs text-muted-foreground mt-1">{student.feePendingMonths} months pending</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Risk Score</span>
                </div>
                <div className="text-2xl font-bold text-red-600">{student.riskScore}/100</div>
                <Progress value={student.riskScore} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Main content tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="academics">Academics</TabsTrigger>
              <TabsTrigger value="fees">Fees</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Student Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Student Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Student ID</p>
                        <p className="font-medium">{student.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Department</p>
                        <p className="font-medium">{student.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Semester</p>
                        <p className="font-medium">{student.semester}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Mentor</p>
                        <p className="font-medium">{student.mentor}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{student.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{student.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{student.address}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Factors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      Risk Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {student.riskFactors.map((factor, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{factor.factor}</span>
                            <Badge variant={factor.severity === "High" ? "destructive" : "secondary"}>
                              {factor.severity}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={factor.impact} className="flex-1" />
                            <span className="text-xs text-muted-foreground">{factor.impact}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Suggested Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Suggested Actions</CardTitle>
                  <CardDescription>Recommended interventions based on risk analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {student.suggestedActions.map((action, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm">{action}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Trend</CardTitle>
                  <CardDescription>Monthly attendance percentage over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={student.attendanceHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="attendance"
                          stroke="#ef4444"
                          strokeWidth={3}
                          dot={{ fill: "#ef4444", strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Test Scores */}
                <Card>
                  <CardHeader>
                    <CardTitle>Test Scores by Subject</CardTitle>
                    <CardDescription>Current semester performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={student.testScores}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="score" fill="#f59e0b" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Assignment Status */}
                <Card>
                  <CardHeader>
                    <CardTitle>Assignment History</CardTitle>
                    <CardDescription>Recent assignment submissions and scores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {student.assignments.map((assignment, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border border-border"
                        >
                          <div>
                            <p className="font-medium">{assignment.name}</p>
                            <p className="text-sm text-muted-foreground">Due: {assignment.dueDate}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                assignment.status === "Submitted"
                                  ? "default"
                                  : assignment.status === "Late"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {assignment.status}
                            </Badge>
                            <span className="text-sm font-medium">{assignment.score}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="fees" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Fee Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Fee Overview</CardTitle>
                    <CardDescription>Payment status and outstanding amounts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Fees</p>
                        <p className="text-2xl font-bold">${student.totalFees.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Paid Amount</p>
                        <p className="text-2xl font-bold text-green-600">${student.paidFees.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Outstanding</p>
                        <p className="text-2xl font-bold text-red-600">
                          ${(student.totalFees - student.paidFees).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Progress</p>
                        <Progress value={(student.paidFees / student.totalFees) * 100} className="mt-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Timeline</CardTitle>
                    <CardDescription>Semester-wise fee payment history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {student.feePayments.map((payment, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border border-border"
                        >
                          <div>
                            <p className="font-medium">{payment.type}</p>
                            <p className="text-sm text-muted-foreground">{payment.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={payment.amount > 0 ? "default" : "destructive"}>
                              {payment.amount > 0 ? "Paid" : "Pending"}
                            </Badge>
                            <span className="text-sm font-medium">${payment.amount.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="actions" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common interventions and communications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Alert to Mentor
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Parent/Guardian
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Counseling Session
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Arrange Peer Tutoring
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Discuss Fee Payment Plan
                    </Button>
                  </CardContent>
                </Card>

                {/* Action History */}
                <Card>
                  <CardHeader>
                    <CardTitle>Action History</CardTitle>
                    <CardDescription>Previous interventions and their outcomes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Parent Meeting Scheduled</span>
                          <span className="text-sm text-muted-foreground">2024-01-20</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Meeting arranged to discuss academic performance and attendance issues.
                        </p>
                      </div>
                      <div className="p-3 rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Mentor Alert Sent</span>
                          <span className="text-sm text-muted-foreground">2024-01-18</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Dr. Robert Smith notified about declining attendance and test scores.
                        </p>
                      </div>
                      <div className="p-3 rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Counseling Session</span>
                          <span className="text-sm text-muted-foreground">2024-01-15</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Initial counseling session conducted to understand challenges.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
