import { writable } from 'svelte/store';

export const gameState = writable({
	winner: null,
	squares: new Array(9).fill(null),
	xIsNext: true
});

export const redirectStore = writable(true);

export const disableBoard = writable(true);

export const playerName = writable({
	name: ''
});
