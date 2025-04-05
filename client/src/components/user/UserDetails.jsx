import toast from "react-hot-toast";
import { logout } from "../../apis/authApis";
import avatar from "/src/assets/campus_secret.jpg";

const UserDetails = ({ user }) => {
    const handleLogout = async () => {
        await logout();
        toast.success("logout success!");
        window.location.replace("/login");
    };

    return (
        <div className="bg-slate-100  rounded-lg h-full shadow-lg p-6  flex flex-col justify-center items-center">
            <img src={avatar} alt="User Avatar" className="w-24 h-24 rounded-full mb-4 object-cover" loading="lazy" />
            <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
            <p className=" text-sm text-gray-500">@{user?.username}</p>
            <p className="text-gray-600">
                <span>StudentID : </span>
                {user?.studentId}
            </p>

            <button
                onClick={handleLogout}
                className="mt-6 ring-2  text-black rounded-full px-4 py-2  hover:scale-105 cursor-pointer duration-300 transition"
            >
                Log Out
            </button>
        </div>
    );
};

export default UserDetails;
