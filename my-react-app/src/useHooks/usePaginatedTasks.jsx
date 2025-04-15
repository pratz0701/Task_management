import { useEffect } from "react";
import useCrudOperations from "../useHooks/useCrudOperations"; // adjust path if needed
import { API_URLS } from "../CRUDoperations/constants";

const usePaginatedTasks = ({skip = 0, limit = 5}) => {
  const [tasksOfTheUser, , , getTasks] = useCrudOperations({
    method: "CREATE",
    url: API_URLS.getAllTasks,
  });

  useEffect(() => {
    const fetchTasks = async () => {
      await getTasks({}, `?skip=${skip}&limit=${limit}`);
    };

    fetchTasks();
  }, [skip, limit]);

  return  tasksOfTheUser || {};
};

export default usePaginatedTasks;
