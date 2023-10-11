import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormB from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../../redux/tasksSlise";

const Schema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string(),
  status: Yup.boolean(),
});

const TaskForm = ({ task, hideModal }) => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: task?.name || "",
        description: task?.description || "",
        status: task?.status || false,
      }}
      validationSchema={Schema}
      onSubmit={(values, { resetForm }) => {
        if (task) {
          dispatch(
            updateTask({
              id: task.id,
              newName: values.name,
              newDescription: values.description,
              newStatus: values.status,
            })
          );
          hideModal();
          resetForm();
        } else {
          dispatch(addTask(values.name, values.description, values.status));
          hideModal();
          resetForm();
        }
      }}
    >
      {({ errors, touched }) => (
        <Form as={FormB}>
          <FormB.Group controlId="name" className="mb-2">
            <FormB.Label>Name</FormB.Label>
            <Field
              name="name"
              as={FormB.Control}
              type="text"
              placeholder="Enter name"
            />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
          </FormB.Group>

          <FormB.Group controlId="description" className="mb-2">
            <FormB.Label>Description</FormB.Label>
            <Field
              name="description"
              as={FormB.Control}
              type="text"
              placeholder="Enter description"
            />
            {errors.description && touched.description ? (
              <div>{errors.description}</div>
            ) : null}
          </FormB.Group>
          <FormB.Group controlId="status" className="d-flex gap-2">
            <FormB.Label>Status</FormB.Label>
            <Field
              name="status"
              as={FormB.Check}
              aria-label="option 1"
              type="checkbox"
            />
            {errors.status && touched.status ? (
              <div>{errors.status}</div>
            ) : null}
          </FormB.Group>
          <Button className="mt-2" variant="primary" type="submit">
            {task ? "Edit" : "Add"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
