import { useEffect, useRef, useState } from "react"
import { projectFirebase } from "../firebase/config"

export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIslLoading] = useState(false)
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        setIslLoading(true)
        let ref = projectFirebase.collection(collection)
        if(query){
            ref = ref.where(...query)
        }
        if(orderBy){
            ref = ref.orderBy(...orderBy)
        }
        const unsub = ref.onSnapshot((snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
            })

            setDocuments(results)
            // console.log(documents)
            setError(null)
            setIslLoading(false)
        }, (error) => {
            console.log(error)
            setIslLoading(false)
            setError('could not fetch the data')
        })
        return () => unsub()
    },[collection, query, orderBy])
    return {documents, error, isLoading}

}