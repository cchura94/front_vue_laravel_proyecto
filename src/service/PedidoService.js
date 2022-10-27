import { http } from "./Http"

export default {
    getPedidos(page, rows){
      return http().get(`/pedido?page=${page}&rows=${rows}`);
    },

    guardarPedido(pedido){
        return http().post(`/pedido`, pedido);
    },

    getPedido(id){
        return http().get(`/pedido/${id}`);
    },

    updatePedido(id, pedido){
        return http().put(`/pedido/${id}`, pedido);
    },
    deletePedido(id){
        return http().delete(`/pedido/${id}`);
    },
}