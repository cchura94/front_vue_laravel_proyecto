<template>
  <Toolbar>
    <template #start>
      <h3>Gestión Categoria</h3>
    </template>
    <template #end>
      <Button
        label="Lista Categorias"
        icon="pi pi-plus"
        class="mr-2"
        @click="redireccionar('ListaCategoria')"
      />
      <Button
        label="Nueva Categoria"
        icon="pi pi-plus"
        class="mr-2"
        @click="redireccionar('NuevaCategoria')"
      />
    </template>
  </Toolbar>
  <router-view />
</template>

<script>
export default {
  methods: {
    redireccionar(ruta) {
      this.$router.push({ name: ruta });
    },
  },
};
</script>

<style>
</style>