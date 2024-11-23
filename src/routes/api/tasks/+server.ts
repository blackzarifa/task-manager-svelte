import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Task } from '$lib/types/task';

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();

	try {
		const title = formData.get('title');
		if (!title) {
			return new Response(JSON.stringify({ error: 'Title is required' }), {
				status: 400,
			});
		}

		const task: Task = {
			id: crypto.randomUUID(),
			title: title as string,
			description: formData.get('description') as string,
			dueDate: formData.get('dueDate') as string,
			completed: false,
			createdAt: new Date().toISOString(),
		};

		// In future: await db.tasks.create(task)
		return json({ task });
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to create task' }), {
			status: 500,
		});
	}
};

// GET endpoint for future use
export const GET: RequestHandler = async () => {
	try {
		// In future: const tasks = await db.tasks.findMany()
		return json({ tasks: [] });
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to fetch tasks' }), {
			status: 500,
		});
	}
};
