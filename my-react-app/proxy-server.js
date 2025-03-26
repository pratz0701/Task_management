// import express from 'express';
// import { createProxyMiddleware } from 'http-proxy-middleware';

// const app = express();

// // CORS handling for preflight requests
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // Allow all domains (or specify a domain)
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization');
    
//     // If it's a preflight request, respond with 200 status and the correct headers
//     if (req.method === 'OPTIONS') {
//         return res.status(200).end();
//     }

//     next();
// });

// // Proxy configuration
// app.use('/api', createProxyMiddleware({
//     target: 'https://dummyjson.com', // Target server
//     changeOrigin: true,
//     pathRewrite: { '^/api': '' }, // Remove "/api" prefix before forwarding
//     onProxyRes: (proxyRes, req, res) => {
//         res.setHeader('Access-Control-Allow-Origin', '*');
//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//         res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization');
//     },
// }));

// app.listen(3000, () => {
//     console.log('Proxy server running on http://localhost:3000');
// });


import http from 'http';
import httpProxy  from 'http-proxy';

// Create a proxy server with custom application logic
const proxy = httpProxy.createProxyServer({});

// Create your target server
const server = http.createServer((req, res) => {
  // You can define here where should the proxy go
  proxy.web(req, res, { target: 'http://dummyjson.com' });
});

console.log('<<<<< Listening on port 5000 >>>>>');
server.listen(3000);
