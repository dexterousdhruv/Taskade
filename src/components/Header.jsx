import React, { useState } from "react";
import { ConfigProvider, Input, Popover } from "antd";
import useMediaQuery from "../hooks/useMediaQuery";
import Logo from "../assets/Logo";
import { FaPlus } from "react-icons/fa6";
import TaskForm from "./TaskForm";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../redux/slices/searchSlice";

const Header = ({ toggleSidebar }) => {
  const [formOpen, setFormOpen] = useState(false);
  const dispatch = useDispatch();
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");
  const { Search } = Input;

  const onSearch = (value) => {
    dispatch(setSearchTerm(value));
  };

  return (
    <div className="z-[10] px-5 py-2.5 xs:py-4 md:py-5 md:px-7 lg:px-10 border-b">
      <div className="flex items-center justify-between gap-3.5 md:gap-6">
        {isAboveMediumScreens ? (
          <h1 className="text-xl md:text-3xl text-gray-900 font-bold">Tasks</h1>
        ) : (
          <button onClick={toggleSidebar}>
            <Logo />
          </button>
        )}

        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#22c55e",
            },
          }}
        >
          <Search
            placeholder="Search task with title"
            allowClear
            onClear={() => dispatch(setSearchTerm(''))}
            onSearch={onSearch}
            size={`${isAboveMediumScreens ? "large" : "medium"}`}
            className="flex-1 max-w-screen-sm"
            enterButton
          />
        </ConfigProvider>

        <div className="flex justify-center items-center gap-2 md:gap-4">
          <Popover
            content={
              <>
                <TaskForm setFormOpen={setFormOpen} />
              </>
            }
            trigger="click"
            open={formOpen}
            onOpenChange={(newOpen) => setFormOpen(newOpen)}
          >
            <button className="flex items-center justify-center gap-4 p-1 text-sm xs:px-3 sm:py-1.5 rounded-full xs:rounded-xl font-medium text-green-400 border-2 border-green-400 hover:text-white hover:bg-green-500">
              <FaPlus />
              <span className="hidden xs:block">Add task</span>
            </button>
          </Popover>

          <div className="rounded-full border overflow-hidden w-10 ml-1">
            <img src="/user-avatar.webp" alt="User" className="w-14" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
