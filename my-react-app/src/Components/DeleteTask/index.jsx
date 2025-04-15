import useCrudOperations from '../../useHooks/useCrudOperations';
import { API_URLS } from '../../CRUDoperations/constants';
import { useCallback } from 'react';

const DeleteTask = (taskId) => {
    const [, , , deleteTask] = useCrudOperations({
        method: 'DELETE',
        url: API_URLS.getAllTasks,
      });

    const deleteTaskHandler = useCallback(()=>{
        deleteTask({},`id=${taskId}`)
    },[taskId]);

  return (
    <div onClick={deleteTaskHandler}>DeleteTask</div>
  )
}

export default DeleteTask