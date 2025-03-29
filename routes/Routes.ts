import { Elysia } from "elysia";

import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  toggleTodo,
  clearCompleted,
  getTodoCount,
  getCompletedCount
} from "../controllers/todoController";

export const todoRoutes = (app: Elysia) => {
  return app
    // Get all todos
    .get("/todos", async () => await getTodos())

    // Add new todo
    .post("/todos", async ({ body }) => {
      const { title, description, tag, date } = body as {
        title: string;
        description?: string;
        tag?: string;
        date?: string; // Expecting ISO string from frontend
      };

      return await addTodo(
        title,
        description,
        tag,
        date ? new Date(date) : new Date()
      );
    })

    // Update todo
    .put("/todos/:id", async ({ params, body }) => {
      const { title, description, tag, date } = body as {
        title: string;
        description?: string;
        tag?: string;
        date?: string;
      };

      return await updateTodo(
        parseInt(params.id),
        title,
        description,
        tag,
        date ? new Date(date) : new Date()
      );
    })

    // Toggle completion
    .patch("/todos/:id/toggle", async ({ params, body }) => {
      const { completed } = body as { completed: boolean };
      return await toggleTodo(parseInt(params.id), completed);
    })

    // Delete one
    .delete("/todos/:id", async ({ params }) => {
      return await deleteTodo(parseInt(params.id));
    })

    // Delete all completed
    .delete("/todos", async () => await clearCompleted())

    // Get total count
    .get("/todos/count", async () => await getTodoCount())

    // Get completed count
    .get("/todos/count/completed", async () => await getCompletedCount());
};
