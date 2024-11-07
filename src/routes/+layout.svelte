<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/common/Header.svelte';

	let { children } = $props();

	const title = $state('Task Manager');
</script>

<Header {title} />

<div class="container mx-auto space-y-8 p-4">
	{@render children()}
</div>
