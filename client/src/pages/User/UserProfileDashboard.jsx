import React, { useEffect, useState } from "react";
import groupImg1 from "/src/assets/campus_secret.jpg";
import groupImg2 from "/src/assets/dom_life.jpg";
import SuggestedGroups from "../../components/user/SuggestedGroups";
import UserGroups from "../../components/user/UserGroups";
import UserDetails from "../../components/user/UserDetails";
import { useSelector } from "react-redux";
import { getConfessionGroups } from "../../apis/userApis";

const UserProfileDashboard = () => {
    const { user } = useSelector((state) => state.auth);

    console.log(user);

    const [confessionGroups, setConfessionGroups] = useState([]);
    
        useEffect(() => {
            async function fetchData() {
                // You can await here
                const data = await getConfessionGroups();
                setConfessionGroups(data.confessionGroups);
            }
            fetchData();
        }, []);

    

    // const suggestedGroups = [
    //     { name: "Late Night Thoughts", members: 320, image: groupImg1 },
    //     { name: "Exam Stress Confessions", members: 180, image: groupImg2 },
    // ];

    return (
        <div className="min-h-screen overflow-hidden w-screen py-8 bg-gray-100">
            <div className="container mx-auto px-4">
                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                    
                    {/* Left Column - User Profile */}
                    <div className=" p-2 ">
                        <UserDetails user={user} />
                    </div>

                    {/* Right Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* User Groups */}
                        <div className="  p-2">
                            <UserGroups groups={user?.confessionGroups} />
                        </div>
                        
                        {/* Suggested Groups */}
                        <div className=" p-2">
                            <SuggestedGroups suggestedGroups={confessionGroups} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserProfileDashboard;
