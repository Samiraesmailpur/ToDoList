import { useSelector, useDispatch } from "react-redux";
import { selectTasks } from "../../redux/selectors";
import { deleteTask } from "../../redux/tasksSlise";
import { useState } from "react";
import Modal from "../Modal/Modal";

const Tasks = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  const handleAddClick = () => {
    setIsClicked(true);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsClicked(true);
  };

  return (
    <ul>
      <button type="button" onClick={handleAddClick}>
        add task
      </button>
      {tasks.map(({ id, name, description, status }) => (
        <li key={id}>
          <p>{name}</p>
          <p>{description}</p>
          <p>{status}</p>
          <button
            type="button"
            onClick={() => handleTaskClick({ id, name, description, status })}
          >
            edit
          </button>
          <button type="button" onClick={() => dispatch(deleteTask(id))}>
            remove task
          </button>
        </li>
      ))}
      {isClicked && <Modal task={selectedTask} />}
    </ul>
  );
};

export default Tasks;
