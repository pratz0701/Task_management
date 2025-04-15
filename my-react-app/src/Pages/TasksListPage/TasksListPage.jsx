import { useEffect, useState } from 'react';
import NoTasks from '../../Components/NoTasks';
import AddTask from '../../Components/AddTask';
import EditTask from '../../Components/EditTask';
import DeleteTask from '../../Components/DeleteTask';
import ShowMore from '../../Components/ShowMore';
import usePaginatedTasks from '../../useHooks/usePaginatedTasks';

const TasksListPage = () => {
  const [skipCount, setSkipCount] = useState(0);
  const [tasksList, setTasksList] = useState([]);
  
  const { products = [], total = 0 } = usePaginatedTasks({ skip: skipCount });

  useEffect(() => {
    setTasksList(prev => [...prev, ...products]);
  }, [products]);

  const handleShowMore = () => {
    setSkipCount(prev => prev + 5);
  };

  if (!tasksList.length) return <NoTasks />;

  return (
    <>
      <div>
        {tasksList.map((task, index) => {
          const { title, description } = task;
          return (
            <div key={index} className="p-2 border-b">
              <div className="font-bold">{title}</div>
              <div className="text-sm text-gray-600">{description}</div>
              <EditTask />
              <DeleteTask 
                setTasksList={setTasksList}
                setSkipCount={setSkipCount}
              />
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
