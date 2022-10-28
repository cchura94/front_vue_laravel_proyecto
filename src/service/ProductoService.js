import { http } from "./Http"

export default {
    getProductos(page, rows){
      return http().get(`/producto?page=${page}&rows=${rows}`);
    },

    sendProducto(producto){
        return http().post(`/producto`, producto);
    },

    getProducto(id){
        return http().get(`/producto/${id}`);
    },

    updateProducto(id, producto){
        return http().put(`/producto/${id}`, producto);
    },
    deleteProducto(id){
        return http().delete(`/producto/${id}`);
    },

    subirImagenProducto(id, formdata){
        return http().post(`/producto/${id}/subir-imagen`, formdata)
    }
}