const products = require("../data/products.json");
async function find() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}
const productModel = {
  find,
};
module.exports = productModel;
