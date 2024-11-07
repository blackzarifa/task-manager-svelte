<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/common/Header.svelte';
	import { initializeStores, Modal } from '@skeletonlabs/skeleton';

	initializeStores();

	let { children } = $props();

	const title = $state('Task Manager');
</script>

<Modal />

<Header {title} />

<main class="container mx-auto space-y-8 p-4">
	{@render children()}
</main>
