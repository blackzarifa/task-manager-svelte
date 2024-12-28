import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params }) => {
  try {
    const taskId = params;
    console.log(taskId);
    // DB operations
    return json({ success: true });
  } catch (error) {
    console.error(error);
    return json({ error: 'Failed to delete task' }, { status: 500 });
  }
};
