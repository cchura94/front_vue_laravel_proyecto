<template>
    <div class="card">

<ProgressBar mode="indeterminate" style="height: 0.5em" v-if="cargando" />

        <DataTable :value="categorias" responsiveLayout="scroll">
            <Column v-for="col of columnas" :field="col.campo" :header="col.cabecera" :key="col.campo"></Column>

            <Column :exportable="false" style="min-width:8rem" field="action">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="this.$router.push({ name: 'EditarCategoria', params: {id: slotProps.data.id} });" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
                </template>
            </Column>

        </DataTable>

    </div>
</template>

<script>
import {ref, onMounted} from 'vue'
import categoriaService from "@/service/CategoriaService.js"

export default {
    setup(){
        const categorias = ref([])
        const cargando = ref(false)

        const columnas = [
            {campo: "id", cabecera: 'CODIGO'},
            {campo: "nombre", cabecera: 'NOMBRE'},
            {campo: "detalle", cabecera: 'DETALLE'},
            {campo: "action", cabecera: 'GESTION'},
        ]

        onMounted(() => {
            listarCategorias()
        })

        const listarCategorias = async () => {
            cargando.value = true

            const {data} = await categoriaService.getCategorias();
            categorias.value = data

            cargando.value = false
        }

        return {
            categorias,
            columnas,
            cargando
        }
    }
}
</script>

<style>

</style>