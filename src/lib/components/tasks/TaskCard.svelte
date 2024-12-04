<script lang="ts">
	import type { Task } from '$lib/types/task';
	import { formatDate, formatDateTime } from '$lib/utils/dates';
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();
	const { task } = $props<{ task: Task }>();

	function openEditForm() {
		modalStore.trigger({
			type: 'component',
			title: 'Edit task',
			component: 'taskModal',
			meta: { task },
		});
	}
</script>

<div class="card variant-filled-primary card-hover my-4 cursor-pointer p-4">
	<header class="flex flex-wrap gap-y-2 sm:items-center sm:justify-between">
		<h4 class="h4 w-full sm:w-auto">{task.title}</h4>

		<div class="flex gap-2">
			<span class="variant-filled-surface badge">
				Due {formatDate(task.dueDate)}
			</span>

			<label class="flex items-center space-x-1">
				<input class="checkbox" type="checkbox" />
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
			<button class="variant-filled-success btn btn-sm flex-1" onclick={openEditForm}>Edit</button>
			<button class="variant-filled-error btn btn-sm flex-1">Delete</button>
		</div>
	</footer>
</div>
