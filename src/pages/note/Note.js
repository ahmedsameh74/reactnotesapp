import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { projectFirebase } from '../../firebase/config'
// import { useCollection } from '../../hooks/useCollection'
import { useTheme } from '../../hooks/useTheme'
import styles from './Note.module.css'
import Update from './Update'
import Edit from '../../assest/editing.png'
import Delete from '../../assest/delete.svg'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'
// import {
//   FacebookShareButton,
//   GooglePlusShareButton,
//   LinkedinShareButton,
//   TwitterShareButton,
//   WhatsappShareButton,
//   EmailShareButton,
// } from 'react-share';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {} from '@fortawesome/free-solid-svg-icons'

export default function Note() {
  const {deleteDocument} = useFirestore('notes')
  const {id} = useParams()
  const [note, setNote] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsloading] = useState(false)
  const {mode, color} = useTheme()
  const [update, setUpdate] = useState(false)
  const history = useHistory()
  
  useEffect(() => {
    setIsloading(true)
    const unsub =  projectFirebase.collection('notes').doc(id).onSnapshot((doc) => {
      if(doc.exists){
        setIsloading(false)
        setNote(doc.data())
        // console.log(doc.data())
      }else{
        setIsloading(false)
        setError('could not fetch this note')
      }
    })
    return () => unsub()
  },[id])
  const handleClose = () => {
    setUpdate(false)
  }
  const handleDelete = () => {
    deleteDocument(id)
    history.push('/')
  }
  // const handlesubmit = () => {
    // console.log(note.uid)

  // }
  // console.log(projectFirebase.collection('notes'))
// const handleClick = () => {
//   projectFirebase.collection('notes').doc(id).update({
//     title: 'new'
//   })
// }

  return (
    <div className={styles.note} style={{background: mode === 'light' ? '#fff' : '#555'}}>
    {error && <p className='error' style={{color: mode === 'light' ? '#333' : 'crimson'}}>{error}</p>}
    {isLoading && <p className='loading' style={{color: mode === 'light' ? '#333' : '#fff'}}>loading...</p>}
    {note && (
      <>
      <div className={styles.icons}>
      <img src={Edit} alt='edit' style={{filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)'}} onClick={() => setUpdate(true)} />
        <img src={Delete} alt='edit' style={{filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)'}} onClick={handleDelete} />
      </div>
        <h2 style={{color: mode === 'light' ? '#333' : '#e0e0e0'}}>{note.title}</h2>
        <span>Created at: {note.createdAt.toDate().toLocaleString()}</span>
        <hr style={{background: mode === 'light' ? '#dad9d9' : '#484848'}}/>
        <p style={{color: mode === 'light' ? '#333' : '#e0e0e0'}}>{note.sub}</p>
        {/* <button className='btn' style={{background: `${color}`, color: '#fff'}} >update</button> */}
        {update && <Update id={id} uid={note.uid} 
        handleClose = {handleClose}
        // update={update}
        >
        <button className={styles.btn} style={{background: `${color}`, color: '#fff'}} onClick={() => setUpdate(false)}>X</button>
        </Update>}
      </>
    )}

    </div>
  )
}
