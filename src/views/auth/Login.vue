<template>
    <h1>Login</h1>

    <hr>
    <label for="">Ingrese Correo</label>
    <input type="email" v-model="usuario.email">
    <br>
    <label for="">Ingrese Password</label>
    <input type="password" v-model="usuario.password">

    <br>
    <button @click="ingresar">INGRESAR</button>
    <input type="button" value="INGRESAR" @click="ingresar">

    <hr>
    {{ usuario }}  
    {{ token }}
</template>

<script>
import { ref } from "vue"
import authService from "@/service/AuthService"

export default {
    
    setup(){
        // declarar variables
        const ObjUsuarioEmpty = {
            email: '',
            password: ''
        }

        const usuario = ref(ObjUsuarioEmpty)
        
        const token =ref(null)
        

        // declarar metodos
        const ingresar = async () => {
            console.log("INGRESANDO...")
            const {data} = await authService.loginConLaravel(usuario.value)
            console.log(data);
            token.value = data

        }

        // retornar las variables o metodos 
        return { usuario, ingresar, token }
    }
}
</script>

<style>

</style>