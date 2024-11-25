import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Task } from '$lib/types/task';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const task: Task = await request.json();
		// In future: DB operations
		return json(task);
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: 'Failed to create task' }), {
			status: 500,
		});
	}
};

export const GET: RequestHandler = async () => {
	try {
		// In future: const tasks = await db.tasks.findMany()
		return json({ tasks: [] });
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: 'Failed to fetch tasks' }), {
			status: 500,
		});
	}
};
