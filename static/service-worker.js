// const CACHE_NAME = 'tools-ecg-v3';
// const APP_SHELL = ['/', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png'];

// self.addEventListener('install', (event) => {
// 	event.waitUntil(
// 		caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
// 	);
// });

// self.addEventListener('activate', (event) => {
// 	event.waitUntil(
// 		caches
// 			.keys()
// 			.then((keys) =>
// 				Promise.all(
// 					keys
// 						.filter((key) => key !== CACHE_NAME)
// 						.map((key) => caches.delete(key))
// 				)
// 			)
// 			.then(() => self.clients.claim())
// 	);
// });

// async function handleFetch(request) {
// 	let response;

// 	try {
// 		response = await fetch(request);
// 	} catch (error) {
// 		const cachedResponse = await caches.match(request);
// 		if (cachedResponse) {
// 			return cachedResponse;
// 		}
// 		if (request.mode === 'navigate') {
// 			return caches.match('/');
// 		}
// 		return Response.error();
// 	}

// 	if (response.ok || response.type === 'opaque') {
// 		const responseToCache = response.clone();
// 		try {
// 			const cache = await caches.open(CACHE_NAME);
// 			await cache.put(request, responseToCache);
// 		} catch (error) {
// 			console.error('Response could not be cached', error);
// 		}
// 	}

// 	return response;
// }

// self.addEventListener('fetch', (event) => {
// 	if (event.request.method !== 'GET') {
// 		return;
// 	}

// 	event.respondWith(handleFetch(event.request));
// });
