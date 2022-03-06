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
        case 'UPDATED_DOCUMENT':
            return {isLoading: false, document: action.payload, success:true, error: null}
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
            const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await ref.add({...doc, createdAt})
            dispatchIfNotCancelled({type: 'ADDED_DOCUMENT', payload: addedDocument})
            // console.log(createdAt)
            // console.log(doc.created_at.toDate())
        }catch(err){
            dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
        }
    }
    
    const updateDocument = async (id, doc) => {
        // dispatch({type: 'IS_LOADING'})
        try{
            const createdAt = timestamp.fromDate(new Date())
            // console.log(id,doc,createdAt)
            // console.log('first')
            const updatedDocument = await ref.doc(id).update({...doc, createdAt})
            // console.log(updatedDocument)
            dispatchIfNotCancelled({type: 'UPDATED_DOCUMENT', payload: updatedDocument})
        }catch(err){
            dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
            // console.log(err.message)
        }

    }

    const deleteDocument = async(id) => {
        dispatch({type: 'IS_LOADING'})
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
    
    return{ addDocument, deleteDocument,updateDocument, response }
}