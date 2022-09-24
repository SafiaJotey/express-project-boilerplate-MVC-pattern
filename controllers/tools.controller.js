let tools = [
  {
    name: 'hammer1',
    id: 1,
  },
  {
    name: 'hammer2',
    id: 2,
  },
  {
    name: 'hammer3',
    id: 3,
  },
];

module.exports.getAllTools = (req, res) => {
  const { limit } = req.query;
  const allTools = tools.slice(0, limit);
  res.status(200).send({
    success: true,
    message: 'successfully found the tools',
    data: allTools,
  });
  // res.status(500).send({
  //   success: false,
  //   error: 'internal server error',
  // });
};

module.exports.saveAtool = (req, res) => {
  const body = req.body;
  tools.push(body);
  res.status(200).send({
    success: true,
    message: 'successfully post a tool',
    data: tools,
  });
};
module.exports.getAtool = (req, res) => {
  const { id } = req.params;
  const aTool = tools.filter((tool) => tool.id === parseInt(id));
  res.status(200).send({
    success: true,
    message: 'successfully get a tool with id',
    data: aTool,
  });
};
module.exports.updateAtool = (req, res) => {
  const { name } = req.body;
  const updatedTool = tools.find((tool) => tool.id === parseInt(req.params.id));
  updatedTool.name = name;
  res.status(200).send({
    success: true,
    message: 'successfully updated a tool with id',
    data: updatedTool,
  });
};
module.exports.deleteAtool = (req, res) => {
  const { id } = req.params;
  const newTools = tools.filter((tool) => tool.id !== parseInt(id));
  res.status(200).send({
    success: true,
    message: 'successfully deleted a tool with id',
    data: newTools,
  });
};
