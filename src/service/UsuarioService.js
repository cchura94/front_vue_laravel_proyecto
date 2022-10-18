import { http } from "./Http"

export default {

    indexUsuario(){
        return http().get("/usuario");
    },
    storeUsuario(datos){
        return http().post("/usuario", datos);
    },
    updateUsuario(id, datos){
        return http().put(`/usuario/${id}`, datos);
    },
    showUsuario(id){
        return http().get(`/usuario/${id}`);
    },
    destroyUsuario(id){
        return http().delete(`/usuario/${id}`);
    }
}