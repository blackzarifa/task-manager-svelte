import type { ActionResult } from '@sveltejs/kit';
import type { ModalSettings } from '@skeletonlabs/skeleton';

export function parseErrorObject(data: string): string {
  const parsed = JSON.parse(data);
  return parsed[1] || parsed;
}

export function getFormActionError(result: ActionResult): string | null {
  if (result.type !== 'failure' || !result.data) return null;
  return parseErrorObject(result.data as unknown as string);
}

export function handleActionError(data: ActionResult): ModalSettings | null {
  if (data.type === 'failure' && data.data) {
    const modalSettings: ModalSettings = {
      type: 'alert',
      title: 'Error',
      body: parseErrorObject(data.data as unknown as string),
      buttonTextCancel: 'Close',
    };
    return modalSettings;
  }
  return null;
}

export function handleSimpleErrorText(error: string): ModalSettings {
  const modalSettings: ModalSettings = {
    type: 'alert',
    title: 'Error',
    body: error,
    buttonTextCancel: 'Close',
  };
  return modalSettings;
}
