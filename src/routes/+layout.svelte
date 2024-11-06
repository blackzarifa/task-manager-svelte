<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="container mx-auto space-y-8 p-4">
	{@render children()}
</div>
