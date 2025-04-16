import NoTasks from '../../Components/NoTasks';
import AddTask from '../../Components/AddTask';
import EditTask from '../../Components/EditTask';
import DeleteTask from '../../Components/DeleteTask';
import ShowMore from '../../Components/ShowMore';
import useComputeList from '../../useHooks/useComputeTaskList';

const TasksListPage = () => {
  const {tasksList, usePaginatedTasks} = useComputeList();

  const handleShowMore = () => {
    usePaginatedTasks;
  };

  return (
    <>
    {!tasksList.length && <NoTasks/>}
      <div>
        {tasksList.slice().reverse().map((task, index) => {
          const { title, description } = task;
          return (
            <div key={index} className="p-2 border-b">
              <div className="font-bold">{title}</div>
              <div className="text-sm text-gray-600">{description}</div>
              <EditTask />
              <DeleteTask/>
            </div>
          );
        })}
      </div>
        <ShowMore 
        getTasksList={handleShowMore} 
        total={total}
        taskCount={tasksList.length}
        />
      <AddTask />
    </>
  );
};

export default TasksListPage;
