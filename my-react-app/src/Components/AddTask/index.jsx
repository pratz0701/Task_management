import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { UiRoutes } from "../../Constants/constants";

const AddTask = () => {
    const navigate = useNavigate();
    const createTask = useCallback(()=>{
        navigate(UiRoutes.UpsertTask);
    },[]);

  return (
    <button 
      onClick={createTask}
    >
        Add Task
    </button>
  )
}

export default AddTask