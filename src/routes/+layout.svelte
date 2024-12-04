<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/common/Header.svelte';
	import { initializeStores, Modal } from '@skeletonlabs/skeleton';
	import type { ModalComponent } from '@skeletonlabs/skeleton';
	import TaskModal from '$lib/components/tasks/TaskModal.svelte';

	initializeStores();

	let { children } = $props();

	const title = $state('Task Manager');
	const modalRegistry: Record<string, ModalComponent> = {
		taskModal: { ref: TaskModal },
	};
</script>

<Modal components={modalRegistry} />

<Header {title} />

<main class="container mx-auto space-y-8 p-4">
	{@render children()}
</main>
