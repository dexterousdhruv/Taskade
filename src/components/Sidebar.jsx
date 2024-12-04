import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { MdMailOutline, MdOutlineEventNote } from "react-icons/md";
import { PiGearSixBold } from "react-icons/pi";
import { Link } from "react-router";
import { FaUsers } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarTab } from "../../redux/slices/sidebarTabSlice";

const sideNavLinks = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: HiOutlineSquares2X2,
  },
  {
    name: "Tasks",
    path: "tasks",
    icon: MdOutlineEventNote,
  },
  {
    name: "Teams",
    path: "teams",
    icon: FaUsers,
  },
  {
    name: "Mails",
    path: "mails",
    icon: MdMailOutline,
  },
  {
    name: "Settings",
    path: "settings",
    icon: PiGearSixBold,
  },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch()
  const tab = useSelector(state => state.sidebar.tab)
  const [activeTab, setActiveTab] = useState(tab)

  const handleTabClick = (tab) => {
    dispatch(setSidebarTab(tab));
  };

  useEffect(() => {
    setActiveTab(tab)
  }, [tab])

  return (
    <div
      className={`
      ${isOpen ? "translate-x-0" : "-translate-x-full"} 
      fixed md:static z-20 h-full w-64 max-w-xs transform transition-transform duration-300 ease-in-out md:translate-x-0 border-l border bg-white `}
    >
      {/* TITLE */}
      <div className="flex items-center justify-center gap-5">
        <div className="flex items-center justify-center gap-5 py-6">
          <Logo />
          <h1 className="text-2xl pt-0.5 font-bold text-gray-800">Taskade.</h1>
        </div>
        <button
          onClick={toggleSidebar}
          className="text-[12px] hover:bg-gray-100 rounded-md aspect-square h-10 flex items-center justify-center md:hidden "
        >
          <FaAngleLeft className="text-green-500 text-2xl my-3 " />
        </button>
      </div>

      <ul className="mt-2 flex flex-col gap-2 items-center  ">
        {sideNavLinks.map(({ name, path, icon: Icon }, idx) => {
          return (
            <li
              key={idx}
              className={`${
                activeTab === name
                  ? "rounded-md bg-green-500"
                  : "hover:bg-gray-100"
              } w-full group  `}
              onClick={() => handleTabClick(name)}
            >
              <Link to={path}>
                <div className="flex items-center gap-3.5 pl-14 py-2">
                  <Icon
                    className={`${
                      activeTab === name
                        ? "rounded-md text-white "
                        : "text-gray-500 group-hover:text-gray-700"
                    }  `}
                    size={26}
                  />
                  <span
                    className={`${
                      activeTab === name
                        ? "rounded-md text-white "
                        : "text-gray-500 group-hover:text-gray-700 "
                    }  text-lg font-rubik  leading-6`}
                  >
                    {name}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="border-t h-fit border-b flex items-center justify-center md:hidden "></div>
    </div>
  );
};

export default Sidebar;
