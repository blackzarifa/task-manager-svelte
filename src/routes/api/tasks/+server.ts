import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Task } from '$lib/types/task';

export const GET: RequestHandler = async () => {
  try {
    // In future: const tasks = await db.tasks.findMany()
    return json({ tasks: [] });
  } catch (error) {
    console.error(error);
    return json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const task: Task = await request.json();
    // In future: DB operations
    return json(task);
  } catch (error) {
    console.error(error);
    return json({ error: 'Failed to create task' }, { status: 500 });
  }
};

export const PUT: RequestHandler = async ({ request }) => {
  try {
    const task: Task = await request.json();
    // DB operations
    return json(task);
  } catch (error) {
    console.error(error);
    return json({ error: 'Failed to update task' }, { status: 500 });
  }
};
