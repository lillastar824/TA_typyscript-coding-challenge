const asyncEndpoint = async (req, res, endpoint) => {
  try {
    return await endpoint(req, res);
  } catch (e) {
    console.error(e);
    res.status(e.status).json({ error: { message: e.message } });
  }
};

export default asyncEndpoint;
