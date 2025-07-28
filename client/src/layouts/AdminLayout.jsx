import React, { useEffect } from "react";
import AdminHeader from "../components/Header/AdminHeader";
import { Outlet } from "react-router-dom";
import { checkAuthStatus } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const AdminLayout = () => {
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.auth);

    // useEffect(() => {
    //     dispatch(checkAuthStatus("Admin"));
    // }, [dispatch]);

    // if (error) {
    //     console.log("hello",error)
    //     window.location.replace("/admin-login");
    // }

    return (
        <div>
            <AdminHeader />
            <div className=" mt-[65px]">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
