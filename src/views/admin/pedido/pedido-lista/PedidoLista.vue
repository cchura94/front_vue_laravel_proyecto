<template>
  <div class="card">
    <DataTable :value="pedidos" responsiveLayout="scroll">
            <Column field="id" header="ID"></Column>
            <Column field="fecha_pedido" header="FECHA PEDIDO"></Column>
            <Column field="cliente.nombre_completo" header="CLIENTE"></Column>
            <Column field="productos" header="PRODUCTOS">
                <template #body="slotProps">
                    <Button
                        icon="pi pi-eye"
                        class="p-button-rounded p-button-info mr-2"
                         @click="mostrarProductos(slotProps.data)"
                    />
                </template>
            </Column>
        </DataTable>


        
        <Dialog header="Header" v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
            
            <DataTable :value="productos" responsiveLayout="scroll">
                <Column field="id" header="ID"></Column>
                <Column field="nombre" header="NOMBRE"></Column>
                <Column field="precio" header="PRECIO"></Column>
                <Column field="pivot.cantidad" header="Cantidad"></Column>
            </DataTable>

            <template #footer>
                <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
                <Button label="Yes" icon="pi pi-check" @click="closeModal" autofocus />
            </template>
        </Dialog>
  </div>
</template>

<script>
import pedidoService from "@/service/PedidoService.js"
import { onMounted, ref } from 'vue';

export default {

    setup() {
        const pedidos = ref([]);
        const productos = ref([]);
        const displayModal = ref(false)

        onMounted(() => {
            listaPedidos()
        })

        const listaPedidos = async () => {
            const {data} = await pedidoService.getPedidos(1, 15);
            pedidos.value = data.data
        }

        const mostrarProductos = (ped) => {
            productos.value = ped.productos

            displayModal.value = true
        }

        
        return {
            pedidos,
            productos,
            mostrarProductos,
            displayModal
        }
    }

}
</script>

<style>

</style>