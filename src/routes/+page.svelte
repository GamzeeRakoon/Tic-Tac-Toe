<script lang="ts">
	import { io } from 'socket.io-client';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { playerName, redirectStore, disableBoard } from '$lib/store';
	import { goto } from '$app/navigation';

	const modalStore = getModalStore();
	const socket = io();

	let drake: any;

	const emptyUsername = () => {
		const modal: ModalSettings = {
			type: 'alert',
			title: 'Empty Username',
			body: 'Please enter a username before starting!'
		};
		modalStore.trigger(modal);
		return '';
	};

	const loading = () => {
		const modal: ModalSettings = {
			type: 'component',
			component: 'ModalLoading',
			title: 'Empty Username',
			body: 'Please enter a username before starting!'
		};
		modalStore.trigger(modal);
		return '';
	};

	const updatePlayerName = (newName: string) => {
		playerName.set({ name: newName });
	};

	const searchForPlayer = () => {
		if (drake === undefined || null) {
			return emptyUsername();
		}

		loading();
		updatePlayerName(drake);
		socket.emit('find', { name: drake });
	};

	socket.on('find', (e) => {
		let allPlayersArray = e.allPlayers;

		let foundObj = allPlayersArray.find((obj) => obj.p1.p1name == drake || obj.p2.p2name == drake);

		if (foundObj.p1.p1name == drake) {
			disableBoard.set(false);
		} else {
			disableBoard.set(true);
		}

		redirectStore.set(false);
		goto('/start');
	});
</script>

<div class="h-full flex flex-col items-center justify-center">
	<div class="card p-4 text-center">
		<label class="label space-y-5">
			<h1 class="h2">Choose a username</h1>
			<input class="input" type="text" placeholder="Username..." bind:value={drake} />
			<button class="btn variant-outline-tertiary" on:click={() => searchForPlayer()}>
				Search for player
			</button>
		</label>
	</div>
</div>
