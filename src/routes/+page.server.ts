import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { Task } from '$lib/types/task';

export const actions = {
  createTask: async ({ request, fetch }) => {
    const formData = await request.formData();
    const task: Task = {
      id: crypto.randomUUID(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      dueDate: formData.get('dueDate') as string,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('api/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
      });
      if (!response.ok) return fail(500, { error: 'Failed to create task' });

      const createdTask = (await response.json()) as Task;
      return { task: createdTask };
    } catch (error) {
      console.error(error);
      return fail(500, { error: 'Failed to create task' });
    }
  },
  updateTask: async ({ request, fetch, url }) => {
    const id = url.searchParams.get('id');
    if (!id) return fail(400, { error: 'No task ID provided' });

    const formData = await request.formData();

    const tasks = JSON.parse(localStorage.getItem('tasks') ?? '[]');
    const existingTask = tasks.find((t: Task) => t.id === id);

    if (!existingTask) return fail(404, { error: 'Task not found' });

    const updatedTask: Task = {
      ...existingTask,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      dueDate: formData.get('dueDate') as string,
    };

    try {
      const response = await fetch('api/tasks', {
        method: 'PUT',
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) return fail(500, { error: 'Failed to update task' });

      const returnedTask = (await response.json()) as Task;
      return { task: returnedTask };
    } catch (error) {
      console.error(error);
      return fail(500, { error: 'Failed to update task' });
    }
  },
} satisfies Actions;
