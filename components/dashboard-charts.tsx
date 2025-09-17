"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp, TrendingDown, Users, AlertTriangle } from "lucide-react"

// Mock data for charts
const riskDistributionData = [
  { name: "Safe", value: 1058, color: "#10b981" },
  { name: "Warning", value: 100, color: "#f59e0b" },
  { name: "Critical", value: 89, color: "#ef4444" },
]

const departmentRiskData = [
  { department: "Computer Science", safe: 245, warning: 28, critical: 15 },
  { department: "Electrical Eng.", safe: 198, warning: 22, critical: 12 },
  { department: "Mechanical Eng.", safe: 167, warning: 18, critical: 8 },
  { department: "Civil Engineering", safe: 156, warning: 15, critical: 9 },
  { department: "Biotechnology", safe: 134, warning: 8, critical: 3 },
  { department: "Information Tech.", safe: 158, warning: 9, critical: 5 },
]

const monthlyTrendsData = [
  { month: "Aug", totalStudents: 1247, atRisk: 95, avgAttendance: 89.2 },
  { month: "Sep", totalStudents: 1245, atRisk: 102, avgAttendance: 87.8 },
  { month: "Oct", totalStudents: 1243, atRisk: 108, avgAttendance: 86.5 },
  { month: "Nov", totalStudents: 1241, atRisk: 115, avgAttendance: 85.1 },
  { month: "Dec", totalStudents: 1239, atRisk: 98, avgAttendance: 86.8 },
  { month: "Jan", totalStudents: 1247, atRisk: 89, avgAttendance: 87.3 },
]

const attendanceHeatmapData = [
  { day: "Mon", week1: 92, week2: 89, week3: 87, week4: 85 },
  { day: "Tue", week1: 94, week2: 91, week3: 89, week4: 87 },
  { day: "Wed", week1: 91, week2: 88, week3: 86, week4: 84 },
  { day: "Thu", week1: 93, week2: 90, week3: 88, week4: 86 },
  { day: "Fri", week1: 89, week2: 86, week3: 84, week4: 82 },
]

const performanceMetricsData = [
  { metric: "Attendance Rate", current: 87.3, target: 90, status: "below" },
  { metric: "Pass Rate", current: 78.5, target: 80, status: "below" },
  { metric: "Fee Collection", current: 94.7, target: 95, status: "below" },
  { metric: "Student Satisfaction", current: 4.2, target: 4.0, status: "above" },
]

export function DashboardCharts() {
  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className="space-y-6">
      {/* Risk Distribution and Department Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Risk Distribution</CardTitle>
            <CardDescription>Overall risk level breakdown across all students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {riskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {riskDistributionData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Analysis by Department</CardTitle>
            <CardDescription>Department-wise breakdown of student risk levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentRiskData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="safe" stackId="a" fill="#10b981" name="Safe" />
                  <Bar dataKey="warning" stackId="a" fill="#f59e0b" name="Warning" />
                  <Bar dataKey="critical" stackId="a" fill="#ef4444" name="Critical" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends and Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Risk Trends</CardTitle>
            <CardDescription>At-risk student count and attendance trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="atRisk" fill="#ef4444" name="At-Risk Students" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="avgAttendance"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Avg Attendance %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key performance indicators vs targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {performanceMetricsData.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <div className="flex items-center gap-2">
                      {metric.status === "above" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <Badge variant={metric.status === "above" ? "default" : "destructive"}>
                        {metric.current}
                        {metric.metric.includes("Rate") || metric.metric.includes("Collection") ? "%" : ""}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${metric.status === "above" ? "bg-green-600" : "bg-red-600"}`}
                        style={{
                          width: `${Math.min((metric.current / metric.target) * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Target: {metric.target}
                      {metric.metric.includes("Rate") || metric.metric.includes("Collection") ? "%" : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Attendance Heatmap</CardTitle>
          <CardDescription>Daily attendance patterns across recent weeks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceHeatmapData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="week1" fill="#10b981" name="Week 1" />
                <Bar dataKey="week2" fill="#3b82f6" name="Week 2" />
                <Bar dataKey="week3" fill="#f59e0b" name="Week 3" />
                <Bar dataKey="week4" fill="#ef4444" name="Week 4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Key Insights:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Friday attendance consistently lower across all weeks</li>
              <li>• Week 4 shows declining trend, requiring intervention</li>
              <li>• Tuesday and Thursday maintain highest attendance rates</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Critical Alerts Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-red-600">23</p>
                <p className="text-sm text-muted-foreground">Critical Attendance Issues</p>
                <p className="text-xs text-muted-foreground">Students with &lt;60% attendance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">45</p>
                <p className="text-sm text-muted-foreground">Academic Performance Issues</p>
                <p className="text-xs text-muted-foreground">Students with failing grades</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingDown className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-600">21</p>
                <p className="text-sm text-muted-foreground">Fee Payment Issues</p>
                <p className="text-xs text-muted-foreground">Students with pending fees &gt;2 months</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
