import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState , useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./hooks/useAuth";
import Loader from "./components/ui/Loader";

import Login from "./components/auth/Login";
import Register from "./components/auth/RegisterForm";

import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import JoinMeeting from "./pages/user/JoinMeeting";
import Attendance from "./pages/user/Attendance";
import TreeGrowth from "./pages/user/TreeGrowth";
import Achievements from "./pages/user/Achievements";
import Settings from "./pages/user/Settings";

import AdminDashboard from "./pages/AdminDashboard";
import AllUsers from "./pages/admin/AllUsers";
import CreateMeeting from "./pages/admin/CreateMeeting";
import AttendanceReports from "./pages/admin/AttendanceReports";
import EngagementControl from "./pages/admin/EngagementControl";
import Analytics from "./pages/admin/Analytics";
import SystemSettings from "./pages/admin/SystemSettings";
import SecurityLogs from "./pages/admin/SecurityLogs";

import AdminLayout from "./components/layout/AdminLayout";
import UserLayout from "./components/layout/UserLayout";
import LandingPage from "./pages/LandingPage/LandingPage";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs/AboutUs";
import Programs from "./pages/Programs";
import AttendanceList from "./pages/admin/AttendanceList";
import Research from "./pages/Research";
import TextLoader from "./components/ui/TextLoader";
import MeditationVideos from "./pages/user/MeditationVideos";
import Feedback from "./pages/user/Feedback";


function App() {
  const { user, loadingUser } = useAuth();
    const [showSplash, setShowSplash] = useState(true);

  // ✅ Loader while checking auth
  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-teal-50">
        <Loader size={60} />
      </div>
    );
  }

   useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 8500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <TextLoader />; // You can center it with full-screen styles
  }
  
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50">
          <Routes>

            {/* ===========================================
               ✅ PUBLIC ROUTES
            ============================================ */}



            {/* Landing Page - Anyone can access */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<UserLayout><Dashboard /></UserLayout>} />

            <Route
              path="/auth/login"
              element={
                !user ? (
                  <Login />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />

            <Route
              path="/auth/register"
              element={
                !user ? (
                  <Register />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/research" element={<Research />} />

            <Route path="/meditation-videos" element={<MeditationVideos />} />

            <Route
              path="/feedback"
              element={user ? <Feedback /> : <Navigate to="/auth/login" replace />}
            />
          

              <Route
              path="/admin/dashboard"
              element={<AdminLayout><AdminDashboard /></AdminLayout>}
               />


            {/* ===========================================
               ✅ PROTECTED DASHBOARD ROUTE
            ============================================ */}
           
            <Route
              path="/dashboard"
              element={
                user &&
                  user.role === "admin" ? (
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  ) :  (
                  <Navigate to="/auth/login" replace />
                )
              }
            />



            {/* ===========================================
               ✅ ADMIN ROUTES (Protected)
            ============================================ */}

            <Route
              path="/admin"
              element={
                user?.role === "admin" ? (
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/admin/users"
              element={
                user?.role === "admin" ? (
                  <AdminLayout>
                    <AllUsers />
                  </AdminLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/admin/create-meeting"
              element={
                user?.role === "admin" ? (
                  <AdminLayout>
                    <CreateMeeting />
                  </AdminLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/admin/attendance-reports"
              element={
                user?.role === "admin" ? (
                  <AdminLayout>
                    <AttendanceReports />
                  </AdminLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/admin/engagement"
              element={
                user?.role === "admin" ? (
                  <AdminLayout>
                    <EngagementControl />
                  </AdminLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/admin/attendence"
              element={
                user?.role === "admin" ? (
                  <AdminLayout>
                   <AttendanceList />
                  </AdminLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/admin/settings"
              element={
                user?.role === "admin" ? (
                  <AdminLayout>
                    <SystemSettings />
                  </AdminLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/admin/security-logs"
              element={
                user?.role === "admin" ? (
                  <AdminLayout>
                    <SecurityLogs />
                  </AdminLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            {/* ===========================================
               ✅ USER ROUTES (Protected)
            ============================================ */}


            <Route
              path="/user/profile"
              element={
                  <UserLayout>
                    <Profile />
                  </UserLayout>
              }
            />

            <Route
              path="/join-meeting"
              element={
                user ? ( 
                   <UserLayout>
                    <JoinMeeting />
                  </UserLayout>) : (
                    <Navigate to="/auth/login" replace />
                  )
              }
            />

            <Route
              path="/attendance"
              element={
                user?.role === "user" ? (
                  <UserLayout>
                    <Attendance />
                  </UserLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/user/tree-growth"
              element={
                user?.role === "user" ? (
                  <UserLayout>
                    <TreeGrowth />
                  </UserLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/user/achievements"
              element={
                user?.role === "user" ? (
                  <UserLayout>
                    <Achievements />
                  </UserLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/user/settings"
              element={
                user?.role === "user" ? (
                  <UserLayout>
                    <Settings />
                  </UserLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            {/* ===========================================
               ✅ FALLBACK
            ============================================ */}

            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </div>
      </BrowserRouter>

      <Toaster position="top-right" />
    </>
  );
}

export default App;
