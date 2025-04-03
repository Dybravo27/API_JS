import connection from "../utils/db.js";

class Producto{
  /**
   * Metodo para obtener los registros de la base de datos
   * @returns  {Array} listado de los productos en un arreglo
   */
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM productos");
      return rows;
    } catch (error) {
      throw new Error("ERROR: al obtener productos");
    }
  }

  async create(nombre,descripcion,precio,categoria_id) {
    try {
      const [result] = await connection.query("INSERT INTO productos (nombre, descripcion, precio, categoria_id) VALUES (?,?,?,?)",
        [nombre, descripcion, precio, categoria_id]);
      return { id: result.id, nombre, descripcion, precio, categoria_id  }
    } catch (error) {
      throw new Error("ERROR: Al crear los productos");
    }
  }

  async update(nombre, descripcion, precio, categoria_id, id) {
    try {
      const [result] = await connection.query("UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria_id = ? WHERE id = ?",
        [nombre, descripcion, precio, categoria_id, id]);
      if (result.affectedRows === 0) {
        throw new Error("Producto no encontrado");
      }
      return { id, nombre, descripcion, precio, categoria_id }
    } catch (error) {
      throw new Error("ERROR: Al Actualizar el producto");
    }
  }
}
export default Producto;