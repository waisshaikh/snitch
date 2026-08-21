import {setUser,setloading,setError} from "../state/auth.slice.js";
import { register } from "../services/auth.api.js";
import {useDispatch} from "react-redux" 



export const  useAuth = ()=>{

    const dispatch = useDispatch()

    async function handleRegister({email,contact,password,fullname, isSeller=flase}) {

        const data = await register({email,contact,password,fullname , isSeller })

        dispatch(setUser(data.user))
        

        
    }

    return{}
}
