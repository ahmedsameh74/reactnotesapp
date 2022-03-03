import styles from './Create.module.css'
import { useEffect, useState } from "react"
import { useFirestore } from '../../hooks/useFirestore'
import { useTheme } from '../../hooks/useTheme'
import { useHistory } from 'react-router-dom'

export default function Create({uid}) {
    const [title, setTitle] = useState('')
    const [sub, setSub] = useState('')
    // const [createdAt, setCreatedAt] = useState('')
    const {addDocument, response } = useFirestore('notes')
    const {color, mode} = useTheme()
    const history = useHistory()


    const handleSubmit = (e) => {
        e.preventDefault()
        // setCreatedAt(new Date().toLocaleString())
        addDocument({
            uid,
            title,
            sub,
            // createdAt
        })
    }

    useEffect(() => {
        if(response.success){
            setTitle('')
            setSub('')
            history.push('/')
        }
    },[response.success, history])

  return (
    <div className={styles.create}>
        <h3 style={{color: mode === 'light' ? '#333' : '#e0e0e0'}}>Add a note</h3>
    <form onSubmit={handleSubmit}>
        <label>
            <span >Title:</span>
            <input
             type='text'
             required
             onChange = {(e) =>setTitle(e.target.value)}
             value = {title}            
             />
        </label>
        <label>
        <span>Subject:</span>
        <textarea
          onChange={(e) => setSub(e.target.value)}
          value={sub}
          required
        />
      </label>
      <button
      style={{background: color}}
      >Add Note</button>
    </form>
    </div>
  )
}
