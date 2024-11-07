<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	function openForm() {
		modalStore.trigger({
			type: 'alert',
			title: 'Hello!',
			body: 'This is our first modal dialog',
			buttonTextCancel: 'Close',
		});
	}
</script>

<div>
	<section class="my-8">
		<div class="flex justify-end">
			<button type="button" class="variant-filled btn btn-md font-semibold" on:click={openForm}>
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
