let count = 0;
module.exports.viewcount = (req, res, next) => {
  count++;
  console.log(count);
  //   res.send('counting view');
  next();
};
