import React, { useState ,useEffect } from "react";
import { motion } from "framer-motion";
import { Users, BarChart3, Activity, Calendar, Settings, Shield, Zap, TrendingUp, Clock } from "lucide-react";
import API from "../utils/api";
import toast from "react-hot-toast";

const DUMMY_DASHBOARD_DATA = {
    totalUsers: 12450,
    newUsersThisMonth: 890,
    activeUsers: 4200,
    todaysAttendance: 1550,
    userGrowthRate: 7.2,
    totalSessions: 58900,
    averageSessionDuration: 22,
    conversionRate: 15.8,
};

const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
};

const Card = ({ children, className }) => <div className={`bg-white/90 backdrop-blur-sm border border-green-100 rounded-2xl shadow-sm hover:shadow-md transition-all ${className}`}>{children}</div>;
const CardContent = ({ children, className }) => <div className={`p-6 ${className}`}>{children}</div>;
const Button = ({ children, className }) => <div className={`bg-green-50/80 border border-green-200 text-green-700 hover:bg-green-100/80 transition-all shadow-sm hover:shadow ${className}`}>{children}</div>;


const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

export default function AdminDashboard() {

    const [totalUsers, setTotalUsers] = useState([]);
    const [activeUsers, setActiveUsers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meetings,setMeetings] = useState([]);

    const dashboardData = DUMMY_DASHBOARD_DATA;

    // Calculate active users (users with active subscription in last 21 days)
   const calculateActiveUsers = (users) => {
    if (!users || !Array.isArray(users)) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
    
    return users.filter(user => {
        if (!user.subscription?.endDate) return false;
        const endDate = new Date(user.subscription.endDate);
        endDate.setHours(0, 0, 0, 0); // Reset time to start of day
        
        const timeDiff = endDate - today;
        const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        
        // Return true if subscription ends today or in the next 21 days
        return diffDays >= 0 && diffDays <= 21;
    }).length;
};
    // Fetch users and calculate active users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await API.get('/user/getUsers');
                const users = response.data.users || [];
                setTotalUsers(users);
                setActiveUsers(calculateActiveUsers(users));
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to load user data');
                toast.error('Failed to load user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        try {
            setLoading(true);
            const res = API.get('/meetings/getAllSessions');
            const sessions = res.data;
            setMeetings(sessions);
            toast.success("Sessions fetched successfully")
            setLoading(false);
        } catch (error) {
            toast.error("Failed to fetch sessions ")
        }
        fetchAllSessions();
    },[])

    console.log(meetings);

    return (
        <div className="admin-scroll ml-1 md:ml-[18rem] p-10 min-h-screen bg-gradient-to-br from-green-50 via-cream-50 to-white text-gray-800">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10"
            >
                <motion.h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">
                    <Zap className="inline-block w-7 h-7 mr-3 text-green-500" />
                    Admin Dashboard
                </motion.h1>
                <motion.p className="text-lg text-gray-600 pl-11">
                    Monitoring Real-time Community Metrics
                </motion.p>
            </motion.div>

            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={item}>
                    <Card className="hover:border-green-200">
                        <CardContent className="flex justify-between items-center p-6">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Users</p>
                                <p className="text-4xl font-bold text-green-700 mt-1">
                                    {loading ? (
                                        <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                                    ) : (
                                        formatNumber(totalUsers.length || 0)
                                    )}
                                </p>
                                <p className="text-sm text-green-600 mt-2">
                                    +{formatNumber(dashboardData?.newUsersThisMonth || 0)} <span className="text-gray-500">new this month</span>
                                </p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                <Users className="w-7 h-7 text-green-500" />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={item}>
                    <Card className="hover:border-green-200">
                        <CardContent className="flex justify-between items-center p-6">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Active Users (21D)</p>
                                <p className="text-4xl font-bold text-green-600 mt-1">
                                    {loading ? (
                                        <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                                    ) : (
                                        formatNumber(activeUsers)
                                    )}
                                </p>
                                <p className="text-xs text-green-500 mt-2">
                                    <TrendingUp className="inline w-4 h-4 mr-1 text-green-500" /> High Engagement Rate
                                </p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                <Activity className="w-7 h-7 text-green-500" />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={item}>
                    <Card className="hover:border-green-200">
                        <CardContent className="flex justify-between items-center p-6">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Sessions Logged</p>
                                <p className="text-4xl font-bold text-amber-600 mt-1">
                                    {formatNumber(dashboardData?.totalSessions || 0)}
                                </p>
                                <p className="text-sm text-amber-500 mt-2">
                                    <Clock className="inline w-4 h-4 mr-1 text-amber-500" /> {dashboardData?.averageSessionDuration} min avg.
                                </p>
                            </div>
                            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                                <Calendar className="w-7 h-7 text-amber-500" />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={item}>
                    <Card className="hover:border-green-200">
                        <CardContent className="flex justify-between items-center p-6">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Growth Rate</p>
                                <p className="text-4xl font-bold text-green-600 mt-1">
                                    {formatNumber(dashboardData?.userGrowthRate || 0)}%
                                </p>
                                <p className="text-sm text-green-500 mt-2">
                                    <BarChart3 className="inline w-4 h-4 mr-1 text-green-500" /> MoM Performance
                                </p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                <BarChart3 className="w-7 h-7 text-green-500" />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <Card className="rounded-2xl shadow-xl">
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-6 text-gray-700 flex items-center gap-2 border-b border-green-100 pb-3">
                            <Settings className="w-5 h-5 text-green-500" /> Access Consoles
                        </h2>
                        <div className="grid grid-cols-3 gap-4">
                            <Button className="flex flex-col h-28 items-center justify-center gap-2 rounded-xl text-lg hover:text-white">
                                <Users className="w-6 h-6 text-cyan-400" />
                                <span className="text-sm font-medium">Manage Users</span>
                            </Button>
                            <Button className="flex flex-col h-28 items-center justify-center gap-2 rounded-xl text-lg hover:text-white">
                                <Calendar className="w-6 h-6 text-purple-400" />
                                <span className="text-sm font-medium">Schedule</span>
                            </Button>
                            <Button className="flex flex-col h-28 items-center justify-center gap-2 rounded-xl text-lg hover:text-white">
                                <BarChart3 className="w-6 h-6 text-lime-400" />
                                <span className="text-sm font-medium">Analytics</span>
                            </Button>
                            <Button className="flex flex-col h-28 items-center justify-center gap-2 rounded-xl text-lg hover:text-white">
                                <Shield className="w-6 h-6 text-yellow-400" />
                                <span className="text-sm font-medium">Security Audit</span>
                            </Button>
                            <Button className="flex flex-col h-28 items-center justify-center gap-2 rounded-xl text-lg hover:text-white">
                                <Activity className="w-6 h-6 text-red-400" />
                                <span className="text-sm font-medium">Activity Logs</span>
                            </Button>
                            <Button className="flex flex-col h-28 items-center justify-center gap-2 rounded-xl text-lg hover:text-white">
                                <Settings className="w-6 h-6 text-gray-400" />
                                <span className="text-sm font-medium">System Config</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-xl">
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-6 text-gray-700 flex items-center gap-2 border-b border-green-100 pb-3">
                            <Activity className="w-5 h-5 text-green-500" /> Recent Activity
                        </h2>
                        <div className="space-y-4">
                            {[
                                { id: 1, user: "John Doe", action: "completed a session", time: "2 min ago", color: 'cyan' },
                                { id: 2, user: "Jane Smith", action: "joined the community", time: "15 min ago", color: 'purple' },
                                { id: 3, user: "Alex Johnson", action: "reached 7-day streak", time: "1 hour ago", color: 'lime' },
                                { id: 4, user: "Sam Wilson", action: "triggered tree level up", time: "2 hours ago", color: 'yellow' },
                                { id: 5, user: "User 993", action: "login attempt success", time: "3 hours ago", color: 'gray' },
                            ].map((item) => (
                                <motion.div 
                                    key={item.id}
                                    whileHover={{ x: 5, backgroundColor: 'rgba(240, 253, 244, 0.8)' }}
                                    className="flex items-center gap-4 p-3 rounded-xl border border-green-100 bg-white/50 cursor-pointer transition-all"
                                >
                                    <div className={`w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse`} />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-700">
                                            <span className="font-semibold text-green-600">{item.user}</span> {item.action}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                                    </div>
                                    <div className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">
                                        View
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