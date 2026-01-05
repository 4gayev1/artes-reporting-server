function checkHealth(req, res) {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
}

module.exports = { checkHealth };
