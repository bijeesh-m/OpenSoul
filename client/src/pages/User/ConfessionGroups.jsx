import React, { useEffect, useState } from "react";
import { getAllConfessionGroups } from "../../apis/userApis";

import AllConfessionGroups from "../../components/confession/ConfessionGroup";

const ConfessionGroups = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroup = async () => {
            const data = await getAllConfessionGroups();
            setGroups(data);
        };

        fetchGroup();
    }, []);

    return (
        <div className=" w-screen">
            <AllConfessionGroups groups={groups} allGroups={true} />
        </div>
    );
};

export default ConfessionGroups;
