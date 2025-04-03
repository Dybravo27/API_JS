export const validarProducto = (req, res, next) => {
    const { nombre, descripcion, precio ,categoria_id } = req.body;
    if (!nombre || nombre.trim() === "") {
        return res.status(400).json({ mensaje: "El nombre en el producto es obligatorio" });
    }
    if (!descripcion || descripcion.trim() === "") {
        return res.status(400).json({ mensaje: "La descripcion en el producto es obligatorio" });
    }
    if (!precio || precio.trim() === "") {
        return res.status(400).json({ mensaje: "El precio en el producto es obligatorio" });
    }
    if (!categoria_id || categoria_id.trim() === "") {
        return res.status(400).json({ mensaje: "La categoria en el producto es obligatorio" });
    }
    next();
}