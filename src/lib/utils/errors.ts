import type { ActionResult } from '@sveltejs/kit';
import { getModalStore } from '@skeletonlabs/skeleton';

export function parseErrorObject(data: string) {
  const parsed = JSON.parse(data);
  return parsed[1] || parsed;
}

export function getFormActionError(result: ActionResult) {
  if (result.type !== 'failure' || !result.data) return null;
  return parseErrorObject(result.data as unknown as string);
}

export function handleActionError(data: ActionResult) {
  if (data.type === 'failure' && data.data) {
    getModalStore().trigger({
      type: 'alert',
      title: 'Error',
      body: parseErrorObject(data as unknown as string),
      buttonTextCancel: 'Close',
    });
    return true;
  }
  return false;
}
