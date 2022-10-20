import { http } from "./Http"

export default {
    getCategorias(){
        return http().get(`/categoria`);
    },

    sendCategoria(categoria){
        return http().post(`/categoria`, categoria);
    },

    getCategoria(id){
        return http().get(`/categoria/${id}`);
    },

    updateCategoria(id, categoria){
        return http().put(`/categoria/${id}`, categoria);
    },
    deleteCategoria(id){
        return http().delete(`/categoria/${id}`);
    },
}