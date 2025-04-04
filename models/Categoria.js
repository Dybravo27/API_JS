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
  
  async relacionadaConProductos(categoria_id) {
    const [productos] = await connection.query("SELECT * FROM productos WHERE categoria_id = ?",[categoria_id]);
    return productos.length > 0;    
  }
  
  async delete(categoria_id) {
    const categoriaRelacionado = await this.relacionadaConProductos(categoria_id);

    if (categoriaRelacionado) {
      return{
        error: true,
        mensaje: "No se puede eliminar la categoria por que se encuentra asociada a otros productos existentes"
      };
    }

    const [result] = await connection.query("DELETE FROM categorias WHERE id = ?",[categoria_id]);

    if (result.affectedRows === 0) {
      return{
        error : true,
        mensaje: "Categoria no encontrada"
      };
    }
    
    return{
      error: false,
      mensaje: "Categoria eliminada de manera Exitosa"
    }
  }
}
export default Categoria;