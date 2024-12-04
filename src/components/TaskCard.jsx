import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Dropdown,
  Form,
  Input,
  message,
  Popconfirm,
} from "antd";
import { FaCalendarCheck, FaRegEdit } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { BiSolidAlarmExclamation } from "react-icons/bi";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { deleteTask, markAsComplete, updateTask } from "../../redux/slices/taskSlice";
import getTaskStatus from "../helpers/getTaskStatus";

const TaskCard = ({ id, title, description, dueDate, isCompleted }) => {
  const [isEditable, setIsEditable] = useState(!true);
  const dispatch = useDispatch();
  const status = getTaskStatus({id, isCompleted, dueDate})

  const handleOptions = ({ key }) => {
    if (key === "delete") return;
    switch (key) {
      case "edit":
        return setIsEditable(true);

      case "complete":
        dispatch(markAsComplete({ id }))
        message.success('Task Completed')


      default:
        return console.log("No such action");
    }
  };

  const handleEditTask = (values) => {
    const { title, description, newDueDate } = values;
    
    const taskDueDate = dayjs(newDueDate).toISOString();
    const isDueDateUpdated = dayjs(newDueDate).valueOf() !== dayjs(dueDate).valueOf()

    const updatedValues = {
      id,
      title,
      description,
      ...(isDueDateUpdated && {isCompleted: false}),
      dueDate: taskDueDate,
    };

    dispatch(updateTask(updatedValues))
    setIsEditable(false)
    message.success('Task Updated')
  }

  const handleDelete = (id) => {
    message.error('Task Deleted')
    dispatch(deleteTask({ id }))
  }

  const items = [
    {
      label: "Edit",
      icon: <FaRegEdit />,
      key: "edit",
    },
    {
      ...(status !== "completed" && {
        label: "Mark as completed",
        icon: <SiTicktick />,
        key: "complete",
      }),
    },
    {
      label: (
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Inter",
              colorPrimary: "#22c55e",
            },
          }}
        >
          <Popconfirm
            title="Are you sure you want to delete this item?"
            onConfirm={() => handleDelete(id)}
            onCancel={() => {
              return
            }}
            okText="Confirm"
            cancelText="Cancel"
          >
            <div>Delete</div>
          </Popconfirm>
        </ConfigProvider>
      ),
      icon: <MdDeleteOutline />,
      danger: true,
      key: "delete",
    },
  ];

  return (
    <div className=" border rounded-xl max-w-[400px] w-full xs:min-w-96 px-5 py-3 lg:p-6 bg-white ">
      <div>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Inter",
              colorPrimary: "#22c55e",
            },
          }}
        >
          <Form layout="vertical" onFinish={handleEditTask}>
            {isEditable ? (
              <Form.Item
                label="Title"
                name="title"
                initialValue={title}
                rules={[{ required: true, message: "Please input the title!" }]}
              >
                <Input placeholder="Enter note title" />
              </Form.Item>
            ) : (
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-700 font-bold text-lg tracking">
                  {title ?? "Database Customization"}
                </h3>

                <ConfigProvider
                  theme={{
                    components: {
                      Dropdown: {
                        fontFamily: "Rubik",
                      },
                    },
                  }}
                >
                  <Dropdown
                    menu={{
                      items,
                      onClick: handleOptions,
                    }}
                  >
                    <BsThreeDots className="text-gray-500 cursor-pointer" />
                  </Dropdown>
                </ConfigProvider>
              </div>
            )}

            {isEditable ? (
              <Form.Item
                label="Description"
                name="description"
                initialValue={description}
                rules={[
                  {required: true, message: "Please input the description!" },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  maxLength={400}
                  autoSize={{
                    minRows: 3,
                    maxRows: 3,
                  }}
                  showCount
                  placeholder="Enter note description"
                  rules={[
                    { required: true, message: "Please input the description!" },
                  ]}
                />
              </Form.Item>
            ) : (
              <p className="font-rubik  text-sm xs:text-[15px] text-[#8c9197] mb-3.5">
                {description ?? "This is Description"}
              </p>
            )}

            {isEditable ? (
              <Form.Item
                label="Due Date"
                name="newDueDate"
                initialValue={dayjs(dueDate)}
                rules={[{ required: true, message: "Please select a due date!" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            ) : (
              <div className="flex justify-between items-center gap-3 mt- ">
                <div className=" w-full flex gap-2.5 items-center">
                  {status === "completed" && (
                    <div className="flex justify-center items-center gap-1.5 rounded-[6px] py-0.5 px-2 bg-white border border-green-500 ">
                    <FaCalendarCheck className="text-green-500" size={16} />
                    <span className="text-[13px] font-rubik text-green-500">
                     Completed
                    </span>
                  </div>
                  )}
                  {status === "pending" && (
                    <div className="flex justify-center items-center gap-1.5 rounded-[6px] py-1 px-2 bg-[#F0F3F5] ">
                      <FaRegClock className=" text-[#78818B] " size={16} />
                      <span className="text-[13px] font-rubik font- text-[#78818B]">
                        {dueDate
                          ? dayjs(new Date(dueDate)).format("DD MMM, YYYY")
                          : "24 Dec, 2024"}
                      </span>
                    </div>
                  )}
                  {(status === "overdue" || dayjs(dueDate).is) && (
                     <div className="flex justify-center items-center gap-1.5 rounded-[6px] py-0.5 px-2 bg-white border border-red-500 ">
                     <BiSolidAlarmExclamation className="text-red-500" size={18} />
                     <span className="text-[13px] font-rubik text-red-500">
                      Overdue
                     </span>
                   </div>
                  )}
                </div>
              </div>
            )}
            {isEditable && (
              <Form.Item>
                <div className="space-x-5">
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                  <Button onClick={() => setIsEditable(false)}>Cancel</Button>
                </div>
              </Form.Item>
            )}
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default TaskCard;
