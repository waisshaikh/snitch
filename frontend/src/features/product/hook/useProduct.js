import { createProduct,getSellerProduct } from "../services/product.api";
import {useDispatch} from "react-redux";
import {setSellerProduct} from "../state/product.store.js"



export const userProduct = ()=>{

    const dispath = useDispatch()

    
    async function handleCreateproduct(formData) {
        const data = await createProduct(formData)
        return data.product
        
    }

     async function handleGetSellerproduct() {
        const data = await getSellerProduct()
        dispath(setSellerProduct(data.products))

        return data.products
        
    }

    return {handleCreateproduct,handleGetSellerproduct}
}   