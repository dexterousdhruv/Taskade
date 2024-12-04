import { Button, ConfigProvider, DatePicker, Form, Input } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../redux/slices/taskSlice";
import dayjs from "dayjs";

const TaskForm = ({ setFormOpen }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const handleAddTask = (values) => {
    const { title, description, dueDate } = values;

    const now = dayjs();
    const taskDueDate = dayjs(dueDate).toISOString();

    const status = dayjs(dueDate).isBefore(now, "day") ? "overdue" : "pending";

    const newTask = {
      id: tasks?.length + 1,
      title,
      description,
      dueDate: taskDueDate,
      status,
    };

    dispatch(addTask(newTask));
    setFormOpen(false);
  };
  return (
    <div className="min-w-96 max-w-[400px] border p-5 rounded-xl max-h-[450px]">
      <h3 className="mb-4 text-lg text-gray-800 tracking-wide font-medium">
        New Task
      </h3>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Inter",
            colorPrimary: "#22c55e",
          },
        }}
      >
        <Form layout="vertical" onFinish={handleAddTask}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input placeholder="Enter note title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea
              rows={4}
              maxLength={400}
              autoSize={{
                minRows: 4,
                maxRows: 4,
              }}
              showCount
              placeholder="Enter note description"
            />
          </Form.Item>

          <Form.Item
            label="Due Date"
            name="dueDate"
            rules={[{ required: true, message: "Please select a due date!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Note
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default TaskForm;
