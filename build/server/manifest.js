const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","images/ma_cheese.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.DokJEERJ.js","app":"_app/immutable/entry/app.OECSV8py.js","imports":["_app/immutable/entry/start.DokJEERJ.js","_app/immutable/chunks/entry.DNdkb8mG.js","_app/immutable/chunks/scheduler.cwPrGksG.js","_app/immutable/chunks/index.-__t-DoX.js","_app/immutable/entry/app.OECSV8py.js","_app/immutable/chunks/scheduler.cwPrGksG.js","_app/immutable/chunks/index.csaw_Ye6.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-DfLzNmUQ.js')),
			__memo(() => import('./chunks/1-DpnZb4nT.js')),
			__memo(() => import('./chunks/2-6iLTQBy0.js')),
			__memo(() => import('./chunks/3-Ks-Lx_W1.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/start",
				pattern: /^\/start\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
