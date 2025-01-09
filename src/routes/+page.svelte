<script lang="ts">
	import type { Task } from '$lib/types/task';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { browser } from '$app/environment';
	import TaskCard from '$lib/components/tasks/TaskCard.svelte';

	const modalStore = getModalStore();
	const tasks = $state<Task[]>(browser ? JSON.parse(localStorage.getItem('tasks') || '[]') : []);

	function createTask(newTask: Task) {
		tasks.push(newTask);
		if (browser) localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	function updateTask(updatedTask: Task) {
		const index = tasks.findIndex((t: Task) => t.id === updatedTask.id);
		if (index !== -1) tasks[index] = updatedTask;
		if (browser) localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	function deleteTask(deletedTask: Task) {
		const index = tasks.findIndex((t: Task) => t.id === deletedTask.id);
		if (index !== -1) {
			tasks.splice(index, 1);
			if (browser) localStorage.setItem('tasks', JSON.stringify(tasks));
		}
	}

	function openForm() {
		modalStore.trigger({
			type: 'component',
			title: 'Add a new task',
			component: 'taskModal',
			meta: { mode: 'create', createTask },
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
			<div class="mb-6 border-b p-4">
				<h3 class="h3 font-semibold">Tasks</h3>
			</div>
		</div>

		{#each tasks as task (task.id)}
			<TaskCard {task} {updateTask} {deleteTask} />
		{/each}
	</section>
</div>
