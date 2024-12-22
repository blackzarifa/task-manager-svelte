import type { ActionResult } from '@sveltejs/kit';

export function getFormActionError(result: ActionResult) {
  if (result.type !== 'failure' || !result.data) return null;
  const parsed = JSON.parse(result.data as unknown as string);
  return parsed[1] || parsed;
}
