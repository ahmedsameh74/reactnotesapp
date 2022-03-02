import { useReducer, useEffect, useState } from "react";
import { projectFirebase, timestamp } from "../firebase/config";


let initialState = {
    document: null,
    isLoading: false,
    error: null,
    success: null
}
const firestoreReducer = (state, action) => {
    switch (action.type){
        case 'IS_LOADING':
            return {isLoading: true, document: null, success: false, error: null}
        case 'ADDED_DOCUMENT':
            return {isLoading: false, document: action.payload, success: true, error: null}
        case 'DELETED_Document':
            return {isLoading: false, document: null, success: true, error: null}
        case 'ERROR':
            return {isLoading: false, document: null, success: false, error: action.payload}
        default:
            return state
    }
}
export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    const ref = projectFirebase.collection(collection)
    // console.log(ref)

    const dispatchIfNotCancelled = (action) => {
        if(!isCancelled){
            dispatch(action)
        }
    }

    const addDocument = async (doc) => {
        dispatch({type: 'IS_LOADING' })
        try{
            const addedDocument = await ref.add({...doc})
            dispatchIfNotCancelled({type: 'ADDED_DOCUMENT', payload: addedDocument})
            // console.log(doc.created_at.toDate())
        }catch(err){
            dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
        }

    }
    

    const deleteDocument = async(id) => {
        dispatch({type: 'IS_PENDING'})
        try{
            await ref.doc(id).delete()
            dispatchIfNotCancelled({type: 'DELETED_DOCUMENT'})
        }catch(err){
            dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
        }
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    
    return{ addDocument, deleteDocument, response }
}