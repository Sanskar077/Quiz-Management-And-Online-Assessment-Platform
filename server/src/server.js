const app = require('./app');
const config = require('./config/env');

app.listen(config.port, () => {
  console.log(`[server] Running in ${config.env} mode on http://localhost:${config.port}`);
});
