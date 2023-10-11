import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: 1,
      name: "Learn JS",
      description:
        "Study the fundamentals of JavaScript, including variables, data types, and control structures",
      status: true,
    },
    {
      id: 2,
      name: "Learn React",
      description:
        "Explore the React library for building user interfaces and dynamic web applications",
      status: true,
    },
    {
      id: 3,
      name: "Learn MongoDB",
      description:
        "Dive into MongoDB, a NoSQL database, and learn about document-based data storage",
      status: true,
    },
    {
      id: 4,
      name: "Learn PHP",
      description:
        "Discover PHP, a server-side scripting language commonly used for web development",
      status: false,
    },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(name, description, status) {
        return {
          payload: {
            name,
            description,
            status,
            id: nanoid(),
          },
        };
      },
    },
    updateTask: (state, action) => {
      const { id, newName, newDescription, newStatus } = action.payload;
      state.items = state.items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name: newName,
            description: newDescription,
            status: newStatus,
          };
        }
        return item;
      });
    },

    deleteTask: (state, action) => {
      const taskIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (taskIndex !== -1) {
        state.items.splice(taskIndex, 1);
      }
    },
  },
});

export const { addTask, deleteTask, updateTask } = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
