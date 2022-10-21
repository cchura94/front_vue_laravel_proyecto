<template>
  <div class="card">
    <ProgressBar mode="indeterminate" style="height: 0.5em" v-if="cargando" />

    <DataTable :value="categorias" responsiveLayout="scroll">
      <Column
        v-for="col of columnas"
        :field="col.campo"
        :header="col.cabecera"
        :key="col.campo"
      ></Column>

      <Column :exportable="false" style="min-width: 8rem" field="action">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="
              this.$router.push({
                name: 'EditarCategoria',
                params: { id: slotProps.data.id },
              })
            "
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="confirmDeleteCategoria(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
</template>

<script>
import { ref, onMounted } from "vue";
import categoriaService from "@/service/CategoriaService.js";

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

export default {
  setup() {
    const confirm = useConfirm();
    const toast = useToast();

    const categorias = ref([]);
    const cargando = ref(false);

    const columnas = [
      { campo: "id", cabecera: "CODIGO" },
      { campo: "nombre", cabecera: "NOMBRE" },
      { campo: "detalle", cabecera: "DETALLE" },
      { campo: "action", cabecera: "GESTION" },
    ];

    onMounted(() => {
      listarCategorias();
    });

    const listarCategorias = async () => {
      cargando.value = true;

      const { data } = await categoriaService.getCategorias();
      categorias.value = data;

      cargando.value = false;
    };

    const confirmDeleteCategoria = (prod) => {
      confirm.require({
        message: "¿Está Seguro de eliminar la Categoria?",
        header: "Confirmar Eliminación",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        accept: async () => {
          try {
            await categoriaService.deleteCategoria(prod.id);
            
            listarCategorias()

            toast.add({
              severity: "info",
              summary: "Eliminado",
              detail: "Categoria Eliminada",
              life: 3000,
            });
          } catch (error) {
            toast.add({
              severity: "error",
              summary: "Error al eliminar",
              detail: "Falló eliminación",
              life: 3000,
            });
          }
        },
        reject: () => {
          toast.add({
            severity: "error",
            summary: "Cancelado",
            detail: "Cancelo la eliminación",
            life: 3000,
          });
        },
        onHide: () => {
          /*this.$toast.add({
            severity: "error",
            summary: "Hide",
            detail: "You have hidden",
            life: 3000,
          }); */
        },
      });
    };

    return {
      categorias,
      columnas,
      cargando,
      confirmDeleteCategoria,
    };
  },
};
</script>

<style>
</style>