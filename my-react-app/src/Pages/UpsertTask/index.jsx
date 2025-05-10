import { useState } from "react";
import useTaskActions from "../../useHooks/useTaskActionHandler";

const UpsertTask = (taskDetails) => {
  const {
    id: taskId = '',
    title : taskTitle = '',
    description : taskDescription=''
  } = taskDetails || {};

  const [title, setTitle] = useState(taskTitle);
  const [description, setDescription] = useState(taskDescription);

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    setDescription(value);
  };

  const { addTaskHandler, editTaskHandler } = useTaskActions();

  const addOrUpdateTask = async (e) => {
    e.preventDefault();
    if (taskId) {
      await editTaskHandler({ taskId, title, description });
      

    } else {
      await addTaskHandler({ title, description });
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <form onSubmit={addOrUpdateTask}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="mt-2 p-2 border rounded w-full"
            placeholder="Enter task title"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className="mt-2 p-2 border rounded w-full"
            placeholder="Enter task description"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {taskId ? 'Edit Task' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default UpsertTask;
