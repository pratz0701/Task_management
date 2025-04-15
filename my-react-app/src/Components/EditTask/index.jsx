import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { UiRoutes } from "../../Constants/constants";

const EditTask = () => {
    const navigate = useNavigate();
    const editTask = useCallback(()=>{
        navigate(UiRoutes.UpsertTask);
    },[]);

  return (
    <div 
      onClick={editTask}
    >
        edit Task
    </div>
  )
}

export default EditTask;