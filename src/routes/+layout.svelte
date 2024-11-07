<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/common/Header.svelte';
	import { initializeStores, Modal } from '@skeletonlabs/skeleton';
	import type { ModalComponent } from '@skeletonlabs/skeleton';
	import AddTaskModal from '$lib/components/tasks/AddTaskModal.svelte';

	initializeStores();

	let { children } = $props();

	const title = $state('Task Manager');
	const modalRegistry: Record<string, ModalComponent> = {
		addTaskModal: { ref: AddTaskModal },
	};
</script>

<Modal components={modalRegistry} />

<Header {title} />

<main class="container mx-auto space-y-8 p-4">
	{@render children()}
</main>
