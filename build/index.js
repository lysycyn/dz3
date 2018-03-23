/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
<<<<<<< HEAD
/******/ 	var hotCurrentHash = "4b39648ffdba52d01506"; // eslint-disable-line no-unused-vars
=======
/******/ 	var hotCurrentHash = "ec962be2126017ef8e1b"; // eslint-disable-line no-unused-vars
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(1)(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "body {\n  margin: 0;\n  background: black;\n}\n\n.canvas {\n  width: 100%;\n  height: 100vh;\n  display: block;\n}\n\n.glitch {\n  position: absolute;\n  top: 0;\n  z-index: 2;\n}\n\n.interface {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  height: 100vh;\n}\n\n.interface__sinewave {\n  position: absolute;\n  bottom: 25px;\n  right: 25px;\n}\n\n.interface__frequency-bar {\n  position: absolute;\n  bottom: 25px;\n  left: 25px;\n}\n\n.interface__target {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  width: 150px;\n  height: 100px;\n  border: 3px solid rgba(255, 255, 255, .5);\n  -webkit-animation: target 1s infinite linear;\n          animation: target 1s infinite linear\n}\n\n.interface__target::before {\n  content: '';\n  position: absolute;\n  left: -10%;\n  width: 120%;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n  height: 2px;\n  background: white;\n}\n\n.interface__target::after {\n  content: '';\n  position: absolute;\n  top: -10%;\n  height: 120%;\n  left: 0;\n  right: 0;\n  margin: auto;\n  width: 2px;\n  background: white;\n}\n\n@-webkit-keyframes target {\n    0% {\n      -webkit-transform: scale(2);\n              transform: scale(2);\n    }\n    50% {\n      -webkit-transform: scale(0.5);\n              transform: scale(0.5);\n    }\n}\n\n@keyframes target {\n    0% {\n      -webkit-transform: scale(2);\n              transform: scale(2);\n    }\n    50% {\n      -webkit-transform: scale(0.5);\n              transform: scale(0.5);\n    }\n}\n", ""]);

// exports


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_index_css__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Terminator__ = __webpack_require__(6);




(() => {
<<<<<<< HEAD
  const video = document.createElement('video');

  const canvasVision = document.querySelector('.js-vision');

  const canvasGlitch = document.querySelector('.js-glitch');
  const canvasSinewave = document.querySelector('.js-sinewave');
  const canvasFrequencyBar = document.querySelector('.js-frequency');

  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
      width: canvasVision.width,
      height: canvasVision.height
    }
  }).then(stream => {
    const terminator = new __WEBPACK_IMPORTED_MODULE_1__Terminator__["a" /* default */](video, canvasVision, stream, canvasGlitch, canvasSinewave, canvasFrequencyBar);
    terminator.run();
  });
=======
    const video = document.createElement('video');

    const canvasVision = document.querySelector('.js-vision');

    const canvasGlitch = document.querySelector('.js-glitch');
    const canvasSinewave = document.querySelector('.js-sinewave');
    const canvasFrequencyBar = document.querySelector('.js-frequency');

    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
            width: canvasVision.width,
            height: canvasVision.height
        }
    }).then(stream => {
        const terminator = new __WEBPACK_IMPORTED_MODULE_1__Terminator__["a" /* default */](video, canvasVision, stream, canvasGlitch, canvasSinewave, canvasFrequencyBar);
        terminator.run();
    });
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(0);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(0, function() {
			var newContent = __webpack_require__(0);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vision__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vision___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Vision__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Glitch__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Voice__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Analyzer__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Sinewave__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__FrequencyBar__ = __webpack_require__(15);







<<<<<<< HEAD
/**
 * Класс для запуска всех эффектов. Фактически - агрегатор разлинчных классов для удобного масштабирования
 */
class Terminator {
  constructor(video, canvasVision, stream, canvasGlitch, canvasSinewave, canvasFrequencyBar) {
    this._glitch = new __WEBPACK_IMPORTED_MODULE_1__Glitch__["a" /* default */](canvasGlitch);
    this._vision = new __WEBPACK_IMPORTED_MODULE_0__Vision___default.a(video, canvasVision, stream, this._glitch);
    this._analyzer = new __WEBPACK_IMPORTED_MODULE_3__Analyzer__["a" /* default */](stream);
    this._sinewave = new __WEBPACK_IMPORTED_MODULE_4__Sinewave__["a" /* default */](this._analyzer.getAnalyzer(), canvasSinewave);
    this._frequencyBar = new __WEBPACK_IMPORTED_MODULE_5__FrequencyBar__["a" /* default */](this._analyzer.getAnalyzer(), canvasFrequencyBar);
  }

  /**
   * Запуск всех систем
   * Голосовое Воспроизведение
   * Визуализация интерфейса
   * Визуализация анализаторов звука
   */
  run() {
    __WEBPACK_IMPORTED_MODULE_2__Voice__["a" /* default */].speakPhraze('Система проанализирована');
    this._vision.startVision();
    this._sinewave.startSinewave();
    this._frequencyBar.startFrequency();
  }
=======
class Terminator {
    constructor(video, canvasVision, stream, canvasGlitch, canvasSinewave, canvasFrequencyBar) {
        this._glitch = new __WEBPACK_IMPORTED_MODULE_1__Glitch__["a" /* default */](canvasGlitch);
        this._vision = new __WEBPACK_IMPORTED_MODULE_0__Vision___default.a(video, canvasVision, stream, this._glitch);
        this._analyzer = new __WEBPACK_IMPORTED_MODULE_3__Analyzer__["a" /* default */](stream);
        this._sinewave = new __WEBPACK_IMPORTED_MODULE_4__Sinewave__["a" /* default */](this._analyzer.getAnalyzer(), canvasSinewave);
        this._frequencyBar = new __WEBPACK_IMPORTED_MODULE_5__FrequencyBar__["a" /* default */](this._analyzer.getAnalyzer(), canvasFrequencyBar);
    }

    run() {
        __WEBPACK_IMPORTED_MODULE_2__Voice__["a" /* default */].speakPhraze("Система проанализирована");
        this._vision.startVision();
        this._sinewave.startSinewave();
        this._frequencyBar.startFrequency();
    }
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Terminator;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

<<<<<<< HEAD
/**
 * Класс для отрисовки видео в канвасе. Для помех используется фильтр blur.
 * Также используется агрегат - оболочка для
 * функции вызова помех на ВЕСЬ ИНТЕРФЕЙС, которая отрисовывается каждые 3 секунды в другом канвасе
 */
class Vision {
  constructor(video, canvas, stream, glitch) {
    this._video = video;
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
    this._video.srcObject = stream;
    // храним оболочку для вызова функции помех, задержка - 3 секунды
    this._glitch = glitch.glitchWrapper(3000);
  }

  /**
   * Отрисовка видео на канвасе с помощью метода RAF, FPS не тормозит,
   * в нули выставляются все пиксели, кроме красных для создания эффекта красного зрения
   */
  _draw() {
    this._context.drawImage(this._video, 0, 0, this._canvas.width, this._canvas.height);

    const image = this._context.getImageData(0, 0, this._canvas.width, this._canvas.height);

    for (let i = 0; i < image.data.length; i += 4) {
      image.data[i + 1] = 0;
      image.data[i + 2] = 0;
    }

    this._context.putImageData(image, 0, 0);

    this._glitch(image);

    requestAnimationFrame(() => this._draw());
  }

  /**
   * Создание помех на видео с помощью фильтра blur
   * Рандомно создаётся несколько фильтров с разным размытием для создания помех.
   */
  _blurVision() {
    let tick = 0;
    const repeat = 5;

    if (tick > repeat) {
      return;
    }

    const timerId = setInterval(() => {
      tick++;
      const radius = (Math.random() * 100).toFixed(1);
      this._canvas.style.filter = `blur(${radius}px)`;

      if (tick > repeat) {
        clearInterval(timerId);
        this._canvas.style.filter = '';
      }
    }, 100);
  }

  /**
   * Старт отрисовки на канвасе плюс запук помех раз в 5 секунд
   */
  startVision() {
    this._draw();
    setInterval(() => this._blurVision(), 5000);
  }
=======
class Vision {
    constructor(video, canvas, stream, glitch) {
        this._video = video;
        this._canvas = canvas;
        this._context = canvas.getContext('2d');
        this._video.srcObject = stream;
        this._glitch = glitch.glitchWrapper(3000);
    }

    _draw() {
        this._context.drawImage(this._video, 0, 0, this._canvas.width, this._canvas.height);

        let image = this._context.getImageData(0, 0, this._canvas.width, this._canvas.height);
        let data = image.data;

        for (let i = 0; i < image.data.length; i = i + 4) {
            image.data[i + 1] = 0;
            image.data[i + 2] = 0;
        }

        this._context.putImageData(image, 0, 0);

        this._glitch(image);

        requestAnimationFrame(() => this._draw());
    }

    _blurVision() {
        let tick = 0;
        const repeat = 5;

        if (tick > repeat) {
            return;
        }

        let timerId = setInterval(() => {
            tick++;
            const radius = (Math.random() * 100).toFixed(1);
            this._canvas.style.filter = `blur(${radius}px)`;

            if (tick > repeat) {
                clearInterval(timerId);
                this._canvas.style.filter = '';
            }
        }, 100);
    }

    startVision() {
        this._draw();
        setInterval(() => this._blurVision(), 5000);
    }
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
}

module.exports = Vision;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_glitch_min__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_glitch_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__lib_glitch_min__);


/**
 * Создание эффекта помех с помощью библиотеки glitch-canvas.
 * Фактически - нужна лишь обертка - функция для периодического срабатывания помех
 */
class Glitch {
  constructor(canvasGlitch) {
    this._canvas = canvasGlitch;
    this._context = canvasGlitch.getContext('2d');
  }

  /**
   * Отрисовка помех в телечение 0.2 секунды. В настройке библиотеки можно задать другие
   * праметры для помех.
   */
  _draw(image) {
    const timeDuration = 200;
    __WEBPACK_IMPORTED_MODULE_0__lib_glitch_min___default()().fromImageData(image).toImageData().then(imageData => {
      this._context.putImageData(imageData, 0, 0);

      setTimeout(() => {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
      }, timeDuration);
    });
  }

  /**
   * Функция-обертка для вызова помех.
   */
  glitchWrapper(time) {
    let lock = false;

    return (...args) => {
      if (!lock) {
        lock = true;
        this._draw.apply(this, ...args);

        setTimeout(() => {
          lock = false;
        }, time);
      }
    };
  }
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_glitch_min_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_glitch_min_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__lib_glitch_min_js__);


class Glitch {
    constructor(canvasGlitch) {
        this._canvas = canvasGlitch;
        this._context = canvasGlitch.getContext('2d');;
    }

    _draw(image) {
        const timeDuration = 200;
        __WEBPACK_IMPORTED_MODULE_0__lib_glitch_min_js___default()().fromImageData(image).toImageData().then(imageData => {
            this._context.putImageData(imageData, 0, 0);

            setTimeout(() => {
                this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
            }, timeDuration);
        });
    }

    glitchWrapper(time) {
        let lock = false;

        return (...args) => {

            if (!lock) {

                lock = true;
                this._draw.apply(this, args);

                setTimeout(() => {
                    lock = false;
                }, time);
            }
        };
    }
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Glitch;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {!function (t, e) {
<<<<<<< HEAD
   true ? module.exports = e() : typeof define === 'function' && define.amd ? define(e) : t.glitch = e();
}(this, () => {
  function t(t, e, n) {
    return t < e ? e : t > n ? n : t;
  }function e(t) {
    let e = !1;if (void 0 !== t) try {
      e = JSON.parse(JSON.stringify(t));
    } catch (t) {}return e;
  }function n(n) {
    return typeof (n = e(n)) !== 'object' && (n = {}), Object.keys(p).filter(t => t !== 'iterations').forEach(e => {
      typeof n[e] !== 'number' || isNaN(n[e]) ? n[e] = p[e] : n[e] = t(n[e], 0, 100), n[e] = Math.round(n[e]);
    }), (typeof n.iterations !== 'number' || isNaN(n.iterations) || n.iterations <= 0) && (n.iterations = p.iterations), n.iterations = Math.round(n.iterations), n;
  }function r(t) {
    if (t instanceof HTMLImageElement) {
      if (!t.naturalWidth || !t.naturalHeight || !1 === t.complete) throw new Error(`This this image hasn't finished loading: ${t.src}`);let e = new d(t.naturalWidth, t.naturalHeight),
          n = e.getContext('2d');n.drawImage(t, 0, 0, e.width, e.height);const r = n.getImageData(0, 0, e.width, e.height);return r.data && r.data.length && (void 0 === r.width && (r.width = t.naturalWidth), void 0 === r.height && (r.height = t.naturalHeight)), r;
    }throw new Error('This object does not seem to be an image.');
  }function i(t) {
    return new Promise((e, n) => {
      const r = new v();r.onload = function () {
=======
   true ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.glitch = e();
}(this, function () {
  "use strict";
  function t(t, e, n) {
    return t < e ? e : t > n ? n : t;
  }function e(t) {
    var e = !1;if (void 0 !== t) try {
      e = JSON.parse(JSON.stringify(t));
    } catch (t) {}return e;
  }function n(n) {
    return "object" != typeof (n = e(n)) && (n = {}), Object.keys(p).filter(function (t) {
      return "iterations" !== t;
    }).forEach(function (e) {
      "number" != typeof n[e] || isNaN(n[e]) ? n[e] = p[e] : n[e] = t(n[e], 0, 100), n[e] = Math.round(n[e]);
    }), ("number" != typeof n.iterations || isNaN(n.iterations) || n.iterations <= 0) && (n.iterations = p.iterations), n.iterations = Math.round(n.iterations), n;
  }function r(t) {
    if (t instanceof HTMLImageElement) {
      if (!t.naturalWidth || !t.naturalHeight || !1 === t.complete) throw new Error("This this image hasn't finished loading: " + t.src);var e = new d(t.naturalWidth, t.naturalHeight),
          n = e.getContext("2d");n.drawImage(t, 0, 0, e.width, e.height);var r = n.getImageData(0, 0, e.width, e.height);return r.data && r.data.length && (void 0 === r.width && (r.width = t.naturalWidth), void 0 === r.height && (r.height = t.naturalHeight)), r;
    }throw new Error("This object does not seem to be an image.");
  }function i(t) {
    return new Promise(function (e, n) {
      var r = new v();r.onload = function () {
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
        e(r);
      }, r.onerror = function (t) {
        n(t);
      }, r.src = t;
    });
  }function a(t, e, n, r) {
    i(t).then(n, r);
  }function o(t) {
    return { width: t.width || t.naturalWidth, height: t.height || t.naturalHeight };
  }function s(t) {
<<<<<<< HEAD
    let e = o(t),
        n = new d(e.width, e.height),
        r = n.getContext('2d');return r.drawImage(t, 0, 0, e.width, e.height), { canvas: n, ctx: r };
  }function u(t, e, n, r) {
    i(t).then(t => {
      let e = o(t),
          r = s(t).ctx.getImageData(0, 0, e.width, e.height);r.width || (r.width = e.width), r.height || (r.height = e.height), n(r);
    }, r);
  }function c(t) {
    return t && typeof t.width === 'number' && typeof t.height === 'number' && t.data && typeof t.data.length === 'number' && typeof t.data === 'object';
  }function f(t, e) {
    return new Promise((n, r) => {
      if (c(t)) {
        const i = new d(t.width, t.height);i.getContext('2d').putImageData(t, 0, 0), n(i.toDataURL('image/jpeg', e / 100));
      } else r(new Error('object is not valid imageData'));
    });
  }function h(t) {
    if (t === null || void 0 === t) throw new TypeError('Object.assign cannot be called with null or undefined');return Object(t);
  }function l() {
    throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
  }var p = {
    amount: 35, iterations: 20, quality: 30, seed: 25
  },
      d = function (t, e) {
    void 0 === t && (t = 300), void 0 === e && (e = 150), this.canvasEl = document.createElement('canvas'), this.canvasEl.width = t, this.canvasEl.height = e, this.ctx = this.canvasEl.getContext('2d');
=======
    var e = o(t),
        n = new d(e.width, e.height),
        r = n.getContext("2d");return r.drawImage(t, 0, 0, e.width, e.height), { canvas: n, ctx: r };
  }function u(t, e, n, r) {
    i(t).then(function (t) {
      var e = o(t),
          r = s(t).ctx.getImageData(0, 0, e.width, e.height);r.width || (r.width = e.width), r.height || (r.height = e.height), n(r);
    }, r);
  }function c(t) {
    return t && "number" == typeof t.width && "number" == typeof t.height && t.data && "number" == typeof t.data.length && "object" == typeof t.data;
  }function f(t, e) {
    return new Promise(function (n, r) {
      if (c(t)) {
        var i = new d(t.width, t.height);i.getContext("2d").putImageData(t, 0, 0), n(i.toDataURL("image/jpeg", e / 100));
      } else r(new Error("object is not valid imageData"));
    });
  }function h(t) {
    if (null === t || void 0 === t) throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t);
  }function l() {
    throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs");
  }var p = { amount: 35, iterations: 20, quality: 30, seed: 25 },
      d = function (t, e) {
    void 0 === t && (t = 300), void 0 === e && (e = 150), this.canvasEl = document.createElement("canvas"), this.canvasEl.width = t, this.canvasEl.height = e, this.ctx = this.canvasEl.getContext("2d");
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
  },
      g = { width: { configurable: !0 }, height: { configurable: !0 } };d.prototype.getContext = function () {
    return this.ctx;
  }, d.prototype.toDataURL = function (t, e, n) {
<<<<<<< HEAD
    if (typeof n !== 'function') return this.canvasEl.toDataURL(t, e);n(this.canvasEl.toDataURL(t, e));
=======
    if ("function" != typeof n) return this.canvasEl.toDataURL(t, e);n(this.canvasEl.toDataURL(t, e));
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
  }, g.width.get = function () {
    return this.canvasEl.width;
  }, g.width.set = function (t) {
    this.canvasEl.width = t;
  }, g.height.get = function () {
    return this.canvasEl.height;
  }, g.height.set = function (t) {
    this.canvasEl.height = t;
<<<<<<< HEAD
  }, Object.defineProperties(d.prototype, g), d.Image = Image;var v = d.Image;'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('').forEach((t, e) => {});let m = Object.getOwnPropertySymbols,
=======
  }, Object.defineProperties(d.prototype, g), d.Image = Image;var v = d.Image;"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("").forEach(function (t, e) {});var m = Object.getOwnPropertySymbols,
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
      b = Object.prototype.hasOwnProperty,
      y = Object.prototype.propertyIsEnumerable,
      w = function () {
    try {
<<<<<<< HEAD
      if (!Object.assign) return !1;const t = new String('abc');if (t[5] = 'de', Object.getOwnPropertyNames(t)[0] === '5') return !1;for (var e = {}, n = 0; n < 10; n++) e[`_${String.fromCharCode(n)}`] = n;if (Object.getOwnPropertyNames(e).map(t => e[t]).join('') !== '0123456789') return !1;const r = {};return 'abcdefghijklmnopqrst'.split('').forEach(t => {
        r[t] = t;
      }), Object.keys(Object.assign({}, r)).join('') === 'abcdefghijklmnopqrst';
=======
      if (!Object.assign) return !1;var t = new String("abc");if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;for (var e = {}, n = 0; n < 10; n++) e["_" + String.fromCharCode(n)] = n;if ("0123456789" !== Object.getOwnPropertyNames(e).map(function (t) {
        return e[t];
      }).join("")) return !1;var r = {};return "abcdefghijklmnopqrst".split("").forEach(function (t) {
        r[t] = t;
      }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("");
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
    } catch (t) {
      return !1;
    }
  }() ? Object.assign : function (t, e) {
    for (var n, r, i = arguments, a = h(t), o = 1; o < arguments.length; o++) {
<<<<<<< HEAD
      n = Object(i[o]);for (const s in n) b.call(n, s) && (a[s] = n[s]);if (m) {
        r = m(n);for (let u = 0; u < r.length; u++) y.call(n, r[u]) && (a[r[u]] = n[r[u]]);
      }
    }return a;
  },
      _ = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};return function (t, e) {
    return e = { exports: {} }, t(e, e.exports), e.exports;
  }((t, e) => {
    !function (e, n) {
      t.exports = n();
    }(0, () => {
      function t(t) {
        return typeof t === 'function' || typeof t === 'object' && t !== null;
      }function e(t) {
        return typeof t === 'function';
=======
      n = Object(i[o]);for (var s in n) b.call(n, s) && (a[s] = n[s]);if (m) {
        r = m(n);for (var u = 0; u < r.length; u++) y.call(n, r[u]) && (a[r[u]] = n[r[u]]);
      }
    }return a;
  },
      _ = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};return function (t, e) {
    return e = { exports: {} }, t(e, e.exports), e.exports;
  }(function (t, e) {
    !function (e, n) {
      t.exports = n();
    }(0, function () {
      function t(t) {
        return "function" == typeof t || "object" == typeof t && null !== t;
      }function e(t) {
        return "function" == typeof t;
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
      }function n() {
        return void 0 !== U ? function () {
          U(i);
        } : r();
      }function r() {
<<<<<<< HEAD
        const t = setTimeout;return function () {
          return t(i, 1);
        };
      }function i() {
        for (let t = 0; t < k; t += 2) (0, F[t])(F[t + 1]), F[t] = void 0, F[t + 1] = void 0;k = 0;
      }function a(t, e) {
        let n = arguments,
            r = this,
            i = new this.constructor(s);void 0 === i[K] && I(i);const a = r._state;return a ? function () {
          const t = n[a - 1];H(() => D(a, i, t, r._result));
        }() : w(r, i, t, e), i;
      }function o(t) {
        const e = this;if (t && typeof t === 'object' && t.constructor === e) return t;const n = new e(s);return v(n, t), n;
      }function s() {}function u() {
        return new TypeError('You cannot resolve a promise with itself');
      }function c() {
        return new TypeError('A promises callback cannot return that same promise.');
=======
        var t = setTimeout;return function () {
          return t(i, 1);
        };
      }function i() {
        for (var t = 0; t < k; t += 2) (0, F[t])(F[t + 1]), F[t] = void 0, F[t + 1] = void 0;k = 0;
      }function a(t, e) {
        var n = arguments,
            r = this,
            i = new this.constructor(s);void 0 === i[K] && I(i);var a = r._state;return a ? function () {
          var t = n[a - 1];H(function () {
            return D(a, i, t, r._result);
          });
        }() : w(r, i, t, e), i;
      }function o(t) {
        var e = this;if (t && "object" == typeof t && t.constructor === e) return t;var n = new e(s);return v(n, t), n;
      }function s() {}function u() {
        return new TypeError("You cannot resolve a promise with itself");
      }function c() {
        return new TypeError("A promises callback cannot return that same promise.");
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
      }function f(t) {
        try {
          return t.then;
        } catch (t) {
          return V.error = t, V;
        }
      }function h(t, e, n, r) {
        try {
          t.call(e, n, r);
        } catch (t) {
          return t;
        }
      }function p(t, e, n) {
<<<<<<< HEAD
        H(t => {
          let r = !1,
              i = h(n, e, n => {
            r || (r = !0, e !== n ? v(t, n) : b(t, n));
          }, e => {
            r || (r = !0, y(t, e));
          }, `Settle: ${t._label || ' unknown promise'}`);!r && i && (r = !0, y(t, i));
        }, t);
      }function d(t, e) {
        e._state === G ? b(t, e._result) : e._state === Q ? y(t, e._result) : w(e, void 0, e => v(t, e), e => y(t, e));
=======
        H(function (t) {
          var r = !1,
              i = h(n, e, function (n) {
            r || (r = !0, e !== n ? v(t, n) : b(t, n));
          }, function (e) {
            r || (r = !0, y(t, e));
          }, "Settle: " + (t._label || " unknown promise"));!r && i && (r = !0, y(t, i));
        }, t);
      }function d(t, e) {
        e._state === G ? b(t, e._result) : e._state === Q ? y(t, e._result) : w(e, void 0, function (e) {
          return v(t, e);
        }, function (e) {
          return y(t, e);
        });
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
      }function g(t, n, r) {
        n.constructor === t.constructor && r === a && n.constructor.resolve === o ? d(t, n) : r === V ? (y(t, V.error), V.error = null) : void 0 === r ? b(t, n) : e(r) ? p(t, n, r) : b(t, n);
      }function v(e, n) {
        e === n ? y(e, u()) : t(n) ? g(e, n, f(n)) : b(e, n);
      }function m(t) {
        t._onerror && t._onerror(t._result), j(t);
      }function b(t, e) {
<<<<<<< HEAD
        t._state === z && (t._result = e, t._state = G, t._subscribers.length !== 0 && H(j, t));
      }function y(t, e) {
        t._state === z && (t._state = Q, t._result = e, H(m, t));
      }function w(t, e, n, r) {
        let i = t._subscribers,
            a = i.length;t._onerror = null, i[a] = e, i[a + G] = n, i[a + Q] = r, a === 0 && t._state && H(j, t);
      }function j(t) {
        let e = t._subscribers,
            n = t._state;if (e.length !== 0) {
          for (let r = void 0, i = void 0, a = t._result, o = 0; o < e.length; o += 3) r = e[o], i = e[o + n], r ? D(n, r, i, a) : i(a);t._subscribers.length = 0;
=======
        t._state === z && (t._result = e, t._state = G, 0 !== t._subscribers.length && H(j, t));
      }function y(t, e) {
        t._state === z && (t._state = Q, t._result = e, H(m, t));
      }function w(t, e, n, r) {
        var i = t._subscribers,
            a = i.length;t._onerror = null, i[a] = e, i[a + G] = n, i[a + Q] = r, 0 === a && t._state && H(j, t);
      }function j(t) {
        var e = t._subscribers,
            n = t._state;if (0 !== e.length) {
          for (var r = void 0, i = void 0, a = t._result, o = 0; o < e.length; o += 3) r = e[o], i = e[o + n], r ? D(n, r, i, a) : i(a);t._subscribers.length = 0;
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
        }
      }function E() {
        this.error = null;
      }function M(t, e) {
        try {
          return t(e);
        } catch (t) {
          return X.error = t, X;
        }
      }function D(t, n, r, i) {
<<<<<<< HEAD
        let a = e(r),
=======
        var a = e(r),
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
            o = void 0,
            s = void 0,
            u = void 0,
            f = void 0;if (a) {
          if ((o = M(r, i)) === X ? (f = !0, s = o.error, o.error = null) : u = !0, n === o) return void y(n, c());
        } else o = i, u = !0;n._state !== z || (a && u ? v(n, o) : f ? y(n, s) : t === G ? b(n, o) : t === Q && y(n, o));
      }function O(t, e) {
        try {
<<<<<<< HEAD
          e(e => {
            v(t, e);
          }, e => {
=======
          e(function (e) {
            v(t, e);
          }, function (e) {
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
            y(t, e);
          });
        } catch (e) {
          y(t, e);
        }
      }function A() {
        return Z++;
      }function I(t) {
        t[K] = Z++, t._state = void 0, t._result = void 0, t._subscribers = [];
      }function x(t, e) {
<<<<<<< HEAD
        this._instanceConstructor = t, this.promise = new t(s), this.promise[K] || I(this.promise), B(e) ? (this._input = e, this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), this.length === 0 ? b(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), this._remaining === 0 && b(this.promise, this._result))) : y(this.promise, P());
      }function P() {
        return new Error('Array Methods must be provided an Array');
      }function L() {
        throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
      }function S() {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
      }function T(t) {
        this[K] = A(), this._result = this._state = void 0, this._subscribers = [], s !== t && (typeof t !== 'function' && L(), this instanceof T ? O(this, t) : S());
      }var C = void 0,
          B = C = Array.isArray ? Array.isArray : function (t) {
        return Object.prototype.toString.call(t) === '[object Array]';
=======
        this._instanceConstructor = t, this.promise = new t(s), this.promise[K] || I(this.promise), B(e) ? (this._input = e, this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? b(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && b(this.promise, this._result))) : y(this.promise, P());
      }function P() {
        return new Error("Array Methods must be provided an Array");
      }function L() {
        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
      }function S() {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
      }function T(t) {
        this[K] = A(), this._result = this._state = void 0, this._subscribers = [], s !== t && ("function" != typeof t && L(), this instanceof T ? O(this, t) : S());
      }var C = void 0,
          B = C = Array.isArray ? Array.isArray : function (t) {
        return "[object Array]" === Object.prototype.toString.call(t);
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
      },
          k = 0,
          U = void 0,
          R = void 0,
          H = function (t, e) {
<<<<<<< HEAD
        F[k] = t, F[k + 1] = e, (k += 2) === 2 && (R ? R(i) : J());
      },
          N = typeof window !== 'undefined' ? window : void 0,
          W = N || {},
          $ = W.MutationObserver || W.WebKitMutationObserver,
          q = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]',
          Y = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined',
=======
        F[k] = t, F[k + 1] = e, 2 === (k += 2) && (R ? R(i) : J());
      },
          N = "undefined" != typeof window ? window : void 0,
          W = N || {},
          $ = W.MutationObserver || W.WebKitMutationObserver,
          q = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process),
          Y = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
          F = new Array(1e3),
          J = void 0;J = q ? function () {
        return process.nextTick(i);
      } : $ ? function () {
<<<<<<< HEAD
        let t = 0,
            e = new $(i),
            n = document.createTextNode('');return e.observe(n, { characterData: !0 }), function () {
          n.data = t = ++t % 2;
        };
      }() : Y ? function () {
        const t = new MessageChannel();return t.port1.onmessage = i, function () {
          return t.port2.postMessage(0);
        };
      }() : void 0 === N && typeof l === 'function' ? function () {
        try {
          const t = l('vertx');return U = t.runOnLoop || t.runOnContext, n();
=======
        var t = 0,
            e = new $(i),
            n = document.createTextNode("");return e.observe(n, { characterData: !0 }), function () {
          n.data = t = ++t % 2;
        };
      }() : Y ? function () {
        var t = new MessageChannel();return t.port1.onmessage = i, function () {
          return t.port2.postMessage(0);
        };
      }() : void 0 === N && "function" == typeof l ? function () {
        try {
          var t = l("vertx");return U = t.runOnLoop || t.runOnContext, n();
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
        } catch (t) {
          return r();
        }
      }() : r();var K = Math.random().toString(36).substring(16),
          z = void 0,
          G = 1,
          Q = 2,
          V = new E(),
          X = new E(),
          Z = 0;return x.prototype._enumerate = function () {
<<<<<<< HEAD
        for (let t = this, e = this.length, n = this._input, r = 0; this._state === z && r < e; r++) t._eachEntry(n[r], r);
      }, x.prototype._eachEntry = function (t, e) {
        let n = this._instanceConstructor,
            r = n.resolve;if (r === o) {
          const i = f(t);if (i === a && t._state !== z) this._settledAt(t._state, e, t._result);else if (typeof i !== 'function') this._remaining--, this._result[e] = t;else if (n === T) {
            const u = new n(s);g(u, t, i), this._willSettleAt(u, e);
          } else this._willSettleAt(new n(e => e(t)), e);
        } else this._willSettleAt(r(t), e);
      }, x.prototype._settledAt = function (t, e, n) {
        const r = this.promise;r._state === z && (this._remaining--, t === Q ? y(r, n) : this._result[e] = n), this._remaining === 0 && b(r, this._result);
      }, x.prototype._willSettleAt = function (t, e) {
        const n = this;w(t, void 0, t => n._settledAt(G, e, t), t => n._settledAt(Q, e, t));
      }, T.all = function (t) {
        return new x(this, t).promise;
      }, T.race = function (t) {
        const e = this;return new e(B(t) ? (n, r) => {
          for (let i = t.length, a = 0; a < i; a++) e.resolve(t[a]).then(n, r);
        } : (t, e) => e(new TypeError('You must pass an array to race.')));
      }, T.resolve = o, T.reject = function (t) {
        const e = new this(s);return y(e, t), e;
=======
        for (var t = this, e = this.length, n = this._input, r = 0; this._state === z && r < e; r++) t._eachEntry(n[r], r);
      }, x.prototype._eachEntry = function (t, e) {
        var n = this._instanceConstructor,
            r = n.resolve;if (r === o) {
          var i = f(t);if (i === a && t._state !== z) this._settledAt(t._state, e, t._result);else if ("function" != typeof i) this._remaining--, this._result[e] = t;else if (n === T) {
            var u = new n(s);g(u, t, i), this._willSettleAt(u, e);
          } else this._willSettleAt(new n(function (e) {
            return e(t);
          }), e);
        } else this._willSettleAt(r(t), e);
      }, x.prototype._settledAt = function (t, e, n) {
        var r = this.promise;r._state === z && (this._remaining--, t === Q ? y(r, n) : this._result[e] = n), 0 === this._remaining && b(r, this._result);
      }, x.prototype._willSettleAt = function (t, e) {
        var n = this;w(t, void 0, function (t) {
          return n._settledAt(G, e, t);
        }, function (t) {
          return n._settledAt(Q, e, t);
        });
      }, T.all = function (t) {
        return new x(this, t).promise;
      }, T.race = function (t) {
        var e = this;return new e(B(t) ? function (n, r) {
          for (var i = t.length, a = 0; a < i; a++) e.resolve(t[a]).then(n, r);
        } : function (t, e) {
          return e(new TypeError("You must pass an array to race."));
        });
      }, T.resolve = o, T.reject = function (t) {
        var e = new this(s);return y(e, t), e;
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
      }, T._setScheduler = function (t) {
        R = t;
      }, T._setAsap = function (t) {
        H = t;
<<<<<<< HEAD
      }, T._asap = H, T.prototype = { constructor: T, then: a, catch(t) {
          return this.then(null, t);
        } }, T.polyfill = function () {
        let t = void 0;if (void 0 !== _) t = _;else if (typeof self !== 'undefined') t = self;else try {
          t = Function('return this')();
        } catch (t) {
          throw new Error('polyfill failed because global object is unavailable in this environment');
        }const e = t.Promise;if (e) {
          let n = null;try {
            n = Object.prototype.toString.call(e.resolve());
          } catch (t) {}if (n === '[object Promise]' && !e.cast) return;
=======
      }, T._asap = H, T.prototype = { constructor: T, then: a, catch: function (t) {
          return this.then(null, t);
        } }, T.polyfill = function () {
        var t = void 0;if (void 0 !== _) t = _;else if ("undefined" != typeof self) t = self;else try {
          t = Function("return this")();
        } catch (t) {
          throw new Error("polyfill failed because global object is unavailable in this environment");
        }var e = t.Promise;if (e) {
          var n = null;try {
            n = Object.prototype.toString.call(e.resolve());
          } catch (t) {}if ("[object Promise]" === n && !e.cast) return;
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
        }t.Promise = T;
      }, T.Promise = T, T;
    });
  }).polyfill(), function (t) {
    function e() {
<<<<<<< HEAD
      const t = w({}, b);return g || w(t, y), t;
    }function i() {
      const t = w({}, b);return v || w(t, _), t;
=======
      var t = w({}, b);return g || w(t, y), t;
    }function i() {
      var t = w({}, b);return v || w(t, _), t;
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
    }function o(t) {
      return t;
    }function s(t, e, n) {
      return g = function () {
<<<<<<< HEAD
        return new Promise((r, i) => {
=======
        return new Promise(function (r, i) {
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
          if (n) t(e, r, i);else if (t === o) r(e);else try {
            r(t(e, r, i));
          } catch (t) {
            i(t);
          }
        });
      }, h() ? l() : i();
    }function c(t, n, r) {
      return v = function (e) {
<<<<<<< HEAD
        return new Promise((i, a) => {
=======
        return new Promise(function (i, a) {
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
          r ? t(e, n, i, a) : t === o ? i(e) : t(e, n).then(i, a);
        });
      }, h() ? l() : e();
    }function h() {
      return g && v;
    }function l() {
<<<<<<< HEAD
      return new Promise((e, n) => {
        g().then(e => p(e, t), n).then(t => {
=======
      return new Promise(function (e, n) {
        g().then(function (e) {
          return p(e, t);
        }, n).then(function (t) {
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
          v(t).then(e, n);
        }, n);
      });
    }function p(t, e) {
<<<<<<< HEAD
      return new Promise((n, r) => {
        f(t, e.quality).then(n => d(t, n, e), r).then(n, r);
      });
    }function d(t, e, n) {
      return new Promise((r, i) => {
        m.addEventListener('message', t => {
          t.data && t.data.base64URL ? r(t.data.base64URL) : i(t.data && t.data.err ? t.data.err : t);
        }), m.postMessage({
          params: n, base64URL: e, imageData: t, imageDataWidth: t.width, imageDataHeight: t.height
        });
      });
    }t = n(t);var g,
        v,
        m = new Worker(URL.createObjectURL(new Blob(['function isImageData(a){return a&&"number"==typeof a.width&&"number"==typeof a.height&&a.data&&"number"==typeof a.data.length&&"object"==typeof a.data}function base64ToByteArray(a){for(var e,s=[],t=23,r=a.length;t<r;t++){var i=reversedBase64Map[a.charAt(t)];switch((t-23)%4){case 1:s.push(e<<2|i>>4);break;case 2:s.push((15&e)<<4|i>>2);break;case 3:s.push((3&e)<<6|i)}e=i}return s}function jpgHeaderLength(a){for(var e=417,s=0,t=a.length;s<t;s++)if(255===a[s]&&218===a[s+1]){e=s+2;break}return e}function glitchByteArray(a,e,s,t){for(var r=jpgHeaderLength(a),i=a.length-r-4,p=s/100,n=e/100,h=0;h<t;h++){var g=i/t*h|0,o=g+((i/t*(h+1)|0)-g)*n|0;o>i&&(o=i),a[~~(r+o)]=~~(256*p)}return a}function byteArrayToBase64(a){for(var e,s,t=["data:image/jpeg;base64,"],r=0,i=a.length;r<i;r++){var p=a[r];switch(e=r%3){case 0:t.push(base64Map$1[p>>2]);break;case 1:t.push(base64Map$1[(3&s)<<4|p>>4]);break;case 2:t.push(base64Map$1[(15&s)<<2|p>>6]),t.push(base64Map$1[63&p])}s=p}return 0===e?(t.push(base64Map$1[(3&s)<<4]),t.push("==")):1===e&&(t.push(base64Map$1[(15&s)<<2]),t.push("=")),t.join("")}function glitchImageData(a,e,s){if(isImageData(a))return byteArrayToBase64(glitchByteArray(base64ToByteArray(e),s.seed,s.amount,s.iterations));throw new Error("glitchImageData: imageData seems to be corrupt.")}function fail(a){self.postMessage({err:a.message||a})}function success(a){self.postMessage({base64URL:a})}var base64Chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",base64Map=base64Chars.split(""),reversedBase64Map$1={};base64Map.forEach(function(a,e){reversedBase64Map$1[a]=e});var maps={base64Map:base64Map,reversedBase64Map:reversedBase64Map$1},reversedBase64Map=maps.reversedBase64Map,base64Map$1=maps.base64Map;onmessage=function(a){var e=a.data.imageData,s=a.data.params,t=a.data.base64URL;if(e&&t&&s)try{void 0===e.width&&"number"==typeof a.data.imageDataWidth&&(e.width=a.data.imageDataWidth),void 0===e.height&&"number"==typeof a.data.imageDataHeight&&(e.height=a.data.imageDataHeight),success(glitchImageData(e,t,s))}catch(a){fail(a)}else fail(a.data.imageData?"Parameters are missing.":"ImageData is missing.");self.close()};'], { type: 'text/javascript' }))),
        b = { getParams() {
        return t;
      }, getInput: e, getOutput: i },
        y = { fromImageData(t) {
        return s(o, t);
      }, fromImage(t) {
        return s(r, t);
      } },
        _ = { toImage(t) {
        return c(a, t, !0);
      }, toDataURL(t) {
        return c(o);
      }, toImageData(t) {
=======
      return new Promise(function (n, r) {
        f(t, e.quality).then(function (n) {
          return d(t, n, e);
        }, r).then(n, r);
      });
    }function d(t, e, n) {
      return new Promise(function (r, i) {
        m.addEventListener("message", function (t) {
          t.data && t.data.base64URL ? r(t.data.base64URL) : i(t.data && t.data.err ? t.data.err : t);
        }), m.postMessage({ params: n, base64URL: e, imageData: t, imageDataWidth: t.width, imageDataHeight: t.height });
      });
    }t = n(t);var g,
        v,
        m = new Worker(URL.createObjectURL(new Blob(['function isImageData(a){return a&&"number"==typeof a.width&&"number"==typeof a.height&&a.data&&"number"==typeof a.data.length&&"object"==typeof a.data}function base64ToByteArray(a){for(var e,s=[],t=23,r=a.length;t<r;t++){var i=reversedBase64Map[a.charAt(t)];switch((t-23)%4){case 1:s.push(e<<2|i>>4);break;case 2:s.push((15&e)<<4|i>>2);break;case 3:s.push((3&e)<<6|i)}e=i}return s}function jpgHeaderLength(a){for(var e=417,s=0,t=a.length;s<t;s++)if(255===a[s]&&218===a[s+1]){e=s+2;break}return e}function glitchByteArray(a,e,s,t){for(var r=jpgHeaderLength(a),i=a.length-r-4,p=s/100,n=e/100,h=0;h<t;h++){var g=i/t*h|0,o=g+((i/t*(h+1)|0)-g)*n|0;o>i&&(o=i),a[~~(r+o)]=~~(256*p)}return a}function byteArrayToBase64(a){for(var e,s,t=["data:image/jpeg;base64,"],r=0,i=a.length;r<i;r++){var p=a[r];switch(e=r%3){case 0:t.push(base64Map$1[p>>2]);break;case 1:t.push(base64Map$1[(3&s)<<4|p>>4]);break;case 2:t.push(base64Map$1[(15&s)<<2|p>>6]),t.push(base64Map$1[63&p])}s=p}return 0===e?(t.push(base64Map$1[(3&s)<<4]),t.push("==")):1===e&&(t.push(base64Map$1[(15&s)<<2]),t.push("=")),t.join("")}function glitchImageData(a,e,s){if(isImageData(a))return byteArrayToBase64(glitchByteArray(base64ToByteArray(e),s.seed,s.amount,s.iterations));throw new Error("glitchImageData: imageData seems to be corrupt.")}function fail(a){self.postMessage({err:a.message||a})}function success(a){self.postMessage({base64URL:a})}var base64Chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",base64Map=base64Chars.split(""),reversedBase64Map$1={};base64Map.forEach(function(a,e){reversedBase64Map$1[a]=e});var maps={base64Map:base64Map,reversedBase64Map:reversedBase64Map$1},reversedBase64Map=maps.reversedBase64Map,base64Map$1=maps.base64Map;onmessage=function(a){var e=a.data.imageData,s=a.data.params,t=a.data.base64URL;if(e&&t&&s)try{void 0===e.width&&"number"==typeof a.data.imageDataWidth&&(e.width=a.data.imageDataWidth),void 0===e.height&&"number"==typeof a.data.imageDataHeight&&(e.height=a.data.imageDataHeight),success(glitchImageData(e,t,s))}catch(a){fail(a)}else fail(a.data.imageData?"Parameters are missing.":"ImageData is missing.");self.close()};'], { type: "text/javascript" }))),
        b = { getParams: function () {
        return t;
      }, getInput: e, getOutput: i },
        y = { fromImageData: function (t) {
        return s(o, t);
      }, fromImage: function (t) {
        return s(r, t);
      } },
        _ = { toImage: function (t) {
        return c(a, t, !0);
      }, toDataURL: function (t) {
        return c(o);
      }, toImageData: function (t) {
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
        return c(u, t, !0);
      } };return e();
  };
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10), __webpack_require__(11)))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
<<<<<<< HEAD
/* eslint-disable no-undef */
/* eslint-disable no-console */
/**
 * Воспроизведение фраз с помощью Yandex Speach Kit
 */
class Voice {
  static tts() {
    // настройка экземпляра парсера
    return new ya.speechkit.Tts({
      lang: 'ru-RU',
      apikey: 'cd321fd9-fb7b-42d1-9cfa-a4467abd4afa',
      emotion: 'evil',
      speed: 1,
      speaker: 'ermil'
    });
  }

  /**
   * Воспроизведение фразы
   */
  static speakPhraze(phraze) {
    Voice.tts().speak(phraze, {
      stopCallback: () => {
        console.log(phraze);
      }
    });
  }
=======
class Voice {
    static tts() {
        return new ya.speechkit.Tts({
            lang: 'ru-RU',
            apikey: 'cd321fd9-fb7b-42d1-9cfa-a4467abd4afa',
            emotion: 'evil',
            speed: 1,
            speaker: 'ermil'
        });
    }

    static speakPhraze(phraze) {
        Voice.tts().speak(phraze, {
            stopCallback: () => {
                console.log(phraze);
            }
        });
    }
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Voice;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Инициализация анализатора звука для последующего использования в отрисовке на канвасах
 */
class Analyzer {
<<<<<<< HEAD
  constructor(stream) {
    const audioContext = new window.AudioContext();

    this._analyzer = audioContext.createAnalyser();
=======
  constructor(stream, range) {
    const audioContext = new window.AudioContext();

    this._analyzer = audioContext.createAnalyser();
    this._analyzer.volume;
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac

    this._analyzer.minDecibels = -90;
    this._analyzer.maxDecibels = -10;
    this._analyzer.smoothingTimeConstant = 0.85;
    this._analyzer.fftSize = 256;

    const source = audioContext.createMediaStreamSource(stream);
<<<<<<< HEAD
=======
    const destination = audioContext.destination;
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac

    source.connect(this._analyzer);
  }

  getAnalyzer() {
    return this._analyzer;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Analyzer;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
<<<<<<< HEAD
/**
 * Класс для отрисовки звуковой частоты с помощью канваса
 */
class Sinewave {
  constructor(analyzer, canvas) {
    this._analyzer = analyzer;
    this._canvas = canvas;
    this._context = canvas.getContext('2d');

    this._bufferLength = this._analyzer.fftSize;
    this._dataArray = new Uint8Array(this._bufferLength);

    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  /**
   * Отрисовка волны
   */
  _draw() {
    this._analyzer.getByteTimeDomainData(this._dataArray);

    this._context.fillStyle = 'rgb(255,0,0)';
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

    this._context.lineWidth = 2;
    this._context.strokeStyle = 'rgb(0, 0, 0)';

    this._context.beginPath();

    const sliceWidth = this._canvas.width / this._bufferLength;
    let x = 0;
    let i;
    let v;
    let y;

    for (i = 0; i < this._bufferLength; i++) {
      v = this._dataArray[i] / 128.0;
      y = v * this._canvas.height / 2;

      if (i === 0) {
        this._context.moveTo(x, y);
      } else {
        this._context.lineTo(x, y);
      }

      x += sliceWidth;
    }

    this._context.lineTo(424, 50);
    this._context.stroke();

    requestAnimationFrame(() => {
      this._draw();
    });
  }

  startSinewave() {
    this._draw();
  }
=======
class Sinewave {
    constructor(analyzer, canvas) {
        this._analyzer = analyzer;
        this._canvas = canvas;
        this._context = canvas.getContext("2d");

        this._bufferLength = this._analyzer.fftSize;
        this._dataArray = new Uint8Array(this._bufferLength);

        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    _draw() {
        this._analyzer.getByteTimeDomainData(this._dataArray);

        this._context.fillStyle = 'rgb(255,0,0)';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

        this._context.lineWidth = 2;
        this._context.strokeStyle = 'rgb(0, 0, 0)';

        this._context.beginPath();

        const sliceWidth = this._canvas.width / this._bufferLength;
        let x = 0;
        let i, v, y;

        for (i = 0; i < this._bufferLength; i++) {

            v = this._dataArray[i] / 128.0;
            y = v * this._canvas.height / 2;

            if (i === 0) {
                this._context.moveTo(x, y);
            } else {
                this._context.lineTo(x, y);
            }

            x += sliceWidth;
        }

        this._context.lineTo(424, 50);
        this._context.stroke();

        requestAnimationFrame(() => {
            this._draw();
        });
    }

    startSinewave() {
        this._draw();
    }
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sinewave;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class FrequencyBar {
<<<<<<< HEAD
  constructor(analyzer, canvas) {
    this._canvas = canvas;
    this._context = this._canvas.getContext('2d');
    this._analyzer = analyzer;

    this._bufferLengthAlt = this._analyzer.frequencyBinCount;
    this._dataArrayAlt = new Uint8Array(this._bufferLengthAlt);

    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  _draw() {
    this._analyzer.getByteFrequencyData(this._dataArrayAlt);

    this._context.fillStyle = 'rgb(255, 0, 0)';
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

    const barWidth = this._canvas.width / this._bufferLengthAlt * 2.5;
    let i;
    let barHeight;
    let x = 0;

    for (i = 0; i < this._bufferLengthAlt; i++) {
      barHeight = this._dataArrayAlt[i];

      this._context.fillStyle = `rgb(${barHeight + 100}, 150, 150)`;
      this._context.fillRect(x, this._canvas.height - barHeight / 2, barWidth, barHeight / 2);

      x += barWidth + 1;
    }

    requestAnimationFrame(() => {
      this._draw();
    });
  }

  startFrequency() {
    this._draw();
  }
=======
    constructor(analyzer, canvas) {
        this._canvas = canvas;
        this._context = this._canvas.getContext('2d');
        this._analyzer = analyzer;

        this._bufferLengthAlt = this._analyzer.frequencyBinCount;
        this._dataArrayAlt = new Uint8Array(this._bufferLengthAlt);

        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    _draw() {
        this._analyzer.getByteFrequencyData(this._dataArrayAlt);

        this._context.fillStyle = 'rgb(255, 0, 0)';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

        const barWidth = this._canvas.width / this._bufferLengthAlt * 2.5;
        let i;
        let barHeight;
        let x = 0;

        for (i = 0; i < this._bufferLengthAlt; i++) {
            barHeight = this._dataArrayAlt[i];

            // this._context.fillStyle = 'rgb(' + (barHeight + 100) + ',150,150)';
            this._context.fillStyle = `rgb(${barHeight + 100}, 150, 150)`;
            this._context.fillRect(x, this._canvas.height - barHeight / 2, barWidth, barHeight / 2);

            x += barWidth + 1;
        }

        requestAnimationFrame(() => {
            this._draw();
        });
    }

    startFrequency() {
        console.log('frequency');
        this._draw();
    }
>>>>>>> 08d0ecfdc5273ebe52595aac0d874f16d69d0bac
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FrequencyBar;


/***/ })
/******/ ]);