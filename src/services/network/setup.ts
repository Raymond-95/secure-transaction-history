import { create } from 'apisauce'
import BuildConfig from "react-native-config"

export const namespace = '/api'

// Apisauce instance
export const instance = create({
    baseURL: BuildConfig.API_BASE_URL + namespace,
    timeout: 30 * 1000,
    headers: {
        'Accept': 'application/json'
    }
})