<script lang="ts">
	import Board from '../Components/Board.svelte';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { gameState } from '$lib/store';

	let { subscribe, update } = gameState;

	const modalStore = getModalStore();

	let winner: string | null;
	let squares: any;
	let xIsNext: boolean;
	$: status = 'Next Player: ' + (xIsNext ? 'X' : 'O');

	subscribe((value) => {
		winner = value.winner;
		squares = value.squares;
		xIsNext = value.xIsNext;
	});

	const handleClick = (i: any) => {
		// Check if the square is filled with a string
		if (!squares[i]) {
			const newSquares = squares.slice();
			newSquares[i] = xIsNext ? 'X' : 'O';

			const newWinner = calculateWinner(newSquares);

			update((state) => {
				return {
					winner: newWinner,
					squares: newSquares,
					xIsNext: !state.xIsNext
				};
			});
		}
	};

	const calculateWinner = (squares: any) => {
		const winningCombo = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];
		for (let i = 0; i < winningCombo.length; i++) {
			const [a, b, c] = winningCombo[i];

			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
		}

		const isDraw = squares.every((square: null) => square !== null);
		return isDraw ? 'draw' : null;
	};

	const winnerModal = (winner: string) => {
		const modal: ModalSettings = {
			type: 'alert',
			title: 'Winner!',
			body: `player ${winner} has won the game!`
		};
		modalStore.trigger(modal);
		return '';
	};

	const drawModal = () => {
		const modal: ModalSettings = {
			type: 'alert',
			title: 'Draw!',
			body: `Its a draw!`
		};
		modalStore.trigger(modal);
		return '';
	};
</script>

<div class="h-full flex flex-col items-center justify-center">
	<div class="card p-4 text-center">
		{#if winner === 'draw'}
			{drawModal()}
		{:else if winner}
			{winnerModal(winner)}
		{/if}
		<h2 class="text-xl font-bold mb-5">{status}</h2>
		<div class="grid grid-cols-3">
			{#each squares as square, i}
				<Board value={square} handleClick={() => handleClick(i)} />
			{/each}
		</div>
	</div>
</div>
