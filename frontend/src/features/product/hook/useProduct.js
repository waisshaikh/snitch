import { createProduct,getProductById,getSellerProduct, gettAllProducte } from "../services/product.api";
import {useDispatch} from "react-redux";
import {setSellerProduct,setproducts} from "../state/product.store.js"



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

        const data = await gettAllProducte()
        dispath(setproducts(data.products))
        return data.products   
    }

    async function handleGetProductByid(productId) {
        const data = await getProductById(productId)
        return data.product

        
    }



    return {
        handleCreateproduct,
       
        handleGetSellerproduct,
      
        handelGetProduct,

        handleGetProductByid
    }
}   
