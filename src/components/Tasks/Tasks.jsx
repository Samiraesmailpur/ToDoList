import { useSelector, useDispatch } from "react-redux";
import { selectTasks } from "../../redux/selectors";
import { deleteTask, updateTask } from "../../redux/tasksSlise";
import { useState } from "react";
import TaskModal from "../TaskModal/TaskModal";
import { Button, ListGroup, Form, Stack, Dropdown } from "react-bootstrap";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selectedTask, setSelectedTask] = useState(null);
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  const filteredTasks =
    filter === "All"
      ? tasks
      : filter === "Completed"
      ? tasks.filter((item) => item.status === true)
      : tasks.filter((item) => item.status === false);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setShowModal(false);
  };

  const toggleTaskStatus = (task) => {
    dispatch(
      updateTask({
        id: task.id,
        newName: task.name,
        newDescription: task.description,
        newStatus: !task.status,
      })
    );
  };

  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <Button
          variant="outline-primary"
          type="button"
          className="mb-2 mt-2 p-2"
          onClick={() => setShowModal(true)}
        >
          Add task
        </Button>
        <Dropdown className="dropdown ms-auto">
          <Dropdown.Toggle variant="outline-info" id="filter-dropdown">
            Filter: {filter}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              active={filter === "All"}
              onClick={() => setFilter("All")}
            >
              All
            </Dropdown.Item>
            <Dropdown.Item
              active={filter === "Completed"}
              onClick={() => setFilter("Completed")}
            >
              Completed
            </Dropdown.Item>
            <Dropdown.Item
              active={filter === "Uncompleted"}
              onClick={() => setFilter("Uncompleted")}
            >
              Uncompleted
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className="box-btn ms-auto">
          <Button
            variant={filter === "All" ? "info" : "outline-info"}
            type="button"
            className="mb-2 mt-2 ms-2 ms-auto"
            onClick={() => setFilter("All")}
          >
            All
          </Button>
          <Button
            variant={filter === "Completed" ? "success" : "outline-success"}
            type="button"
            className="mb-2 mt-2 ms-2 "
            onClick={() => setFilter("Completed")}
          >
            Completed
          </Button>
          <Button
            variant={filter === "Uncompleted" ? "warning" : "outline-warning"}
            type="button"
            className="mb-2 mt-2 ms-2 "
            onClick={() => setFilter("Uncompleted")}
          >
            Uncompleted
          </Button>
        </div>
      </Stack>
      {filteredTasks.length === 0 ? (
        <div className="title">
          You don't have any tasks right now. You can relax.
        </div>
      ) : (
        <ListGroup as="ul">
          {filteredTasks.map(({ id, name, description, status }) => (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start gap-2"
              key={id}
            >
              <Form.Check
                aria-label="option 1"
                checked={status}
                onChange={() =>
                  toggleTaskStatus({ id, name, description, status })
                }
              />
              <div className="ms-2 me-auto">
                <div className="fw-bold">{name}</div>
                Description: {description}
              </div>
              <p>{status}</p>
              <Button
                variant="outline-secondary"
                type="button"
                className="me-2"
                onClick={() =>
                  handleTaskClick({ id, name, description, status })
                }
              >
                edit
              </Button>
              <Button
                variant="outline-danger"
                type="button"
                onClick={() => dispatch(deleteTask(id))}
              >
                delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <TaskModal
        task={selectedTask}
        show={showModal}
        onHide={handleCloseModal}
      />
    </>
  );
};

export default Tasks;
