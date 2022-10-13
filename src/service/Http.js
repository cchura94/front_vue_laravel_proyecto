import axios from "axios"

export const urlBase = "http://127.0.0.1:8000/api";

export const http = () => {

    // configuración de Interceptor
    const interceptor = axios.create({
        baseURL: urlBase,
        headers: {
            'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            'Authorization': 'Bearer abcxyz*******:::::::SDfsdfsdf'
        },
        timeout: 30000
    });

    // errores
    
    return interceptor;
}
