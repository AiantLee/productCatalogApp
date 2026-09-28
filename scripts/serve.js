const { createReadStream, existsSync, statSync } = require('node:fs');
const { createServer } = require('node:http');
const { extname, join, normalize, resolve } = require('node:path');

const root = resolve(__dirname, '..');
const port = Number(process.env.PORT || 4173);
// Listen on every interface by default so container and cloud-workspace previews
// can reach the catalogue. Set HOST=127.0.0.1 to restrict it to the local machine.
const host = process.env.HOST || '0.0.0.0';
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

const server = createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const relativePath = pathname === '/' ? 'index.html' : normalize(pathname).replace(/^[/\\]+/, '');
  const filePath = resolve(join(root, relativePath));

  if (!filePath.startsWith(`${root}${require('node:path').sep}`) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  response.writeHead(200, {
    'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream',
    'Cache-Control': 'no-cache'
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  const displayHost = host === '0.0.0.0' ? '127.0.0.1' : host;
  console.log(`KC Aluminium catalogue: http://${displayHost}:${port}`);
});
