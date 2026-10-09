const Product = require("../models/product");

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        await product.destroy();

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

module.exports = {
    deleteProduct
};