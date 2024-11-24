import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { Task } from '$lib/types/task';

export const actions = {
	createTask: async ({ request, fetch }) => {
		const formData = await request.formData();
		console.log(formData);
		const task = JSON.parse(formData.get('task') as string) as Task;
		console.log(task);

		try {
			if (!task.title) return fail(400, { error: 'Title is required' });

			const response = await fetch('api/tasks', {
				method: 'POST',
				body: JSON.stringify(task),
			});
			if (!response.ok) return fail(500, { error: 'Failed to create task' });

			const { data } = await response.json();
			return { success: true, data };
		} catch (error) {
			return fail(500, {
				error: 'Failed to create task',
			});
		}
	},
} satisfies Actions;
