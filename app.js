const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>CI/CD Pipeline with Jenkins and Docker is Live</h1>');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', version: '1.0.0' });
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

module.exports = app;
