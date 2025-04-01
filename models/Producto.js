import connection from "../utils/db.js";

class Producto{
  constructor(nombre, descripcion,precio,categoria_id) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.categoria_id = categoria_id;
  }
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

  async create() {
    try {
      const [result] = await connection.query("INSERT INTO productos (nombre, descripcion, precio, categoria_id) VALUES (?,?,?,?)",
        [this.nombre, this.descripcion, this.precio, this.categoria_id]);
      return {
        id: result.id,
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        categoria_id: this.categoria_id
      }
    } catch (error) {
      throw new Error("ERROR: Al crear la productos");
    }
  }
}
export default Producto;