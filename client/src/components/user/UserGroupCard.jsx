import React from "react";
import { useNavigate } from "react-router-dom";

const UserGroupCard = ({ group }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/confession-page/${group._id}`)}
      className="w-full h-56 justify-center  text-center sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
    >
      <div className="rounded-xl overflow-hidden   bg-slate-800  shadow-lg transition-all duration-700 h-full flex flex-col justify-between">
        {/* Foreground Content */}
        <div className="  font-semibold    w-full h-full  flex flex-col items-center  justify-between">
          <div className="  flex-1 flex bg-red-200 w-full h-full justify-center items-center    ">
            {/* <div className=" hover:scale-110 duration-500 w-14 h-14 rounded-full overflow-hidden"> */}
              <img
                className="object-cover w-full h-full"
                src={group?.groupIcon}
                alt=""
              />
            {/* </div> */}
          </div>
          <div className="flex-1  w-full">
            <div>
              <h3 className="text-xl text-green-500 font-semibold mb-2 line-clamp-1">
                {group?.name}
              </h3>
            </div>
            <p className="font-thin text-white text-sm mb-4 line-clamp-2">
              {group?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGroupCard;
