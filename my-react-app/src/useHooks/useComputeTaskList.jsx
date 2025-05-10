import { useCallback, useState } from 'react';
import useCrudOperations from './useCrudOperations';
import { API_URLS } from '../CRUDoperations/constants';

const useComputeList = () => {
  const [tasksList, setTasksList] = useState([]);
  const [skipNumber,setSkipNumber] = useState(0);
  const limit = 5;
  const [tasksOfTheUser, , , getTasks] = useCrudOperations({
    method: "GET",
    url: API_URLS.getAllTasks,
  });

  const addTaskListComputation = useCallback((newTask) => {
    setTasksList(prev => [...prev, newTask]);
  }, []);

  const updateTaskListComputation = useCallback((updatedTask) => {
    setTasksList(prev =>
      prev.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
  }, []);

  const deleteTaskListComputation = useCallback((taskId) => {
    setTasksList(prev =>
      prev.filter(task => task.id !== taskId)
    );
  }, []);

  const usePaginatedTasks = async() => {  
    await getTasks({}, `?skip=${skipNumber}&limit=${limit}`);
    setTasksList(prev => [...prev, tasksOfTheUser]);
    setSkipNumber()
  };

  return {
    tasksList,
    addTaskListComputation,
    updateTaskListComputation,
    deleteTaskListComputation,
    usePaginatedTasks,
  };
};

export default useComputeList;
