<script lang="ts">
	import type { Task } from '$lib/types/task';
	import { formatDate, formatDateTime } from '$lib/utils/dates';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { handleSimpleErrorText } from '$lib/utils/errors';

	const modalStore = getModalStore();
	const { task, updateTask, deleteTask } = $props<{
		task: Task;
		updateTask: (task: Task) => void;
		deleteTask: (task: Task) => void;
	}>();

	async function handleDelete() {
		const res = await fetch(`/api/tasks/${task.id}`, {
			method: 'DELETE',
		});
		const data = await res.json();

		if (!res.ok) {
			const modalSettings = handleSimpleErrorText(data.error);
			modalStore.trigger(modalSettings);
			return;
		}

		deleteTask(task);
	}

	async function handleCompletedChange(e: Event) {
		const checked: boolean = (e.target as HTMLInputElement).checked;
		const res = await fetch(`api/tasks/${task.id}`, {
			method: 'PUT',
			body: JSON.stringify(checked),
		});
		const data = await res.json();

		if (!res.ok) {
			const modalSettings = handleSimpleErrorText(data.error);
			console.log(modalSettings);
			modalStore.trigger(modalSettings);
			return;
		}

		updateTask({ ...task, completed: checked });
	}

	function openEditForm() {
		modalStore.trigger({
			type: 'component',
			title: 'Edit task',
			component: 'taskModal',
			meta: { mode: 'edit', task, updateTask },
		});
	}

	function openDeleteModal() {
		modalStore.trigger({
			type: 'confirm',
			title: 'Confirm Deletion',
			body: 'Are you sure you want to delete this task?',
			response: (r: boolean) => r && handleDelete(),
		});
	}
</script>

<div class="card variant-filled-primary card-hover my-4 cursor-pointer p-4">
	<header class="flex flex-wrap gap-y-2 sm:items-center sm:justify-between">
		<h4 class="h4 w-full sm:w-auto">{task.title}</h4>

		<div class="ml-auto flex gap-2">
			<span class="variant-filled-surface badge">
				Due {formatDate(task.dueDate)}
			</span>

			<label class="flex items-center space-x-1">
				<input
					class="checkbox"
					type="checkbox"
					checked={task.completed}
					onchange={handleCompletedChange}
				/>
				<p>Completed?</p>
			</label>
		</div>
	</header>

	<div class="my-2">
		<p>{task.description}</p>
	</div>

	<footer
		class="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
	>
		<span class="text-sm opacity-90">
			Created {formatDateTime(task.createdAt)}
		</span>

		<div class="flex w-full gap-2 sm:w-auto">
			<button class="variant-filled btn btn-sm flex-1" onclick={openEditForm}>Edit</button>
			<button class="variant-outline btn btn-sm flex-1" onclick={openDeleteModal}> Delete </button>
		</div>
	</footer>
</div>
