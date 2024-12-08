<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { Task } from '$lib/types/task';

	type TaskModalMeta =
		| { mode: 'create'; createTask: (task: Task) => void }
		| { mode: 'edit'; task: Task; updateTask: (task: Task) => void };

	const modalStore = getModalStore();
	const meta: TaskModalMeta = $modalStore[0]?.meta ?? {
		mode: 'create',
		createTask: () => {},
	};

	const task = $state<Partial<Task>>({
		title: meta.mode === 'edit' ? meta.task.title : '',
		description: meta.mode === 'edit' ? meta.task.description : '',
		dueDate: meta.mode === 'edit' ? meta.task.dueDate : '',
	});

	const handleSubmit: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type === 'success') {
				const data = result.data as { task: Task };

				if (meta.mode === 'create') meta.createTask(data.task);
				else meta.updateTask(data.task);

				modalStore.close();
			} else if (result.type === 'failure') {
				const error = result.data?.error;
				console.error('Failed to create task:', error);
			}
		};
	};
</script>

{#if $modalStore[0]}
	<div class="card w-modal space-y-4 p-4 shadow-xl">
		<header class="text-2xl font-bold">{$modalStore[0].title ?? 'Add a new Task'}</header>

		{#if $modalStore[0].body}
			<article>{$modalStore[0].body}</article>
		{/if}

		<form
			method="POST"
			action={meta.mode === 'create' ? '?/createTask' : `?/updateTask&id={meta.task.id}`}
			use:enhance={handleSubmit}
			class="space-y-4 border border-surface-500 p-4"
		>
			<label class="label">
				<span>Title</span>
				<input
					class="input"
					type="text"
					name="title"
					bind:value={task.title}
					placeholder="Task title..."
					required
				/>
			</label>

			<label class="label">
				<span>Description</span>
				<textarea
					class="textarea"
					name="description"
					bind:value={task.description}
					placeholder="Task description..."
					rows="3"
				></textarea>
			</label>

			<label class="label">
				<span>Due Date</span>
				<input
					class="input"
					type="date"
					name="dueDate"
					bind:value={task.dueDate}
					min={new Date().toISOString().split('T')[0]}
					required
				/>
			</label>

			<footer class="modal-footer flex justify-end space-x-2">
				<button class="variant-ghost btn" type="button" onclick={() => modalStore.close()}>
					Cancel
				</button>
				<button class="variant-filled-primary btn" type="submit"> Create Task </button>
			</footer>
		</form>
	</div>
{/if}

<style>
	::-webkit-calendar-picker-indicator {
		filter: invert(0.8);
	}
</style>
