<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';

	const { title } = $props();
</script>

<header>
	<AppBar>
		<h3 class="h3 mb-0">
			<a href="/">{title}</a>
		</h3>
	</AppBar>
</header>
