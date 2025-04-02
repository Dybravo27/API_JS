import express from "express";
import CategoriaController from "../controller/categoriaController.js";
import { validarCategoria } from "../middlewares/validarCategoria.js";

const router = express.Router();
router.get('/', CategoriaController.getAllCategorias);

router.post('/',validarCategoria, CategoriaController.createCategoria)

router.put('/:id', CategoriaController.updateCategoria);

router.patch('/:id', CategoriaController.updateParcialCategoria);


export default router;