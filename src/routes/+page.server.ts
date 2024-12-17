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
    } catch (err) {
      console.error(err);
      return fail(500, { error: 'Failed to create task' });
    }
  },
  updateTask: async ({ request }) => {
    const formData = await request.formData();
    const task: Task = {
      id: formData.get('id') as string,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      dueDate: formData.get('dueDate') as string,
      completed: false,
      createdAt: formData.get('createdAt') as string,
    };

    try {
      const response = await fetch('api/tasks', {
        method: 'PUT',
        body: JSON.stringify(task),
      });
      if (!response.ok) return fail(500, { error: 'Failed to update task' });

      const updatedTask = (await response.json()) as Task;
      return { task: updatedTask };
    } catch (err) {
      console.error(err);
      return fail(500, { error: 'Failed to update task' });
    }
  },
} satisfies Actions;
