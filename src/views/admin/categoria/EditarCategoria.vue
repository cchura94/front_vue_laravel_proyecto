<template>
<div class="card">
    <h1>Editar Categoria</h1>

 <ProgressBar mode="indeterminate" style="height: .5em" v-if="cargando" />
    <div class="grid p-fluid">
            <div class="col-12 md:col-6">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-table"></i>
                    </span>
                    <InputText placeholder="Nombre Categoria" v-model="categoria.nombre" />
                </div>
            </div>

            <div class="col-12 md:col-12">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">Detalle</span>
                    <InputText placeholder="Detalles de Categoria" v-model="categoria.detalle" />
                </div>
            </div>

            <div class="col-12 md:col-12">
                <div class="p-inputgroup">
                    
                    <Button
                        label="Modificar Categoria"
                        icon="pi pi-plus"
                        class="mr-2"
                        @click="modificarCategoria"
                    />
                </div>
            </div>
        </div>
</div>
</template>

<script>
import {ref, onMounted} from 'vue'
import categoriaService from "@/service/CategoriaService.js"
import { useRouter, useRoute } from 'vue-router'

export default {

    
    setup(){
        const router = useRouter()
        const route = useRoute();

        const categoria = ref({nombre: '', detalle: ''})
        const cargando = ref(false)

        onMounted(() => {
            mostrarCategoria()
        })

        const mostrarCategoria = async () => {
            try{
                cargando.value =true 
                const {data} = await categoriaService.getCategoria(route.params.id);

                categoria.value = data

                cargando.value = false

            }catch(error){
                console.log(error)
            }
        }

        const modificarCategoria = async () => {
cargando.value =true 
            try{
                const {data} = await categoriaService.updateCategoria(categoria.value.id, categoria.value);

                router.push({name: 'ListaCategoria'})
cargando.value = false
            }catch(error){
                console.log(error)
            }
            
        }

        return {
            categoria,
            modificarCategoria,
            cargando
        }
    }
    

}
</script>

<style>

</style>