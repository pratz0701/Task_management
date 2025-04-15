import { useEffect } from "react";
import { API_URLS } from "../CRUDoperations/constants"
import useCrudOperations from "../useHooks/useCrudOperations"
import Login from '../Pages/AuthenticationPage';
import TasksListPage from "../Pages/TasksListPage/TasksListPage";

const HomeScreen = () => { 
  const [currentUser, , , getCurrentUser] = useCrudOperations({
      method: 'GET',
      url: API_URLS.currentUser,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      getCurrentUser({});
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
  {currentUser!==null ?<TasksListPage/>:<Login />}
</div>

  )
}

export default HomeScreen;