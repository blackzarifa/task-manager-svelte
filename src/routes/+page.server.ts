import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { Task } from '$lib/types/task';

export const actions = {
	createTask: async ({ request, fetch }) => {
		const formData = await request.formData();
		const task: Task = {
			title: formData.get('title') as string,
			description: formData.get('description') as string,
			dueDate: formData.get('dueDate') as string,
			completed: formData.get('completed') === 'true',
			createdAt: formData.get('createdAt') as string,
		};

		try {
			const response = await fetch('api/tasks', {
				method: 'POST',
				body: JSON.stringify(task),
			});
			if (!response.ok) return fail(500, { error: 'Failed to create task' });

			const createdTask = await response.json();
			return { task: createdTask };
		} catch (error) {
			console.error(error);
			return fail(500, {
				error: 'Failed to create task',
			});
		}
	},
} satisfies Actions;
