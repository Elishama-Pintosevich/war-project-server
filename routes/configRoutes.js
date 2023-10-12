const indexR = require("./index");
const namesR = require("./names")
const rightsR = require("./rights")
const aidsR = require("./aids")
const tractatesR = require("./tractates")

exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/names", namesR)
  app.use("/rights", rightsR)
  app.use("/aids", aidsR)
  app.use("/tractates", tractatesR)
}


