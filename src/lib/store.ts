import { writable } from 'svelte/store';

export const gameState = writable({
	winner: null,
	squares: new Array(9).fill(null),
	xIsNext: true
});
