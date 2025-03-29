import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all todos (ordered by newest first)
export const getTodos = async () => {
  return await prisma.todo.findMany({
    orderBy: { id: "desc" },
  });
};

// Add a new todo
export const addTodo = async (
  title: string,
  description?: string,
  tag?: string,
  date?: Date
) => {
  return await prisma.todo.create({
    data: {
      title,
      description,
      tag,
      date: date ?? new Date(), // default to today if not provided
    },
  });
};

// Delete a todo
export const deleteTodo = async (id: number) => {
  try {
    await prisma.todo.delete({ where: { id } });
    return { success: true };
  } catch {
    return { error: "Not found" };
  }
};

// Update a todo
export const updateTodo = async (
  id: number,
  title: string,
  description?: string,
  tag?: string,
  date?: Date
) => {
  try {
    await prisma.todo.update({
      where: { id },
      data: {
        title,
        description,
        tag,
        date,
      },
    });
    return { success: true };
  } catch {
    return { error: "Not found" };
  }
};

// Toggle completion status
export const toggleTodo = async (id: number, completed: boolean) => {
  try {
    await prisma.todo.update({
      where: { id },
      data: { completed },
    });
    return { success: true };
  } catch {
    return { error: "Not found" };
  }
};

// Clear all completed todos
export const clearCompleted = async () => {
  try {
    await prisma.todo.deleteMany({ where: { completed: true } });
    return { success: true };
  } catch {
    return { error: "Not found" };
  }
};

// Get total todo count
export const getTodoCount = async () => {
  return await prisma.todo.count();
};

// Get completed todo count
export const getCompletedCount = async () => {
  return await prisma.todo.count({
    where: { completed: true },
  });
};
