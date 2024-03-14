import { c as create_ssr_component, d as subscribe, e as escape, l as each, v as validate_component } from './ssr-CzbH427G.js';
import { g as getModalStore, a as playerName, d as disableBoard, r as redirectStore, b as gameState } from './store-CDXCx3q9.js';
import { io } from 'socket.io-client';
import './index-C-_osVpQ.js';

const Board = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value } = $$props;
  let { handleClick } = $$props;
  let { disableBoard: disableBoard2 } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.handleClick === void 0 && $$bindings.handleClick && handleClick !== void 0)
    $$bindings.handleClick(handleClick);
  if ($$props.disableBoard === void 0 && $$bindings.disableBoard && disableBoard2 !== void 0)
    $$bindings.disableBoard(disableBoard2);
  return `<button ${disableBoard2 ? "disabled" : ""} type="button" class="btn variant-ringed-tertiary size-32 flex items-center justify-center rounded-none">${escape(value || "")}</button>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_redirectStore;
  let $disableBoard, $$unsubscribe_disableBoard;
  $$unsubscribe_redirectStore = subscribe(redirectStore, (value) => value);
  $$unsubscribe_disableBoard = subscribe(disableBoard, (value) => $disableBoard = value);
  let { subscribe: subscribe$1, update } = gameState;
  const modalStore = getModalStore();
  const socket = io();
  let squares;
  let xIsNext;
  let playerNameValue;
  let status;
  playerName.subscribe((value) => {
    playerNameValue = value.name;
  });
  subscribe$1((value) => {
    xIsNext = value.xIsNext;
    squares = value.squares;
  });
  const handleClick = (i) => {
    if (!squares[i]) {
      const newSquares = squares.slice();
      newSquares[i] = xIsNext ? "X" : "O";
      let name = playerNameValue;
      let innerValue = newSquares[i];
      let indexId = i;
      const newWinner = calculateWinner(newSquares);
      if (newWinner === "X" || newWinner == "O") {
        socket.emit("gameOver", newWinner, newSquares);
        return;
      }
      socket.emit("playing", { value: innerValue, id: indexId, name });
    }
  };
  socket.on("playing", (e) => {
    const foundObject = e.allPlayers.find((obj) => obj.p1.p1name == `${playerNameValue}` || obj.p2.p2name == `${playerNameValue}`);
    let p1id = foundObject.p1.p1move;
    let p2id = foundObject.p2.p2move;
    if (foundObject.sum % 2 == 0) {
      status = "O's turn";
      disableBoard.set(false);
    } else {
      status = "X's turn";
      disableBoard.set(false);
    }
    if (p1id !== "") {
      let pushToPlayer = squares.slice();
      pushToPlayer[p1id] = "X";
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
    if (p2id !== "") {
      let pushToPlayer = squares.slice();
      pushToPlayer[p2id] = "O";
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
  socket.on("gameOver", (winner, square) => {
    disableBoard.set(true);
    update(() => {
      return { winner, xIsNext: false, squares: square };
    });
    if (winner == "X" || winner == "O") {
      winnerModal(winner);
    }
    if (winner == "draw") {
      drawModal();
    }
    setTimeout(
      () => {
        window.location.href = "/";
      },
      5e3
    );
  });
  const calculateWinner = (squares2) => {
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
      if (squares2[a] && squares2[a] === squares2[b] && squares2[a] === squares2[c])
        return squares2[a];
    }
    const isDraw = squares2.every((square) => square !== null);
    return isDraw ? "draw" : null;
  };
  const winnerModal = (winner) => {
    const modal = {
      type: "alert",
      title: "Winner!",
      body: `player ${winner} has won the game!`
    };
    modalStore.trigger(modal);
    return "";
  };
  const drawModal = () => {
    const modal = {
      type: "alert",
      title: "Draw!",
      body: `It's a draw!`
    };
    modalStore.trigger(modal);
    return "";
  };
  $$unsubscribe_redirectStore();
  $$unsubscribe_disableBoard();
  return `<div class="h-full flex flex-col items-center justify-center"><div class="card p-4 text-center"><p>${escape(status)}</p> <div class="grid grid-cols-3">${each(squares, (square, i) => {
    return `${validate_component(Board, "Board").$$render(
      $$result,
      {
        disableBoard: $disableBoard,
        value: square,
        handleClick: () => handleClick(i)
      },
      {},
      {}
    )}`;
  })}</div></div></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-B2nx-g9R.js.map
