export const validarCategoria = (req, res,next) => {
  const { nombre, descripcion } = req.body;
  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ mensaje: "El nombre en la categoria es obligatorio"});
  }
  if (!descripcion || descripcion.trim() === "") {
    return res.status(400).json({ mensaje: "La descripcion en la categoria es obligatorio"});
  }
  next();
}