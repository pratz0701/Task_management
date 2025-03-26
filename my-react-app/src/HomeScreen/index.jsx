/* eslint-disable no-unused-vars */
 
import { useEffect } from "react";
import { API_URLS } from "../CRUDoperations/constants"
import useCrudOperations from "../useHooks/useCrudOperations"
import TaskPage from "../Pages/TaskPage";
import Login from '../Pages/AuthenticationPage';

const HomeScreen = () => { 
  const [currentUser, currentUserFetchLoading, currentUserFetchError, getCurrentUser] = useCrudOperations({
      method: 'GET',
      url: API_URLS.currentUser,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      getCurrentUser({});
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  console.log("homesceewn")
  
  return (
    <div>
  {currentUser!==null ?<TaskPage/>:<Login />}
</div>

  )
}

export default HomeScreen;