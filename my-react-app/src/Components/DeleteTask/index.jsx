import { useCallback } from "react";
import useTaskActions from "../../useHooks/useTaskActionHandler";

const DeleteTask = ( taskId ) => {
    const { deleteTaskById } = useTaskActions();

    const deleteTaskHandler = useCallback(()=>{
        deleteTaskById(taskId);
    },[taskId]);

    return (
      <button onClick={deleteTaskHandler}>
        Delete Task
      </button>
  );
};

export default DeleteTask;
