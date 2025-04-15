import { useState } from "react";
import useCrudOperations from "../../useHooks/useCrudOperations";
import { API_URLS } from "../../CRUDoperations/constants";
import { getSanitizedInput } from "../../Utils/utils";

const UpsertTask = (taskDetails) => {
  const {
    id: taskId = '',
    title : taskTitle = '',
    description : taskDescription=''
  } = taskDetails || {};

  const [title, setTitle] = useState(taskTitle);
  const [description, setDescription] = useState(taskDescription);

  const [, , , addTask] = useCrudOperations({
    method: 'POST',
    url: API_URLS.addTask,
  });

  const [, , , updateTask] = useCrudOperations({
    method: 'POST',
    url: API_URLS.updateTask,
  });

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setTitle(getSanitizedInput(value));
  };

  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    setDescription(getSanitizedInput(value));
  };

  const addOrUpdateTask = (e) => {
    e.preventDefault();

    const requestData = { title, description };

    if (taskId) {
      updateTask({requestData: {requestData}},`id=${taskId}`);
    } else {
      addTask({
        requestData,
      });
    }

    // On success, trigger any success handling logic (e.g., showing a toast or redirect)
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
          {taskId ? 'Update Task' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default UpsertTask;
