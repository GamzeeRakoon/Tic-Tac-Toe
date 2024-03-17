<script lang="ts">
	import Board from '../../Components/Board.svelte';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { gameState, playerName, redirectStore, disableBoard } from '$lib/store';
	import { io } from 'socket.io-client';
	import { onMount } from 'svelte';
	import { draw } from 'svelte/transition';

	let { subscribe, update } = gameState;

	const modalStore = getModalStore();
	const socket = io();

	let squares: any;
	let xIsNext: any;
	let playerNameValue: any;
	let status: string;

	playerName.subscribe((value) => {
		playerNameValue = value.name;
	});

	subscribe((value) => {
		xIsNext = value.xIsNext;
		squares = value.squares;
	});

	const handleClick = (i: any) => {
		if (!squares[i]) {
			const newSquares = squares.slice();

			newSquares[i] = xIsNext ? 'X' : 'O';

			let name = playerNameValue;
			let innerValue = newSquares[i];
			let indexId = i;

			const newWinner = calculateWinner(newSquares);

			if (newWinner === 'X' || newWinner == 'O' || newWinner == 'draw') {
				socket.emit('gameOver', newWinner, newSquares);
				return;
			}

			socket.emit('playing', { value: innerValue, id: indexId, name: name });
		}
	};

	socket.on('playing', (e) => {
		const foundObject = e.allPlayers.find(
			(obj) => obj.p1.p1name == `${playerNameValue}` || obj.p2.p2name == `${playerNameValue}`
		);

		let p1id = foundObject.p1.p1move;
		let p2id = foundObject.p2.p2move;

		if (foundObject.sum % 2 == 0) {
			status = "O's turn";
			disableBoard.set(false);
		} else {
			status = "X's turn";
			disableBoard.set(false);
		}

		if (p1id !== '') {
			let pushToPlayer = squares.slice();

			pushToPlayer[p1id] = 'X';
			if (foundObject.p1.p1name == playerNameValue) {
				disableBoard.set(true);
			}

			update(() => {
				return {
					winner: null,
					xIsNext: false,
					squares: pushToPlayer
				};
			});
		}

		if (p2id !== '') {
			let pushToPlayer = squares.slice();

			pushToPlayer[p2id] = 'O';
			if (foundObject.p2.p2name == playerNameValue) {
				disableBoard.set(true);
			}

			update(() => {
				return {
					winner: null,
					xIsNext: true,
					squares: pushToPlayer
				};
			});
		}
	});

	socket.on('gameOver', (winner: string, square) => {
		disableBoard.set(true);

		// @ts-ignore
		update(() => {
			return {
				winner: winner,
				xIsNext: false,
				squares: square
			};
		});

		if (winner == 'X' || winner == 'O') {
			winnerModal(winner);
		}

		if (winner == 'draw') {
			drawModal();
		}

		setTimeout(() => {
			window.location.href = '/';
		}, 5000);
	});

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
			body: `It's a draw!`
		};
		modalStore.trigger(modal);
		return '';
	};

	onMount(() => {
		const wasRedirected = $redirectStore;

		if (wasRedirected) {
			window.location.href = '/';
			return;
		}
		modalStore.close();
	});
</script>

<div class="h-full flex flex-col items-center justify-center">
	<div class="card p-4 text-center">
		<p>{status}</p>
		<div class="grid grid-cols-3">
			{#each squares as square, i}
				<Board disableBoard={$disableBoard} value={square} handleClick={() => handleClick(i)} />
			{/each}
		</div>
	</div>
</div>
