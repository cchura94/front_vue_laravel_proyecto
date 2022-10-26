<template>
<div class="card">
    <p>Cliente</p>
    {{ clientes }}
    <hr>
    <p>{{ contador }}</p>
    <p>{{ esParImpar }}</p>
    <Button @click="incrementar">+</Button>
    <Button @click="decrementar">-</Button>

    <p>PINIA</p>
    <p>{{ storeContador.contador }}</p>
    <p>{{ storeContador.esParImpar }}</p>
    <Button @click="storeContador.incrementar">+</Button>
    <Button @click="storeContador.decrementar">-</Button>
</div>
</template>

<script setup>
    import {computed, ref} from 'vue'
    import { useContadorStore } from "@/stores/contador.js"

    const storeContador = useContadorStore()

    const clientes = ref([])
    const contador = ref(0)

    const incrementar = () =>{
        contador.value++;
    }

    const decrementar = () =>{
        contador.value--;
    }

    const esParImpar = computed(() => {
        if(contador.value % 2 === 0)
            return "PAR"
        return "IMPAR"
    })

</script>