import connection from "../utils/db.js";

class Categoria{
  /**
   * Metodo para obtener los registros de la base de datos
   * @returns  {Array} listado de las categorias en un arreglo
   */
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM categorias");
      return rows;
    } catch (error) {
      throw new Error("ERROR: al obtener categorias");
    }
  }

  async create(nombre,descripcion) {
    try {
      const [result] = await connection.query("INSERT INTO categorias (nombre,descripcion) VALUES (?,?)",
        [nombre, descripcion]);
      return { id: result.id, nombre,  descripcion }
    } catch (error) {
      throw new Error("ERROR: Al crear la categoria");
    }
  }
  async update(nombre,descripcion,id) {
    try {
      const [result] = await connection.query("UPDATE categorias SET nombre = ? ,descripcion = ? WHERE id = ?",
        [nombre, descripcion, id]);
      
      if (result.affectedRows === 0) {
        throw new Error("Categoria no encontrada");
      }
      return { id, nombre, descripcion }
    } catch (error) {
      throw new Error("ERROR: Al Actualizar la categoria");
    }
  }
  async updateParcial(campos,id) {
    try {
      let sql = "UPDATE categorias SET ";
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
      if (result.affectedRows === 0) { throw new Error("Categoria no encontrada"); }
      return { mensaje: "Categoria Actualizada" }
    } catch (error) {
      throw new Error("ERROR: Al Actualizar la categoria parcialmente");
    }
  }
  async delete(id) {
    try {
      const [result] = await connection.query("DELETE FROM categorias WHERE id = ?",[id]);
      if (result.affectedRows === 0) {
        throw new Error("Categoria no encontrada");
      }
      return { mensaje: "Categoria Eliminada con Exito" }
    } catch (error) {
      throw new Error("ERROR: Al Eliminar la categoria");
    }
  }
}
export default Categoria;