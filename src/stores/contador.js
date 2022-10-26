import { defineStore } from 'pinia'

export const useContadorStore = defineStore({
    id: "Contador",
    state: () => ({
        contador: 0
    }),    
    actions: {
        incrementar(){
            this.contador++;
        },
        decrementar(){
            this.contador--;
        }
    },
    getters: {
        esParImpar: (state) => {
            if(state.contador % 2 === 0)
                return "PAR"
            return "IMPAR"
        }
    }
})