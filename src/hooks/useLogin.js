import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const {dispatch} = useAuthContext()
    // const history = useHistory()

    const login = async (email, password) => {
        setError(null)
        setIsLoading(true)
        try{
            const res = await projectAuth.signInWithEmailAndPassword(email, password)
            if(res.user.emailVerified){
                setIsLoading(false)
                dispatch({type : 'LOGIN', payload: res.user})
                // history.push('/')
                 if(!isCancelled){
                     setIsLoading(false)
                     setError(null)
                 }
            }else{
                setIsLoading(false)
                setError('please verify you email')
            }
        }catch(err){
            if(!isCancelled){
                setError(err.message)
                setIsLoading(false)
                console.log(err.message)
            }
        }
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    return {login, error, isLoading}
}