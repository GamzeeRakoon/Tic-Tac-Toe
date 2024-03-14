<script lang="ts">
	import { initializeStores, type ModalComponent } from '@skeletonlabs/skeleton';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { Modal } from '@skeletonlabs/skeleton';
	import Header from '../Components/Header.svelte';
	import ModalLoading from '../Components/ModalLoading.svelte';

	import '../app.postcss';

	const modalRegistry: Record<string, ModalComponent> = {
		ModalLoading: { ref: ModalLoading }
	};

	initializeStores();
</script>

<Modal components={modalRegistry} />

<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>

	<slot />
</AppShell>
