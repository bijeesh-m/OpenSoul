import React, { useEffect, useState } from "react";
import ConfessionGroups from "../../components/confession/ConfessionGroup";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getConfessionGroups } from "../../apis/userApis";
import UserGroups from "./UserGroups";

const Home = () => {
    const [confessionGroups, setConfessionGroups] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const data = await getConfessionGroups();
            setConfessionGroups(data.confessionGroups);
        }
        fetchData();
    }, []);

    return (
        <div className="w-screen bg-slate-100">
            <UserGroups/>
            <ConfessionGroups groups={confessionGroups} />
        </div>
    );
};

export default Home;
