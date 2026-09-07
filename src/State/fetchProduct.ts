// import { error } from "console"
import axios from "axios"
import { BASE_URL } from "../config/Api"
const api = `${BASE_URL}/products`
const fetchProducts = async() => {
    try{
        const response = await axios.get(api)
        console.log("response", response)
    } catch(error) {
        console.error(error)
    }
}

export default fetchProducts;