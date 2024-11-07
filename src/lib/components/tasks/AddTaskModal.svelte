<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	const modalStore = getModalStore();

	const formData = $state({
		title: '',
		description: '',
		dueDate: new Date(),
	});

	const handleSubmit: SubmitFunction = (event) => {
		const data = Object.fromEntries(event.formData);

		$modalStore[0]?.response?.(data);
		modalStore.close();

		return undefined;
	};

	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4';
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<header class={cHeader}>{$modalStore[0].title ?? 'Add a new Task'}</header>

		{#if $modalStore[0].body}
			<article>{$modalStore[0].body}</article>
		{/if}

		<form method="POST" action="?/createTask" use:enhance={handleSubmit} class={cForm}>
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
				<input class="input" type="date" bind:value={formData.dueDate} />
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
