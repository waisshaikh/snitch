import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../hook/useProduct'


const Home = () => {
    const products = useSelector (state=>state.product.products)
    const {handelGetProduct} = useProduct()

    useEffect(()=>{
        handelGetProduct()
    },[])

    console.log(products);
    
  return (
    <div>Home</div>
  )
}

export default Home
