import { Route, Routes } from "react-router-dom";
import Home from "../pages/User/Home";
import UserProfileDashboard from "../pages/User/UserProfileDashboard";
import UserLayout from "../layouts/UserLayout";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Login from "../pages/auth/Login";
import GroupConfessionPage from "../pages/User/GroupConfessionPage";
import ConfessionGroups from "../pages/User/ConfessionGroups";

function UserRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<UserLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<UserProfileDashboard />} />
                <Route path="/confession-page/:groupId" element={<GroupConfessionPage />} />
                <Route path="/groups" element={<ConfessionGroups />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default UserRoutes;
