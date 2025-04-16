import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { UiRoutes } from "../../Constants/constants";

const EditTask = () => {
    const navigate = useNavigate();
    const editTask = useCallback(()=>{
        navigate(UiRoutes.UpsertTask);
    },[]);

  return (
    <button 
      onClick={editTask}
    >
        edit Task
    </button>
  )
}

export default EditTask;