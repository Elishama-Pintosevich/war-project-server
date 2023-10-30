const indexR = require("./index");
const namesR = require("./names")
const rightsR = require("./rights")
const aidsR = require("./aids")
const tractatesR = require("./tractates")
const teilimR = require("./teilim")
const psalmsR = require("./psalms")

exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/names", namesR)
  app.use("/rights", rightsR)
  app.use("/aids", aidsR)
  app.use("/tractates", tractatesR)
  app.use("/teilim", teilimR)
  app.use("/psalms", psalmsR)
}


