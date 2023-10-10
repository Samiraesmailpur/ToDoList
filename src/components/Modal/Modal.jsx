import TaskForm from "../TaskForm/TaskForm";

const Modal = ({ task }) => {
  return (
    <div>
      <div>
        <TaskForm task={task} />
      </div>
    </div>
  );
};

export default Modal;
