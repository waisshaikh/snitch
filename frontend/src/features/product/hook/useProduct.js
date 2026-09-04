import { createProduct,getSellerProduct, gettAllProducte } from "../services/product.api";
import {useDispatch} from "react-redux";
import {setSellerProduct,setproducts } from "../state/product.store.js"
import { getAllProduct } from "../../../../../Backend/src/controllers/product.controller.js";



export const useProduct = ()=>{

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

    async function handelGetProduct (){

        const data = await getAllProduct()
        dispath(setproducts(data.products))
        // return data.products   
    }



    return {
        handleCreateproduct,
       
        handleGetSellerproduct,
      
        handelGetProduct
    }
}   