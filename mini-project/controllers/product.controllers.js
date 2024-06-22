const productModel = require("../model/product.model");
async function get(req, res) {
  try {
    const products = await productModel.find();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(products));
    res.end();
  } catch (error) {}
}
const productController = {
  get,
};
module.exports = productController;
