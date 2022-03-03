import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const {dispatch} = useAuthContext()
    const history = useHistory()

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsLoading(true)

        try{
           const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        //    console.log(res.user)

           if(!res){
               throw new Error('could not complete signup')
           }
           await res.user.updateProfile({displayName})
           await projectAuth.currentUser.sendEmailVerification({
               url: 'https://notestest-359bf.web.app/login'
           })
        //    dispatch({type: 'WAIT_VERIFY', payload: null, authIsReady: false})
        //    console.log(res.user)
        //    const ress = await res.user.emailVerified
        //    console.log(ress)
           history.push('/login')
        //    setIsLoading(true)
        //    setError('please verify your mail')
           if(!isCancelled){
            setIsLoading(false)
            setError(null)
           }
        //    if(res.user.emailVerified){
        //        setIsLoading(false)
        //        setError(null)
        //     dispatch({type: 'LOGIN', payload: res.user})
            

            

        //    }
           
        }catch(err){
            setError(err.message)
            setIsLoading(false)
            if(!isCancelled){
            console.log(err.message)
            setError(err.message)
            setIsLoading(false)
            }

        }
    }
    useEffect(() => {
        return setIsCancelled(true)
    }, [])

    return {error, isLoading, signup}
}