import styles from '../create/Create.module.css'
import { useEffect, useState } from "react"
import { useFirestore } from '../../hooks/useFirestore'
import { useTheme } from '../../hooks/useTheme'
import { useHistory } from 'react-router-dom'
import  ReactDOM  from 'react-dom'

export default function Update({id, uid, children, handleClose}) {
    const [title, setTitle] = useState('')
    const [sub, setSub] = useState('')
    // const [createdAt, setCreatedAt] = useState('')
    const {updateDocument, response } = useFirestore('notes')
    const {color, mode} = useTheme()
    const history = useHistory()
    // const [modal, setModal] = useState(update)


    const handleSubmit = (e) => {
        e.preventDefault()
        // setUpdate(false)
        // setCreatedAt(new Date().toLocaleString())
        // console.log(response)
        updateDocument(id,{
            // title: 'updated'
            sub,
            title,
            uid,
            // createdAt
        })
        // setUpdate(prevUpdate =>)
    }
    // const handleClick = () =>{
      // setUpdate(false)
    // }

    useEffect(() => {
        if(response.success){
            setTitle('')
            setSub('')
            // console.log(response)
            // setModal(false)
            // history.push('/')
            handleClose()
        }
    },[response.success, history])

  return ReactDOM.createPortal((
    <div className={styles.update} style={{background: mode === 'light' ? '#dfdfdf' : '#333', border: mode === 'light' ? '1px solid #333' : '1px solid #dfdfdf'}}>
    {children}
        <h3 style={{color: mode === 'light' ? '#333' : '#e0e0e0'}}>Edit</h3>
    <form onSubmit={handleSubmit}>
        <label>
            <span style={{color: mode === 'light' ? '#333' : '#e0e0e0'}}>Title:</span>
            <input
             type='text'
             required
             onChange = {(e) =>setTitle(e.target.value)}
             value = {title}            
             />
        </label>
        <label>
        <span style={{color: mode === 'light' ? '#333' : '#e0e0e0'}}>Subject:</span>
        <textarea
          onChange={(e) => setSub(e.target.value)}
          value={sub}
          required
        />
      </label>
      <button
      style={{background: color}}
      >update</button>
      {/* <button
      onClick={handleClick}
      style={{background: color}}
      >close</button> */}
    </form>
    </div>
  ), document.body)
}
