<template>
  <div class="card">
    <Toolbar class="mb-4">
      <template #start>
        <Button
          label="Nuevo Producto"
          icon="pi pi-plus"
          class="p-button-success mr-2"
          @click="openNew"
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          class="p-button-danger"
          @click="confirmDeleteSelected"
          :disabled="!selectedProducts || !selectedProducts.length"
        />
      </template>

      <template #end>
        <FileUpload
          mode="basic"
          accept="image/*"
          :maxFileSize="1000000"
          label="Import"
          chooseLabel="Import"
          class="mr-2 inline-block"
        />
        <Button
          label="Export"
          icon="pi pi-upload"
          class="p-button-help"
          @click="exportCSV($event)"
        />
      </template>
    </Toolbar>

    <DataTable
      ref="dt"
      :value="products"
      :lazy="true"
      :totalRecords="totalRecords"
      :loading="loading"
      @page="onPage($event)"
      v-model:selection="selectedProducts"
      dataKey="id"
      :paginator="true"
      :rows="5"
      :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} productos"
      responsiveLayout="scroll"
    >
      <template #header>
        <div
          class="
            table-header
            flex flex-column
            md:flex-row md:justiify-content-between
          "
        >
          <h5 class="mb-2 md:m-0 p-as-md-center">Gestión Productos</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filters['global'].value"
              placeholder="Search..."
            />
          </span>
        </div>
      </template>

      <Column
        selectionMode="multiple"
        style="width: 3rem"
        :exportable="false"
      ></Column>
      <Column
        field="id"
        header="ID"
        :sortable="true"
        style="min-width: 12rem"
      ></Column>
      <Column
        field="nombre"
        header="Nombre"
        :sortable="true"
        style="min-width: 16rem"
      ></Column>
      <Column header="Image">
        <template #body="slotProps">
          <img
            src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
            :alt="slotProps.data.image"
            class="product-image"
          />
        </template>
      </Column>
      <Column
        field="precio"
        header="Precio"
        :sortable="true"
        style="min-width: 8rem"
      >
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.precio) }}
        </template>
      </Column>
      <Column
        field="categoria.nombre"
        header="Categoria"
        :sortable="true"
        style="min-width: 10rem"
      ></Column>
      <Column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="editProduct(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="confirmDeleteProduct(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>

  <Dialog
    v-model:visible="productDialog"
    :style="{ width: '450px' }"
    header="Producto"
    :modal="true"
    class="p-fluid"
  >
    <img
      src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
      :alt="product.image"
      class="product-image"
      v-if="product.image"
    />
    <div class="field">
      <label for="name">Nombre</label>
      <InputText
        id="name"
        v-model.trim="product.nombre"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !product.nombre }"
      />
      <small class="p-error" v-if="submitted && !product.nombre"
        >Name is required.</small
      >
    </div>
    <div class="field">
      <label for="description">Descripción</label>
      <Textarea
        id="description"
        v-model="product.descripcion"
        rows="3"
        cols="20"
      />
    </div>

    <div class="field">
      <label class="mb-3">Categoria</label>
      <div class="formgrid grid">
        <div
          class="field-radiobutton col-6"
          v-for="cat in categorias"
          :key="cat.id"
        >
          <RadioButton
            id="category1"
            name="category"
            :value="cat.id"
            v-model="product.categoria_id"
          />
          <label for="category1">{{ cat.nombre }}</label>
        </div>
      </div>
    </div>

    <div class="formgrid grid">
      <div class="field col">
        <label for="price">Precio</label>
        <InputNumber
          id="price"
          v-model="product.precio"
          mode="currency"
          currency="ARS"
          locale="es-AR"
        />
      </div>
      <div class="field col">
        <label for="quantity">Stock</label>
        <InputNumber id="quantity" v-model="product.stock" integeronly />
      </div>
    </div>
    {{ product }}
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="hideDialog"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-text"
        @click="saveProduct"
      />
    </template>
  </Dialog>
</template>

<script>
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import productService from "@/service/ProductoService.js";
import categoriaService from "@/service/CategoriaService.js";
import { useToast } from "primevue/usetoast";

export default {
  setup() {
    const selectedProducts = ref();
    const deleteProductDialog = ref(false);
    const deleteProductsDialog = ref(false);
    const productDialog = ref(false);
    const submitted = ref(false);
    const product = ref({});
    const dt = ref();
    const products = ref();
    const totalRecords = ref()
    const loading = ref(false)

    const categorias = ref([]);
    const lazyParams = ref({});

    const toast = useToast();

    onMounted(() => {
      listarProductos();
      listarCategorias();
      // productService.value.getProducts().then(data => products.value = data);
    });

    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const listarProductos = async () => {
      loading.value = true;
      console.log(lazyParams.value.page)

      let page = (lazyParams.value.page == null)?0:lazyParams.value.page
      let rows = (lazyParams.value.rows != undefined)?lazyParams.value.rows:10;

      const { data } = await productService.getProductos(page+1, rows);
      products.value = data.data;
      totalRecords.value = data.total

      loading.value = false;
    };

    const listarCategorias = async () => {
      const { data } = await categoriaService.getCategorias();
      categorias.value = data;
    };

    const hideDialog = () => {
      productDialog.value = false;
      submitted.value = false;
    };

    const editProduct = (prod) => {
            product.value = {...prod};
            productDialog.value = true;
        };

    const saveProduct = async () => {
      submitted.value = true;

      if (product.value.nombre.trim()) {
        if (product.value.id) {
          product.value.inventoryStatus = product.value.inventoryStatus.value
            ? product.value.inventoryStatus.value
            : product.value.inventoryStatus;
          products.value[findIndexById(product.value.id)] = product.value;
          toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Product Updated",
            life: 3000,
          });
        } else {
          // product.value.id = createId();
          // product.value.code = createId();
          // product.value.image = 'product-placeholder.svg';
          //product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
          await productService.sendProducto(product.value);
          products.value.push(product.value);
          toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Product Created",
            life: 3000,
          });
        }

        productDialog.value = false;
        product.value = {};
      }
    };

    const loadLazyData = () => {
            loading.value = true;

            setTimeout(() => {
                customerService.value.getCustomers(
                    {lazyEvent: JSON.stringify( lazyParams.value )})
                        .then(data => {
                            customers.value = data.customers;
                            totalRecords.value  = data.totalRecords;
                            loading.value = false;
                    }
                );
            }, Math.random() * 1000 + 250);
        };
        const onPage = (event) => {
            lazyParams.value = event;
            listarProductos();
        };


    const confirmDeleteSelected = () => {
      deleteProductsDialog.value = true;
    };
    const exportCSV = () => {
      dt.value.exportCSV();
    };

    const openNew = () => {
      product.value = {};
      submitted.value = false;
      productDialog.value = true;
    };

    const formatCurrency = (value) => {
      if (value)
        return value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      return;
    };

    return {
      dt,
      selectedProducts,
      deleteProductDialog,
      deleteProductsDialog,
      productDialog,
      submitted,
      product,
      confirmDeleteSelected,
      exportCSV,
      openNew,
      products,
      filters,
      categorias,
      hideDialog,
      saveProduct,
      formatCurrency,
      editProduct,
      totalRecords,
      loading,
      onPage
    };
  },
};
</script>
