import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { UiRoutes } from "../../Constants/constants";

const AddTask = () => {
    const navigate = useNavigate();
    const createTask = useCallback(()=>{
        navigate(UiRoutes.UpsertTask);
    },[]);

  return (
    <div 
      onClick={createTask}
    >
        Add Task
    </div>
  )
}

export default AddTask