import { http } from "./Http"

export default {
    getClientes(){
        return http().get(`/cliente`);
    },

    sendCliente(cliente){
        return http().post(`/cliente`, cliente);
    },

    getCliente(id){
        return http().get(`/cliente/${id}`);
    },

    updateCliente(id, cliente){
        return http().put(`/cliente/${id}`, cliente);
    },
    deleteCliente(id){
        return http().delete(`/cliente/${id}`);
    },
    buscarCliente(q){
        return http().get(`/cliente/buscar?q=${q}`)
    }
}