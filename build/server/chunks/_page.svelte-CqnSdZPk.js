import { c as create_ssr_component, a as add_attribute } from './ssr-CzbH427G.js';
import { io } from 'socket.io-client';
import { g as getModalStore, d as disableBoard, r as redirectStore } from './store-CDXCx3q9.js';
import { g as goto } from './client-CQ5E_ugM.js';
import './index-C-_osVpQ.js';
import './exports-DuWZopOC.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  getModalStore();
  const socket = io();
  let drake;
  socket.on("find", (e) => {
    let allPlayersArray = e.allPlayers;
    let foundObj = allPlayersArray.find((obj) => obj.p1.p1name == drake || obj.p2.p2name == drake);
    if (foundObj.p1.p1name == drake) {
      console.log("yur");
      disableBoard.set(false);
      console.log(disableBoard);
    } else {
      console.log("dang");
      disableBoard.set(true);
      console.log(disableBoard);
    }
    console.log("bruh");
    redirectStore.set(false);
    goto();
  });
  return `<div class="h-full flex flex-col items-center justify-center"><div class="card p-4 text-center"><label class="label space-y-5"><h1 class="h2" data-svelte-h="svelte-1mxot7">Choose a username</h1> <input class="input" type="text" placeholder="Username..."${add_attribute("value", drake, 0)}> <button class="btn variant-outline-tertiary" data-svelte-h="svelte-zhpjhu">Search for player</button></label></div></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CqnSdZPk.js.map
