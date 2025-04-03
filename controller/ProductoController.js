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
      const OBJProducto = new Producto();
      const producto = await OBJProducto.create(nombre, descripcion, precio, categoria_id);
      res.status(201).json(producto)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static updateProducto = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion, precio, categoria_id } = req.body;
      
      const OBJProducto = new Producto();
      const producto = await OBJProducto.update(nombre, descripcion, precio, categoria_id, id);
      res.status(201).json(producto)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static updateParcialProducto = async (req, res) => {
    try {
      const { id } = req.params;
      const campos = req.body;
      const OBJProducto = new Producto();
      const producto = await OBJProducto.updateParcial(campos, id);
      res.status(201).json(producto)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default ProductoController;