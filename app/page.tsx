import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Users, TrendingUp, TrendingDown, Bell } from "lucide-react"
import { DashboardCharts } from "@/components/dashboard-charts"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      {/* Main content */}
      <div className="md:ml-64">
        <DashboardHeader />

        <main className="p-6">
          {/* Page title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
            <p className="text-muted-foreground">Monitor student performance and identify at-risk students</p>
          </div>

          {/* Key metrics cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +2.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">At Risk Students</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">89</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingDown className="inline h-3 w-3 mr-1" />
                  -5.2% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87.3%</div>
                <p className="text-xs text-muted-foreground">+1.2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fee Collection</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.7%</div>
                <p className="text-xs text-muted-foreground">+3.1% from last month</p>
              </CardContent>
            </Card>
          </div>

          <DashboardCharts />

          {/* Recent alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Recent Risk Alerts
                </CardTitle>
                <CardDescription>Students requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Mohan Kumar",
                      id: "CS2021001",
                      risk: "Critical",
                      reason: "Attendance < 60%, Failed 2 exams",
                    },
                    { name: "Arjun Mehta", id: "EE2021045", risk: "Warning", reason: "Fee pending 3 months" },
                    {
                      name: "Aisha Khan",
                      id: "ME2021089",
                      risk: "Critical",
                      reason: "Attendance < 50%, No submissions",
                    },
                    { name: "Rohan Verma", id: "CS2021156", risk: "Warning", reason: "Declining test scores" },
                  ].map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.id}</p>
                        <p className="text-xs text-muted-foreground mt-1">{student.reason}</p>
                      </div>
                      <Badge className={student.risk === "Critical" ? "risk-critical" : "risk-warning"}>
                        {student.risk}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/students" className="block">
                    <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="text-center">
                        <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <p className="font-medium">View All Students</p>
                        <p className="text-xs text-muted-foreground">Manage student records</p>
                      </div>
                    </Card>
                  </Link>

                  <Link href="/alerts" className="block">
                    <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="text-center">
                        <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-destructive" />
                        <p className="font-medium">Risk Alerts</p>
                        <p className="text-xs text-muted-foreground">Review at-risk students</p>
                      </div>
                    </Card>
                  </Link>

                  <Link href="/notifications" className="block">
                    <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="text-center">
                        <Bell className="h-8 w-8 mx-auto mb-2 text-secondary" />
                        <p className="font-medium">Send Notifications</p>
                        <p className="text-xs text-muted-foreground">Alert mentors/parents</p>
                      </div>
                    </Card>
                  </Link>

                  <Link href="/reports" className="block">
                    <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="text-center">
                        <TrendingUp className="h-8 w-8 mx-auto mb-2 text-accent" />
                        <p className="font-medium">Generate Report</p>
                        <p className="text-xs text-muted-foreground">Download analytics</p>
                      </div>
                    </Card>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
