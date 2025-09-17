"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  Download,
  FileText,
  CalendarIcon,
  TrendingUp,
  TrendingDown,
  Users,
  AlertTriangle,
  DollarSign,
  BookOpen,
} from "lucide-react"
import { format } from "date-fns"

// Mock report data
const weeklyReportData = [
  {
    week: "Week 1",
    totalStudents: 1247,
    atRiskStudents: 95,
    criticalRisk: 28,
    warningRisk: 67,
    avgAttendance: 89.2,
    avgScore: 76.8,
    feeCollection: 94.2,
  },
  {
    week: "Week 2",
    totalStudents: 1245,
    atRiskStudents: 102,
    criticalRisk: 32,
    warningRisk: 70,
    avgAttendance: 87.8,
    avgScore: 75.4,
    feeCollection: 94.5,
  },
  {
    week: "Week 3",
    totalStudents: 1243,
    atRiskStudents: 108,
    criticalRisk: 35,
    warningRisk: 73,
    avgAttendance: 86.5,
    avgScore: 74.2,
    feeCollection: 94.1,
  },
  {
    week: "Week 4",
    totalStudents: 1247,
    atRiskStudents: 89,
    criticalRisk: 23,
    warningRisk: 66,
    avgAttendance: 87.3,
    avgScore: 76.1,
    feeCollection: 94.7,
  },
]

const monthlyReportData = [
  {
    month: "Aug 2023",
    totalStudents: 1250,
    atRiskStudents: 98,
    dropouts: 3,
    interventions: 45,
    successRate: 78.2,
  },
  {
    month: "Sep 2023",
    totalStudents: 1247,
    atRiskStudents: 105,
    dropouts: 2,
    interventions: 52,
    successRate: 80.1,
  },
  {
    month: "Oct 2023",
    totalStudents: 1245,
    atRiskStudents: 112,
    dropouts: 4,
    interventions: 58,
    successRate: 75.8,
  },
  {
    month: "Nov 2023",
    totalStudents: 1241,
    atRiskStudents: 118,
    dropouts: 5,
    interventions: 62,
    successRate: 73.4,
  },
  {
    month: "Dec 2023",
    totalStudents: 1239,
    atRiskStudents: 95,
    dropouts: 2,
    interventions: 48,
    successRate: 82.1,
  },
  {
    month: "Jan 2024",
    totalStudents: 1247,
    atRiskStudents: 89,
    dropouts: 1,
    interventions: 43,
    successRate: 85.3,
  },
]

const departmentReportData = [
  {
    department: "Computer Science",
    totalStudents: 288,
    atRiskStudents: 28,
    riskPercentage: 9.7,
    avgAttendance: 86.2,
    avgScore: 78.5,
    interventions: 15,
  },
  {
    department: "Electrical Engineering",
    totalStudents: 232,
    atRiskStudents: 22,
    riskPercentage: 9.5,
    avgAttendance: 87.8,
    avgScore: 79.2,
    interventions: 12,
  },
  {
    department: "Mechanical Engineering",
    totalStudents: 183,
    atRiskStudents: 15,
    riskPercentage: 8.2,
    avgAttendance: 88.5,
    avgScore: 77.8,
    interventions: 8,
  },
  {
    department: "Civil Engineering",
    totalStudents: 180,
    atRiskStudents: 9,
    riskPercentage: 5.0,
    avgAttendance: 90.1,
    avgScore: 80.4,
    interventions: 5,
  },
  {
    department: "Biotechnology",
    totalStudents: 145,
    atRiskStudents: 8,
    riskPercentage: 5.5,
    avgAttendance: 91.2,
    avgScore: 82.1,
    interventions: 4,
  },
  {
    department: "Information Technology",
    totalStudents: 172,
    atRiskStudents: 7,
    riskPercentage: 4.1,
    avgAttendance: 89.8,
    avgScore: 81.3,
    interventions: 3,
  },
]

const atRiskStudentsData = [
  {
    id: "CS2021001",
    name: " Mohan Kumar",
    department: "Computer Science",
    riskLevel: "Critical",
    attendance: 58,
    avgScore: 42,
    feeStatus: "Pending",
    lastIntervention: "2024-01-20",
    interventionType: "Parent Meeting",
  },
  {
    id: "ME2021089",
    name: "Aisha Khan",
    department: "Mechanical Engineering",
    riskLevel: "Critical",
    attendance: 45,
    avgScore: 35,
    feeStatus: "Paid",
    lastIntervention: "2024-01-18",
    interventionType: "Counseling",
  },
  {
    id: "EE2021045",
    name: "Arjun Mehta",
    department: "Electrical Engineering",
    riskLevel: "Warning",
    attendance: 82,
    avgScore: 78,
    feeStatus: "Pending",
    lastIntervention: "2024-01-15",
    interventionType: "Mentor Alert",
  },
  {
    id: "CS2021156",
    name: "Rohan Verma",
    department: "Computer Science",
    riskLevel: "Warning",
    attendance: 76,
    avgScore: 65,
    feeStatus: "Paid",
    lastIntervention: "2024-01-12",
    interventionType: "Academic Support",
  },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [dateRange, setDateRange] = useState<Date | undefined>(new Date())
  const [reportType, setReportType] = useState("summary")

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

  const handleDownloadReport = (format: string, type: string) => {
    // Mock download functionality
    console.log(`Downloading ${type} report in ${format} format`)
    // In a real app, this would trigger actual file download
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
              <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h1>
              <p className="text-muted-foreground">Generate comprehensive reports and download analytics data</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => handleDownloadReport("excel", "summary")}>
                <Download className="h-4 w-4 mr-2" />
                Download Excel
              </Button>
              <Button onClick={() => handleDownloadReport("pdf", "summary")}>
                <FileText className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Report filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Report Configuration</CardTitle>
              <CardDescription>Configure report parameters and date ranges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Report Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Summary Report</SelectItem>
                    <SelectItem value="detailed">Detailed Analysis</SelectItem>
                    <SelectItem value="at-risk">At-Risk Students</SelectItem>
                    <SelectItem value="department">Department Wise</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="ee">Electrical Engineering</SelectItem>
                    <SelectItem value="me">Mechanical Engineering</SelectItem>
                    <SelectItem value="ce">Civil Engineering</SelectItem>
                    <SelectItem value="bt">Biotechnology</SelectItem>
                    <SelectItem value="it">Information Technology</SelectItem>
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange ? format(dateRange, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dateRange} onSelect={setDateRange} initialFocus />
                  </PopoverContent>
                </Popover>

                <Button>Generate Report</Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="at-risk">At-Risk Students</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key metrics summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-2xl font-bold">1,247</p>
                        <p className="text-sm text-muted-foreground">Total Students</p>
                        <p className="text-xs text-green-600 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +2.1% vs last month
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-8 w-8 text-destructive" />
                      <div>
                        <p className="text-2xl font-bold text-destructive">89</p>
                        <p className="text-sm text-muted-foreground">At-Risk Students</p>
                        <p className="text-xs text-green-600 flex items-center">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          -17.6% vs last month
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-8 w-8 text-secondary" />
                      <div>
                        <p className="text-2xl font-bold">87.3%</p>
                        <p className="text-sm text-muted-foreground">Avg Attendance</p>
                        <p className="text-xs text-green-600 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +1.2% vs last month
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-8 w-8 text-accent" />
                      <div>
                        <p className="text-2xl font-bold">94.7%</p>
                        <p className="text-sm text-muted-foreground">Fee Collection</p>
                        <p className="text-xs text-green-600 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +3.1% vs last month
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Weekly performance chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Performance Summary</CardTitle>
                  <CardDescription>Key metrics over the past 4 weeks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyReportData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="atRiskStudents" fill="#ef4444" name="At-Risk Students" />
                        <Bar dataKey="avgAttendance" fill="#10b981" name="Avg Attendance %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Risk distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Level Distribution</CardTitle>
                    <CardDescription>Current student risk breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Safe", value: 1135, color: "#10b981" },
                              { name: "Warning", value: 89, color: "#f59e0b" },
                              { name: "Critical", value: 23, color: "#ef4444" },
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                          >
                            <Cell fill="#10b981" />
                            <Cell fill="#f59e0b" />
                            <Cell fill="#ef4444" />
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Intervention Success Rate</CardTitle>
                    <CardDescription>Monthly intervention effectiveness</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyReportData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="successRate"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends Analysis</CardTitle>
                  <CardDescription>6-month trend analysis of key metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyReportData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="atRiskStudents"
                          stroke="#ef4444"
                          strokeWidth={2}
                          name="At-Risk Students"
                        />
                        <Line
                          type="monotone"
                          dataKey="interventions"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          name="Interventions"
                        />
                        <Line
                          type="monotone"
                          dataKey="successRate"
                          stroke="#10b981"
                          strokeWidth={2}
                          name="Success Rate %"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">85.3%</p>
                      <p className="text-sm text-muted-foreground">Current Success Rate</p>
                      <p className="text-xs text-green-600 mt-1">+12.1% improvement</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-blue-600">43</p>
                      <p className="text-sm text-muted-foreground">Active Interventions</p>
                      <p className="text-xs text-red-600 mt-1">-30.6% vs peak</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-purple-600">1</p>
                      <p className="text-sm text-muted-foreground">Dropouts This Month</p>
                      <p className="text-xs text-green-600 mt-1">-80% vs last month</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="departments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Department-wise Analysis</CardTitle>
                  <CardDescription>Comparative analysis across all departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Department</TableHead>
                          <TableHead>Total Students</TableHead>
                          <TableHead>At-Risk Students</TableHead>
                          <TableHead>Risk %</TableHead>
                          <TableHead>Avg Attendance</TableHead>
                          <TableHead>Avg Score</TableHead>
                          <TableHead>Interventions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {departmentReportData.map((dept, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{dept.department}</TableCell>
                            <TableCell>{dept.totalStudents}</TableCell>
                            <TableCell>{dept.atRiskStudents}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  dept.riskPercentage > 8
                                    ? "risk-critical"
                                    : dept.riskPercentage > 5
                                      ? "risk-warning"
                                      : "risk-safe"
                                }
                              >
                                {dept.riskPercentage}%
                              </Badge>
                            </TableCell>
                            <TableCell>{dept.avgAttendance}%</TableCell>
                            <TableCell>{dept.avgScore}%</TableCell>
                            <TableCell>{dept.interventions}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Department Risk Comparison</CardTitle>
                  <CardDescription>Visual comparison of risk levels across departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={departmentReportData} margin={{ bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="department" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="riskPercentage" fill="#ef4444" name="Risk Percentage" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="at-risk" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>At-Risk Students Detailed Report</CardTitle>
                      <CardDescription>Comprehensive list of students requiring intervention</CardDescription>
                    </div>
                    <Button onClick={() => handleDownloadReport("excel", "at-risk")}>
                      <Download className="h-4 w-4 mr-2" />
                      Export List
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student Info</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Risk Level</TableHead>
                          <TableHead>Attendance</TableHead>
                          <TableHead>Avg Score</TableHead>
                          <TableHead>Fee Status</TableHead>
                          <TableHead>Last Intervention</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {atRiskStudentsData.map((student, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{student.name}</p>
                                <p className="text-sm text-muted-foreground">{student.id}</p>
                              </div>
                            </TableCell>
                            <TableCell>{student.department}</TableCell>
                            <TableCell>
                              <Badge className={getRiskBadgeClass(student.riskLevel)}>{student.riskLevel}</Badge>
                            </TableCell>
                            <TableCell>
                              <span className={student.attendance < 60 ? "text-red-600" : "text-green-600"}>
                                {student.attendance}%
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={student.avgScore < 50 ? "text-red-600" : "text-green-600"}>
                                {student.avgScore}%
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge variant={student.feeStatus === "Paid" ? "default" : "destructive"}>
                                {student.feeStatus}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="text-sm">{student.lastIntervention}</p>
                                <p className="text-xs text-muted-foreground">{student.interventionType}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button size="sm" variant="outline">
                                View Profile
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-600">23</p>
                      <p className="text-sm text-muted-foreground">Critical Risk</p>
                      <p className="text-xs text-muted-foreground">Require immediate intervention</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-yellow-500">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-600">66</p>
                      <p className="text-sm text-muted-foreground">Warning Level</p>
                      <p className="text-xs text-muted-foreground">Need monitoring and support</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">43</p>
                      <p className="text-sm text-muted-foreground">Active Interventions</p>
                      <p className="text-xs text-muted-foreground">Currently receiving support</p>
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
