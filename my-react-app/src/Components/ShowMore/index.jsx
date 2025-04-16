/* eslint-disable react/prop-types */
const ShowMore = ({getTasksList,total,taskCount}) => {
  if(total===taskCount)return;
  return (
    <button
    onClick={getTasksList}
    >
    ShowMore
    </button>
  )
}

export default ShowMore