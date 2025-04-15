// useTaskActions.js
import useCrudOperations from '../../useHooks/useCrudOperations';
import { API_URLS } from '../../CRUDoperations/constants';

const useTaskActions = () => {
  const [, , , addTask] = useCrudOperations({
    method: 'POST',
    url: API_URLS.addTask,
  });

  const [, , , updateTask] = useCrudOperations({
    method: 'POST',
    url: API_URLS.updateTask,
  });

   const [, , , deleteTask] = useCrudOperations({
      method: 'DELETE',
      url: API_URLS.getAllTasks,
    });

  const addTaskHandler = async ({ title, description }) => {
    const requestData = { title, description };
    try {
      await addTask({ requestData });
    } catch (err) {
      console.error('Failed to add task:', err);
      throw err;
    }
  };

  const editTaskHandler = async ({ taskId, title, description }) => {
    const requestData = { title, description };
    try {
      await updateTask({ requestData: { requestData } }, `id=${taskId}`);
    } catch (err) {
      console.error('Failed to update task:', err);
      throw err;
    }
  };

    const deleteTaskById = async ({taskId,setTasksList,setSkipCount}) => {
        try {
          await deleteTask({}, `id=${taskId}`);
          setTasksList((prev) => prev.filter((task) => task.taskId !== taskId));
          setSkipCount((prev) => prev - 1);
        } catch (err) {
          console.error('Failed to delete task:', err);
        }
      }

  return { addTaskHandler, editTaskHandler,deleteTaskById };
};

export default useTaskActions;
