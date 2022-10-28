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
        <DataTable
          :value="productos"
          :paginator="true"
          :rows="10"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        >
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
            <h6>Cliente:</h6>
            <div v-if="cliente.id">
                <h6>NOMBRE: {{ cliente.nombre_completo }}</h6>
                <h6>CI/NIT: {{ cliente.ci_nit }}</h6>
                <h6>TELEFONO: {{ cliente.telefono }}</h6>
            </div>
            <div v-else>
                <h6>Buscar o Registrar Cliente</h6>
            </div>
            <div>
                <InputText type="text" v-model="cliente.ci_nit" />
                 <Button class="p-button-info" @click="buscarCliente()">buscar</Button>
                <Button class="p-button-success" @click="nuevoCliente()">NUEVO CLIENTE</Button>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="card">
            <Button class="primary" @click="guardarPedido()"
              >Guardar Pedido</Button
            >
          </div>
        </div>
      </div>
    </div>
  </div>

        <Dialog header="Nuevo Cliente" v-model:visible="displayModalCliente" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true" class="p-fluid">
            <div class="field">
                <label for="name">Nombre Completo</label>
                <InputText id="name" v-model.trim="cliente.nombre_completo" required="true" autofocus :class="{'p-invalid': submitted && !product.name}" />
                
            </div>
            <div class="field">
                <label for="ci_nit">CI / NIT</label>
                <InputText id="ci_nit" v-model.trim="cliente.ci_nit" required="true" autofocus :class="{'p-invalid': submitted && !product.name}" />
            </div>
            <div class="field">
                <label for="telefono">TELEFONO</label>
                <InputText id="telefono" v-model.trim="cliente.telefono" autofocus :class="{'p-invalid': submitted && !product.name}" />
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
                <Button label="Guardar" icon="pi pi-check" @click="guardarCliente" autofocus />
            </template>
        </Dialog>

</template>

<script>
import productoService from "@/service/ProductoService.js";
import pedidoService from "@/service/PedidoService.js";
import clienteService from "@/service/ClienteService.js"

import { onMounted, ref } from "vue";

export default {
  setup() {
    const productos = ref([]);
    const carrito = ref([]);
    const cliente = ref({})
    const displayModalCliente = ref(false)
    const buscar = ref('')

    onMounted(() => {
      listarProductos();
    });

    const listarProductos = async () => {
      const { data } = await productoService.getProductos(1, 10);
      productos.value = data.data;
    };

    const addCarrito = (prod) => {
      let producto = {
        producto_id: prod.id,
        nombre: prod.nombre,
        precio: prod.precio,
        cantidad: 1,
      };
      carrito.value.push(producto);

      prod.stock--;
    };

    const quitarCarrito = (prod) => {
      let posicion = carrito.value.indexOf(prod);
      carrito.value.splice(posicion, 1);
    };

    const guardarPedido = async () => {
      try {
        const p = {
          cliente_id: cliente.value.id,
          productos: carrito.value,
        };

        const { data } = await pedidoService.guardarPedido(p);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };

    const nuevoCliente = () => {
        displayModalCliente.value = true

    }

    const buscarCliente = async () => {
        try{
            buscar.value = cliente.value.ci_nit;
            const {data} = await clienteService.buscarCliente(buscar.value);
                console.log(data)
                if(data.id){
                    cliente.value = data
                }else{
                    cliente.value ={
                        ci_nit: cliente.value.ci_nit
                    }
                }

        }catch(e){
            console.log(e)
        }

    }

    const guardarCliente = async () => {
        try{
            const {data} = await clienteService.sendCliente(cliente.value);
            if(data){
                cliente.value = data
                displayModalCliente.value = false
            }else{
                cliente.value = null
            }

        }catch(e){
            console.log(e)
        }
    }

    return {
      productos,
      carrito,
      cliente,
      displayModalCliente,
      addCarrito,
      quitarCarrito,
      guardarPedido,
      nuevoCliente,
      buscarCliente,
      guardarCliente,
      buscar
    };
  },
};
</script>

<style>
</style>