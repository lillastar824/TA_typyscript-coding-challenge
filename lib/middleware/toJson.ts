const toJson = (req, res) => {
  res.status(200).json(req.results);
};

export default toJson;
