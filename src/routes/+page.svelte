<script lang="ts">
	import type { Task } from '$lib/types/task';
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();
	const tasks = $state<Task[]>(JSON.parse(localStorage.getItem('tasks') || '[]'));

	function addTask(newTask: Task) {
		tasks.push(newTask);
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	function openForm() {
		modalStore.trigger({
			type: 'component',
			title: 'Add a new task',
			component: 'addTaskModal',
			meta: { addTask },
		});
	}
</script>

<div>
	<section class="my-8">
		<div class="flex justify-end">
			<button type="button" class="variant-filled btn btn-md font-semibold" onclick={openForm}>
				Add Task
			</button>
		</div>
	</section>

	<section>
		<div class="rounded-lg shadow">
			<div class="border-b p-4">
				<h2 class="font-semibold">Tasks</h2>
			</div>
		</div>
	</section>
</div>
