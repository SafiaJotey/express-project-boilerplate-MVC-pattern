module.exports.errorHandler = (err, req, res) => {
  res.send(err.message);
};
