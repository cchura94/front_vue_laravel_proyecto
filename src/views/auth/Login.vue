<template>
<!--
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
-->
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <img src="layout/images/avatar.png" alt="Image" height="50" class="mb-3">
                        <div class="text-900 text-3xl font-medium mb-3">Bienvenido!</div>
                        <span class="text-600 font-medium">Ingresar</span>
                    </div>
                
                    <div class="w-full md:w-10 mx-auto">
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Correo Electronico</label>
                        <InputText id="email1" v-model="usuario.email" type="text" class="w-full mb-3" placeholder="Email" style="padding:1rem;" />
                
                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="usuario.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                
                        <div class="flex align-items-center justify-content-between mb-5">
                            <div class="flex align-items-center">
                                <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button label="Ingresar" class="w-full p-3 text-xl"  @click="ingresar"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue"
import authService from "@/service/AuthService"
import { useRouter } from 'vue-router'

export default {
    
    setup(){
        const router = useRouter()

        // declarar variables
        const ObjUsuarioEmpty = {
            email: '',
            password: ''
        }
        const checked = ref(false)

        const usuario = ref(ObjUsuarioEmpty)
        
        const token =ref(null)
        

        // declarar metodos
        const ingresar = async () => {
            try{
                const {data} = await authService.loginConLaravel(usuario.value)
                console.log(data);
                token.value = data
                localStorage.setItem("access_token", data.access_token)
    
                router.push({name: 'Admin'})
            }catch(error){
                console.log("ERROR DEL COMPONENTE: ", error);
            }
        }

        // retornar las variables o metodos 
        return { usuario, ingresar, token, checked }
    }
}
</script>

<style>

</style>