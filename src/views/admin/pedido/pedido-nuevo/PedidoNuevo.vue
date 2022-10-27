<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h6>Detalles del Pedido</h6>
            </div>
        </div>
        <div class="col-8">
            <div class="card">
                <h6>Lista de productos</h6>
                <DataTable :value="productos" :paginator="true" :rows="10"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    :rowsPerPageOptions="[10,20,50]" responsiveLayout="scroll"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                    <Column field="id" header="ID"></Column>
                    <Column field="nombre" header="NOMBRE"></Column>
                    <Column field="precio" header="PRECIO"></Column>
                    <Column field="stock" header="STOCK"></Column>
                    <Column field="categoria.nombre" header="CATEGORIA"></Column>
                    <Column field="action" header="GESTION">
                    <template #body="slotProps">
                        <Button
                            icon="pi pi-plus"
                            class="p-button-rounded p-button-success mr-2"
                            @click="addCarrito(slotProps.data)"
                        />
                    </template>
                    
                    </Column>
                    <template #paginatorstart>
                        <Button type="button" icon="pi pi-refresh" class="p-button-text" />
                    </template>
                    <template #paginatorend>
                        <Button type="button" icon="pi pi-cloud" class="p-button-text" />
                    </template>
                </DataTable>
            
            </div>
        </div>
        <div class="col-4">
            <div class="grid">
                <div class="col-12">
                    <div class="card">
                        <h6>Carrito</h6>
                        <DataTable :value="carrito" responsiveLayout="scroll">
                            <Column field="nombre" header="Nombre"></Column>
                            <Column field="precio" header="Precio"></Column>
                            <Column field="cantidad" header="Cant"></Column>
                            <Column field="accion" header="">
                            <template #body="slotProps">
                                <Button
                                    icon="pi pi-trash"
                                    class="p-button-rounded p-button-danger mr-2"
                                    @click="quitarCarrito(slotProps.data)"
                                />
                            </template>
                    </Column>
                        </DataTable>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card">
                        <h6>Cliente</h6>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card">
                        <Button class="primary" @click="guardarPedido()">Guardar Pedido</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import productoService from "@/service/ProductoService.js"
import pedidoService from "@/service/PedidoService.js"
import { onMounted, ref } from 'vue'

export default {
    setup(){
        const productos = ref([]);
        const carrito = ref([]);

        onMounted(() => {
            listarProductos();
        })

        const listarProductos = async () => {
            const {data} = await productoService.getProductos(1, 10);
            productos.value = data.data

        }

        const addCarrito = (prod) => {
            let producto = {
                producto_id: prod.id,
                nombre: prod.nombre,
                precio: prod.precio,
                cantidad: 1
            }
            carrito.value.push(producto)

            prod.stock--;

        }

        const quitarCarrito = (prod) => {
            let posicion = carrito.value.indexOf(prod)
            carrito.value.splice(posicion, 1);
        }

        const guardarPedido = async () => {

            try{
                const p = {
                    cliente_id: 1,
                    productos: carrito.value
                }
                
                const {data} = await pedidoService.guardarPedido(p)
                console.log(data);

            }catch(e){
                console.log(e);

            }
        }

        return {
            productos,
            carrito,
            addCarrito,
            quitarCarrito,
            guardarPedido
        }        
    }
}
</script>

<style>

</style>