import { c as create_ssr_component, d as subscribe, e as escape } from './ssr-CzbH427G.js';
import { p as page } from './stores-7fBSUFl1.js';
import './client-CQ5E_ugM.js';
import './exports-DuWZopOC.js';

const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
});

export { Error as default };
//# sourceMappingURL=error.svelte-Dg6Wso2m.js.map
