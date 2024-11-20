import api from "./apiconfig.js";
import handleAxiosError from "./errorHandler.js";

export const getUserFloors = async () => {
    const userId = localStorage.getItem("userId");
    const urlPath = `/floors/?user_id=${userId}`;
    try {
    const response = await api.get(urlPath, );
    return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}