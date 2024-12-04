import React from "react";
import { ConfigProvider, Tabs } from "antd";
import TaskList from "./TaskList";
import useMediaQuery from "../hooks/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/slices/categorySlice";

const items = [
  {
    key: "all",
    label: "All",
    children: <TaskList />,
  },
  {
    key: "pending",
    label: "Pending",
    children: <TaskList category="pending" />,
  },
  {
    key: "completed",
    label: "Completed",
    children: <TaskList category="completed" />,
  },
  {
    key: "overdue",
    label: "Overdue",
    children: <TaskList category="overdue" />,
  },
];

const TaskSection = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.category.category);
  const isAboveSmallScreens = useMediaQuery("(min-width: 425px)");

  return (
    <div className="max-w-screen-2xl px-3 py-5 xs:px-5 sm:px-7 ">
      <div>
        {/* TASKLIST */}

        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                fontFamily: "Inter",
                fontSize: `${isAboveSmallScreens ? "17px" : "15px"}`,
                horizontalItemGutter: isAboveSmallScreens ? 32 : 20,
                itemHoverColor: "#4ade80",
                itemActiveColor: "#4ade80",
                itemSelectedColor: "#22c55e",
                inkBarColor: "#22c55e",
              },
            },
          }}
        >
          <Tabs
            defaultActiveKey={selectedCategory}
            items={items}
            onChange={(key) => {
              dispatch(setCategory(key));
            }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default TaskSection;
