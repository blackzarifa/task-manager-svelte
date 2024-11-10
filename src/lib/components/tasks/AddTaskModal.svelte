<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { Task } from '$lib/types/task';

	const modalStore = getModalStore();
	const { addTask } = $modalStore[0]?.meta ?? { addTask: () => {} };

	const formData = $state<Task>({
		id: crypto.randomUUID(),
		title: '',
		description: '',
		dueDate: '',
		completed: false,
		createdAt: new Date().toISOString(),
	});

	const handleSubmit: SubmitFunction = () => {
		addTask(formData);
		modalStore.close();
		return undefined;
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
			action="?/createTask"
			use:enhance={handleSubmit}
			class="space-y-4 border border-surface-500 p-4"
		>
			<label class="label">
				<span>Title</span>
				<input
					class="input"
					type="text"
					bind:value={formData.title}
					placeholder="Task title..."
					required
				/>
			</label>

			<label class="label">
				<span>Description</span>
				<textarea
					class="textarea"
					bind:value={formData.description}
					placeholder="Task description..."
					rows="3"
				></textarea>
			</label>

			<label class="label">
				<span>Due Date</span>
				<input
					class="input"
					type="date"
					bind:value={formData.dueDate}
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
