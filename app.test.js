const assert = require('assert');
const app = require('./app');

const server = app.listen(0, async () => {
  const port = server.address().port;
  try {
    const res = await fetch(`http://localhost:${port}/health`);
    const data = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.status, 'healthy');
    console.log('PASS: /health endpoint returned 200 OK and status=healthy');
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('FAIL:', err);
    server.close();
    process.exit(1);
  }
});
