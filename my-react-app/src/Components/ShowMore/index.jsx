/* eslint-disable react/prop-types */
const ShowMore = ({getTasksList,total,taskCount}) => {
  if(total===taskCount)return;
  return (
    <div
    onClick={getTasksList}
    >
    ShowMore
    </div>
  )
}

export default ShowMore