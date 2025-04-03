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

  async updateParcial(campos,id) {
    try {
      let sql = "UPDATE productos SET ";
      for (let cont = 0; cont < Object.keys(campos).length; cont++) {
        let value = Object.keys(campos)[cont];
        sql += `${value} = '${campos[value]}'`;
        if (cont == Object.keys(campos).length - 1) {
          sql += "";
        }
        else {
          sql += ",";
        }
      }
      sql += ` WHERE id = ${id}`;
      const [result] = await connection.query(sql);
      if (result.affectedRows === 0) { throw new Error("Producto no encontrada"); }
      return { mensaje: "Categoria Actualizada" }
    } catch (error) {
      throw new Error("ERROR: Al Actualizar la categoria parcialmente");
    }
  }
}
export default Producto;