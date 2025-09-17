"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, Eye, AlertTriangle } from "lucide-react"

// Mock student data
const studentsData = [
  {
    id: "CS2021001",
    name: "Mohan Kumar",
    department: "Computer Science",
    semester: "6th",
    attendance: 58,
    avgScore: 42,
    feeStatus: "Pending",
    feePendingMonths: 3,
    riskLevel: "Critical",
    lastActivity: "2024-01-15",
  },
  {
    id: "EE2021045",
    name: "Arjun Mehta",
    department: "Electrical Engineering",
    semester: "4th",
    attendance: 82,
    avgScore: 78,
    feeStatus: "Pending",
    feePendingMonths: 3,
    riskLevel: "Warning",
    lastActivity: "2024-01-20",
  },
  {
    id: "ME2021089",
    name: "Aisha Khan",
    department: "Mechanical Engineering",
    semester: "5th",
    attendance: 45,
    avgScore: 35,
    feeStatus: "Paid",
    feePendingMonths: 0,
    riskLevel: "Critical",
    lastActivity: "2024-01-10",
  },
  {
    id: "CS2021156",
    name: "Rohan Verma",
    department: "Computer Science",
    semester: "3rd",
    attendance: 76,
    avgScore: 65,
    feeStatus: "Paid",
    feePendingMonths: 0,
    riskLevel: "Warning",
    lastActivity: "2024-01-22",
  },
  {
    id: "BT2021234",
    name: "Neha Sharma",
    department: "Biotechnology",
    semester: "2nd",
    attendance: 92,
    avgScore: 88,
    feeStatus: "Paid",
    feePendingMonths: 0,
    riskLevel: "Safe",
    lastActivity: "2024-01-23",
  },
  {
    id: "CE2021078",
    name: "Vikram Singh",
    department: "Civil Engineering",
    semester: "7th",
    attendance: 89,
    avgScore: 82,
    feeStatus: "Paid",
    feePendingMonths: 0,
    riskLevel: "Safe",
    lastActivity: "2024-01-24",
  },
  {
    id: "IT2021145",
    name: "Priya Patel",
    department: "Information Technology",
    semester: "4th",
    attendance: 67,
    avgScore: 58,
    feeStatus: "Pending",
    feePendingMonths: 1,
    riskLevel: "Warning",
    lastActivity: "2024-01-18",
  },
  {
    id: "EC2021092",
    name: "Karan Gupta",
    department: "Electronics",
    semester: "6th",
    attendance: 94,
    avgScore: 91,
    feeStatus: "Paid",
    feePendingMonths: 0,
    riskLevel: "Safe",
    lastActivity: "2024-01-25",
  },
]

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [semesterFilter, setSemesterFilter] = useState("all")

  // Filter students based on search and filters
  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || student.department === departmentFilter
    const matchesRisk = riskFilter === "all" || student.riskLevel === riskFilter
    const matchesSemester = semesterFilter === "all" || student.semester === semesterFilter

    return matchesSearch && matchesDepartment && matchesRisk && matchesSemester
  })

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

  const getAttendanceColor = (attendance: number) => {
    if (attendance < 60) return "text-red-600"
    if (attendance < 75) return "text-yellow-600"
    return "text-green-600"
  }

  const getScoreColor = (score: number) => {
    if (score < 40) return "text-red-600"
    if (score < 60) return "text-yellow-600"
    return "text-green-600"
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
              <h1 className="text-3xl font-bold text-foreground mb-2">Student Management</h1>
              <p className="text-muted-foreground">Monitor and manage all students with risk assessment</p>
            </div>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-foreground">{studentsData.length}</div>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">
                  {studentsData.filter((s) => s.riskLevel === "Critical").length}
                </div>
                <p className="text-sm text-muted-foreground">Critical Risk</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-yellow-600">
                  {studentsData.filter((s) => s.riskLevel === "Warning").length}
                </div>
                <p className="text-sm text-muted-foreground">Warning</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {studentsData.filter((s) => s.riskLevel === "Safe").length}
                </div>
                <p className="text-sm text-muted-foreground">Safe</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and search */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                    <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                    <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                    <SelectItem value="Biotechnology">Biotechnology</SelectItem>
                    <SelectItem value="Information Technology">Information Technology</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Risk Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="Warning">Warning</SelectItem>
                    <SelectItem value="Safe">Safe</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Semesters</SelectItem>
                    <SelectItem value="2nd">2nd Semester</SelectItem>
                    <SelectItem value="3rd">3rd Semester</SelectItem>
                    <SelectItem value="4th">4th Semester</SelectItem>
                    <SelectItem value="5th">5th Semester</SelectItem>
                    <SelectItem value="6th">6th Semester</SelectItem>
                    <SelectItem value="7th">7th Semester</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setDepartmentFilter("all")
                    setRiskFilter("all")
                    setSemesterFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Students table */}
          <Card>
            <CardHeader>
              <CardTitle>Students List ({filteredStudents.length} students)</CardTitle>
              <CardDescription>Comprehensive view of all students with risk indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Info</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Avg Score</TableHead>
                      <TableHead>Fee Status</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>{student.semester}</TableCell>
                        <TableCell>
                          <span className={getAttendanceColor(student.attendance)}>{student.attendance}%</span>
                        </TableCell>
                        <TableCell>
                          <span className={getScoreColor(student.avgScore)}>{student.avgScore}%</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant={student.feeStatus === "Paid" ? "default" : "destructive"}>
                              {student.feeStatus}
                            </Badge>
                            {student.feePendingMonths > 0 && (
                              <span className="text-xs text-muted-foreground">({student.feePendingMonths}m)</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRiskBadgeClass(student.riskLevel)}>
                            {student.riskLevel === "Critical" && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {student.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {student.riskLevel !== "Safe" && (
                              <Button variant="ghost" size="sm" className="text-destructive">
                                <AlertTriangle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
