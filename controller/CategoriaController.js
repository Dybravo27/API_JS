import Categoria from "../models/Categoria.js";

class CategoriaController {
  static getAllCategorias = async (req, res) => {
    const OBJCategoria = new Categoria();
    const categorias = await OBJCategoria.getAll();
    res.json(categorias);
  }
  static createCategoria = async(req,res) => {
    try {
      const { nombre, descripcion } = req.body;
      const OBJCategoria = new Categoria();
      const categoria = await OBJCategoria.create(nombre, descripcion);
      res.status(201).json(categoria)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  static updateCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    try {
      const OBJCategoria = new Categoria();
      const categoria = await OBJCategoria.update(nombre, descripcion,id);
      res.status(201).json(categoria)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static updateParcialCategoria = async (req, res) => {
    const { id } = req.params;
    const campos = req.body;
    try {
      const OBJCategoria = new Categoria();
      const categoria = await OBJCategoria.updateParcial(campos,id);
      res.status(201).json(categoria)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static deleteCategoria = async (req, res) => {
    try {
      const { id } = req.params;
      const OBJCategoria = new Categoria();
      const categoria = await OBJCategoria.delete(id);
      res.status(201).json(categoria)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default CategoriaController;