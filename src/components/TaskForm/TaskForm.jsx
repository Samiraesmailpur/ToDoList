import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../../redux/tasksSlise";

const Schema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string(),
  status: Yup.boolean(),
});

const TaskForm = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: task?.name || "",
        description: task?.description || "",
        status: task?.status || false,
      }}
      validationSchema={Schema}
      onSubmit={(values) => {
        if (task) {
          dispatch(
            updateTask({
              id: task.id,
              newName: values.name,
              newDescription: values.description,
              newStatus: values.status,
            })
          );
        } else {
          dispatch(addTask(values.name, values.description, values.status));
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="name" />
          {errors.name && touched.name ? (
            <div>{errors.name.message}</div>
          ) : null}
          <Field name="description" />
          {errors.description && touched.description ? (
            <div>{errors.description.message}</div>
          ) : null}
          <button type="submit">Add</button>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
