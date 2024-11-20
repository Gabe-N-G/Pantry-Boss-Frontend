import api from "./apiconfig.js";
import handleAxiosError from "./errorHandler.js";


export const getPantries= async() => {
    try {
        const response= await api.get("/pantries/");
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}
export const getFloorPantries= async(floorId) => {
    try {
        const response = await api.get(`/pantries/?floor=${floorId}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error)
    }
}

