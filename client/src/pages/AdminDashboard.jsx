import React from "react";
import { motion } from "framer-motion";
import { CardContent, Card } from "../components/ui/Card";
import { Users, BarChart3, Activity, Calendar, Loader2, Settings, Shield } from "lucide-react";
import { useDashboard } from "../hooks/useDashboard";
import { formatNumber } from "../utils/format";
import Button from "../components/ui/Button";

export default function AdminDashboard() {
  const { data: dashboardData, loading, error } = useDashboard();
    console.log(dashboardData)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="ml-[15rem] p-10 min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-white">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <motion.h1 className="bg-gradient-to-r from-purple-700 to-teal-900 bg-clip-text text-5xl text-transparent mb-1 text-3xl font-bold">
          Admin Dashboard
        </motion.h1>
        <motion.p className="text-sm text-gray-700">
          Manage your Community and track Growth
        </motion.p>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Total Users Card */}
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="flex justify-between items-center p-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-3xl font-bold text-purple-700">
                {formatNumber(dashboardData?.totalUsers || 0)}
              </p>
              <p className="text-xs text-green-500 mt-1">
                +{formatNumber(dashboardData?.newUsersThisMonth || 0)} this month
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-purple-700" />
            </div>
          </CardContent>
        </Card>

        {/* Active Users Card */}
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="flex justify-between items-center p-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-3xl font-bold text-blue-600">
                {formatNumber(dashboardData?.activeUsers || 0)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Active in last 30 days
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        {/* Today's Attendance Card */}
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="flex justify-between items-center p-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Today's Attendance</p>
              <p className="text-3xl font-bold text-green-600">
                {formatNumber(dashboardData?.todaysAttendance || 0)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Users checked in today
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        {/* User Growth Card */}
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="flex justify-between items-center p-6">
            <div>
              <p className="text-sm font-medium text-gray-500">User Growth</p>
              <p className="text-3xl font-bold text-teal-600">
                {formatNumber(dashboardData?.userGrowthRate || 0)}%
              </p>
              <p className="text-xs text-gray-500 mt-1">
                This month
              </p>
            </div>
            <div className="bg-teal-100 p-3 rounded-full">
              <BarChart3 className="w-6 h-6 text-teal-600" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Quick Actions */}
        <Card className="rounded-2xl shadow-xl">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
              <Settings className="w-5 h-5" /> Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="flex flex-col h-24 items-center justify-center gap-2 rounded-xl">
                <Users className="w-5 h-5" />
                <span>Manage Users</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-24 items-center justify-center gap-2 rounded-xl">
                <Calendar className="w-5 h-5" />
                <span>Schedule</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-24 items-center justify-center gap-2 rounded-xl">
                <BarChart3 className="w-5 h-5" />
                <span>Analytics</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-24 items-center justify-center gap-2 rounded-xl">
                <Shield className="w-5 h-5" />
                <span>Security</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-24 items-center justify-center gap-2 rounded-xl">
                <Activity className="w-5 h-5" />
                <span>Activity Logs</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-24 items-center justify-center gap-2 rounded-xl">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="rounded-2xl shadow-xl">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
              <Activity className="w-5 h-5" /> Recent Activity
            </h2>
            <div className="space-y-4">
              {[
                { id: 1, user: "John Doe", action: "completed a meditation", time: "2 min ago" },
                { id: 2, user: "Jane Smith", action: "joined the community", time: "15 min ago" },
                { id: 3, user: "Alex Johnson", action: "reached 7-day streak", time: "1 hour ago" },
                { id: 4, user: "Sam Wilson", action: "watered their tree", time: "2 hours ago" },
              ].map((item) => (
                <motion.div 
                  key={item.id}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      <span className="font-semibold">{item.user}</span> {item.action}
                    </p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}