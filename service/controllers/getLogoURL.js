async function getLogoURL(req, res) {
  try {
      const url =  await `${req.protocol}://${req.get("host")}/api/logo`;
        return await res.json({ 
            url: url
        });

  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

module.exports = { getLogoURL };
