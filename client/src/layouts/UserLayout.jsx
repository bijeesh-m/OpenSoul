import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus } from "../features/authSlice";

const UserLayout = () => {
    const { user, loading, error } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuthStatus("User")); // Check if user is logged in on page load
    }, [dispatch]);

    if (error) {
        window.location.replace("/login");
    }

    return (
        <div>
            <Header />
            <div className="mt-[50px] min-h-screen flex items-center justify-center">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default UserLayout;
