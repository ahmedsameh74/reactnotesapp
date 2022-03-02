import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const {dispatch} = useAuthContext()
    const logout = async () => {
        setError(null)
        setIsLoading(true)
        try {
            await projectAuth.signOut()

            dispatch({type: 'LOGOUT'})

            if(!isCancelled){
                setIsLoading(false)
                setError(null)
            }
        }catch(err){
            if(!isCancelled){
                setError(err.message)
                setIsLoading(true)
                console.log(err.message)
            }
            
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    return {logout, error, isLoading}
}