<template>
  <div class="card" v-if="miperfil">
    <h1>MI PERFIL</h1>
    
    <h2>NOMBRE: {{ miperfil.name }}</h2>
    <h2>CORREO: {{ miperfil.email }}</h2>
    <h2>REGISTRADO EN: {{ miperfil.created_at }}</h2>
  </div>
</template>

<script>
import authService from "@/service/AuthService";

import {onMounted, ref} from "vue"

export default {
    setup(){

        const miperfil = ref(null)

        onMounted(async () => {
            
            const {data} = await authService.perfil();
            miperfil.value = data

        });

        return {
            miperfil
        }
        
    }

}
</script>

<style>

</style>