// Switch INPUT_DIR / OUTPUT_DIR to point at the real M365/MCP-hook folders
// when ready. Override via env vars instead of editing this file if you
// want to keep the test paths as the default:
//   COVERAGEIQ_INPUT_DIR=... COVERAGEIQ_OUTPUT_DIR=... node server/server.js
const path = require('path');

const ROOT = path.join(__dirname, '..');

module.exports = {
  INPUT_DIR: process.env.COVERAGEIQ_INPUT_DIR || path.join(ROOT, 'test_coverageIQ_data', 'input'),
  OUTPUT_DIR: process.env.COVERAGEIQ_OUTPUT_DIR || path.join(ROOT, 'test_coverageIQ_data', 'output'),
  POLL_INTERVAL_MS: 3000,
  PORT: process.env.PORT || 5175,
};

// ============================================================
// REAL ONEDRIVE FOLDERS (smkenney's laptop)
// To switch over: comment out the module.exports block above,
// then uncomment the module.exports block below.
// ============================================================
// module.exports = {
//   INPUT_DIR: 'C:\\Users\\smkenney\\OneDrive\\coverageIQ_AI\\input',
//   OUTPUT_DIR: 'C:\\Users\\smkenney\\OneDrive\\coverageIQ_AI\\output',
//   POLL_INTERVAL_MS: 3000,
//   PORT: process.env.PORT || 5175,
// };
