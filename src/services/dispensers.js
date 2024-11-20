import api from "./apiconfig.js";
import handleAxiosError from "./errorHandler.js";


export const getDispensers = async () => {
    try {
        const response = await api.get("/dispensers/")
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getPantryDispensers = async (pantryId) => {
    try {
        const response= await api.get(`/dispensers/?pantry=${pantryId}`)
        return response.data;
    } catch (error) {
        handleAxiosError(error );
    }
}

export const simulateIotSensor = async (id) => {
    try {
        const response = await api.post(`/dispensers/${id}/update-level/`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}