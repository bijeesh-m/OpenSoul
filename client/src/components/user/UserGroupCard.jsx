import React from "react";
import { useNavigate } from "react-router-dom";

const UserGroupCard = ({ group }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/confession-page/${group._id}`)}
      className="w-full flex flex-col rounded-2xl overflow-hidden h-46 shadow-2xl bg-white  justify-center   text-center "
    >
      <div className=" flex-1 bg-yellow-100   " style={{backgroundImage:`url(${group.groupIcon})`, backgroundSize:"cover"}} >
        {/* <div className=" w-18 h-18 rounded-full bg-red-300 "></div> */}
      </div>
      <div className=" flex-1 flex-col  flex justify-center items-center">
          <h1 className="text-xl font-bold">{group.name}</h1>
          <p className=" font-thin line-clamp-1">{group.description}</p>
      </div>
    </div>
  );
};

export default UserGroupCard;
