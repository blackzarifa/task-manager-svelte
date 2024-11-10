import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { Task } from '$lib/types/task';

export const actions = {
	createTask: async ({ request }) => {
		const formData = await request.formData();

		try {
			console.log(formData);
			const title = formData.get('title');
			if (!title) return fail(400, { error: 'Title is required' });

			return {
				success: true,
				task: Object.fromEntries(formData),
			};
		} catch (error) {
			return fail(500, {
				error: 'Failed to create task',
			});
		}
	},
} satisfies Actions;
