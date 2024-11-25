<script lang="ts">
	import type { Task } from '$lib/types/task';

	const { task } = $props<{ task: Task }>();
</script>

<div class="card variant-filled-primary card-hover p-4">
	<h4>{task.title}</h4>
</div>
