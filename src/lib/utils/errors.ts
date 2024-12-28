import type { ActionResult } from '@sveltejs/kit';

export function parseErrorObject(data: string) {
  const parsed = JSON.parse(data);
  return parsed[1] || parsed;
}

export function getFormActionError(result: ActionResult) {
  if (result.type !== 'failure' || !result.data) return null;
  return parseErrorObject(result.data as unknown as string);
}
}
