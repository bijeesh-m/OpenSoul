import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLayout from "../layouts/AdminLayout";
import StudentManagement from "../pages/admin/StudentManagement";
import ConfessionGroupManagement from "../pages/admin/GroupManagement";
import AdminLogin from "../pages/auth/AdminLogin";

function AdminRoutes() {
    return (
        <Routes>
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/" element={<AdminLayout />}>
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/students" element={<StudentManagement />} />
                <Route path="/groups" element={<ConfessionGroupManagement />} />
            </Route>
        </Routes>
    );
}

export default AdminRoutes;
