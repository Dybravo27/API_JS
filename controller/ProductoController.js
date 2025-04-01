import Producto from "../models/Producto.js";

class ProductoController {
  static getAllProductos = async (req, res) => {
    const OBJProducto = new Producto();
    const productos = await OBJProducto.getAll();
    res.json(productos);
  }
  static createProducto = async(req,res) => {
    try {
      const { nombre, descripcion, precio, categoria_id } = req.body;
      const OBJProducto = new Producto(nombre, descripcion, precio, categoria_id);
      const producto = await OBJProducto.create();
      res.status(201).json(producto)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default ProductoController;