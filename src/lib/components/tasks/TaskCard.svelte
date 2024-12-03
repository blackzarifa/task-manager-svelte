<script lang="ts">
	import type { Task } from '$lib/types/task';
	import { formatDate, formatDateTime } from '$lib/utils/dates';

	const { task } = $props<{ task: Task }>();
</script>

<div class="card variant-filled-primary card-hover my-4 cursor-pointer p-4">
	<header class="flex items-center justify-between">
		<h4 class="h4">{task.title}</h4>

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

	<div class="mt-2">
		<p>{task.description}</p>
	</div>

	<footer class="mt-4 flex items-center justify-between">
		<span class="text-sm opacity-90">
			Created {formatDateTime(task.createdAt)}
		</span>

		<div class="flex gap-2">
			<button class="variant-filled-success btn btn-sm">Edit</button>
			<button class="variant-filled-error btn btn-sm">Delete</button>
		</div>
	</footer>
</div>
