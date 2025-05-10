// useTaskActions.js
import useCrudOperations from './useCrudOperations';
import { API_URLS } from '../CRUDoperations/constants';
import { UiRoutes } from '../Constants/constants';
import { useNavigate } from 'react-router-dom';
import {useComputeList } from '../useHooks/useComputeTaskList';

const useTaskActions = () => {
  const [addedTaskInfo, , , addTask] = useCrudOperations({
    method: 'POST',
    url: API_URLS.addTask,
  });

  const [updatedTaskInfo, , , updateTask] = useCrudOperations({
    method: 'POST',
    url: API_URLS.updateTask,
  });

   const [, , , deleteTask] = useCrudOperations({
      method: 'DELETE',
      url: API_URLS.getAllTasks,
    });

    const {addTaskListComputation , updateTaskListComputation,deleteTaskListComputation} = useComputeList();

  const NavigateToHomescreen = ()=> {
    const Navigate = useNavigate();
    Navigate(UiRoutes.homeScreen);
  }

  const addTaskHandler = async ({ title, description}) => {
    const requestData = { title, description };
    try {
      await addTask({ requestData });
      addTaskListComputation(addedTaskInfo);
      NavigateToHomescreen();
    } catch (err) {
      console.error('Failed to add task:', err);
      throw err;
    }
  };

  const editTaskHandler = async ({ taskId, title, description }) => {
    const requestData = { title, description };
    try {
      await updateTask({ requestData: { requestData } }, `id=${taskId}`);
      updateTaskListComputation(updatedTaskInfo);
      NavigateToHomescreen();
    } catch (err) {
      console.error('Failed to update task:', err);
      throw err;
    }
  };

    const deleteTaskById = async ({taskId}) => {
        try {
          await deleteTask({}, `id=${taskId}`);
          deleteTaskListComputation();
          NavigateToHomescreen();
        } catch (err) {
          console.error('Failed to delete task:', err);
        }
      }

  return { addTaskHandler, editTaskHandler,deleteTaskById };
};

export default useTaskActions;
