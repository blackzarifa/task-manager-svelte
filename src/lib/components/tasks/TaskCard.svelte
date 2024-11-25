<script lang="ts">
	import type { Task } from '$lib/types/task';

	const { task } = $props<{ task: Task }>();
</script>

<div class="card variant-filled-primary card-hover my-4 cursor-pointer p-4">
	<h5 class="h5">{task.title}</h5>
	<p>{task.description}</p>
</div>
