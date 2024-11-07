<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	const { title } = $props<{ title: string }>();
</script>

<header>
	<AppBar>
		<h3 class="h3 mb-0">
			<a href="/" aria-label="Home {title}">{title}</a>
		</h3>
	</AppBar>
</header>
