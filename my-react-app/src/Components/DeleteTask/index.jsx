import { useCallback } from "react";
import useTaskActions from "../../useHooks/useTaskActionHandler";

const DeleteTask = ( taskId, setTasksList, setSkipCount ) => {
    const { deleteTaskById } = useTaskActions();

    const deleteTaskHandler = useCallback(()=>{
        deleteTaskById(taskId,setTasksList,setSkipCount)
    },[taskId]);

    return (
      <div onClick={deleteTaskHandler}>
        Delete Task
      </div>
  );
};

export default DeleteTask;
