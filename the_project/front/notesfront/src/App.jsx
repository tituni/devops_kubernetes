import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import NotesList from './components/NotesList'
import Login from './components/login'
import Register from './components/register'
import notesService from './services/notesservice'

const loginURL = '/api/login'
const registerURL = '/api/register'

const App = () => {
  const [notes, setNotes] = useState([])
  const [errorMessage, setErrorMessage ]=useState("")
  const [message, setMessage ]=useState("")
  const [user, setUser] = useState(null);  
  const [togglelogin, setToggleLogin] = useState(false);
  
const userHook = () => {
    const loggedUserJSON = window.localStorage.getItem('notesdemouser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      notesService.setToken(user.token)
    }
  }

  const startHook = () => {
  /*  if (user === null) {
      return
    }*/
    notesService.getAll()
    .then((promise)=> {
        setNotes(promise)
    })
    .catch(()=>{
      setErrorMessage("start backend")
    })
  }

  //useEffect(userHook,[]) 
  useEffect(startHook, [user]) 
 
  const errorMessageHook = () => {
    if(errorMessage !== ""){
      const timer = setTimeout(()=>setErrorMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }

  useEffect(errorMessageHook, [errorMessage]);

  const messageHook = () => {
    if(message !== ""){
      const timer = setTimeout(()=>setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }

  useEffect(messageHook, [message]);

  const newNote = (e, content, isImportant) => {
    e.preventDefault() 
    const testNote = {
      content: content,
      important: isImportant,
      date: new Date().toISOString()
    }
   notesService.add(testNote)
   .then ((promise)=> {
     setNotes(notes.concat(promise)) 
    }) 
    .catch(()=>{
      setErrorMessage("error in adding note")
    })
  }

  const deleteNote = (id, e) => {
    e.stopPropagation()
    notesService.remove(id)
    .then (()=> {
      setNotes(notes.filter(n=> n.id != id)) 
    }) 
    .catch(()=>{
      setErrorMessage("error in deleting note")
    })
  }

  const changeImportance = (id) => {
    const tempNote = notes.find((n)=> n.id == id)
    const updatedNote = {...tempNote, important: !tempNote.important}

    notesService.update(id, updatedNote)
    .then (()=> {
      setNotes(notes.map(n => n.id == id ? updatedNote : n))
    })
    .catch(()=>{
      setErrorMessage("error in updating note")
    })
  }

  const loginHandler = (e, userdata) => {
    e.preventDefault();
    axios.post(loginURL, userdata)
    .then(response => {
      setUser(response.data)
      window.localStorage.setItem('notesdemouser', JSON.stringify(response.data))
      notesService.setToken(response.data.token)
      setMessage("login successful")
    })
    .catch(()=>{
      setErrorMessage("login failed")
    })
  }

  const registerHandler = (e, userdata) => {
    e.preventDefault();
    axios.post(registerURL, userdata)
    .then(() => {
      setMessage("register successful")
      setToggleLogin(true) 
    })
    .catch(()=>{
      setErrorMessage("register failed")
    })
  }

const mylogout = () => {
  window.localStorage.removeItem('notesdemouser')
  window.location.reload();
}
  
  return (
    <>
      {/* <div className='error'>{errorMessage}</div> 
      <div className='normalmessage'>{message}</div> 
       <h1 className='appname'>My NotesApp</h1> 
     {!user && togglelogin && <Login loginHandler={loginHandler}/>}
     {!user && !togglelogin && <Register registerHandler={registerHandler}/>}
     {!user && <button className="togglebutton" onClick={()=>setToggleLogin(!togglelogin)}>
        {togglelogin ? "Not registered yet" : "I have an account"}
      </button>}
      {user &&  */}
                <> 
                  <img className="frontimage" src="/image"/>
                  <NotesList notes={notes} 
                    submitNew={newNote} 
                    deleteNote={deleteNote} 
                    updateNote={changeImportance}/>
                  {/* <button onClick={mylogout}>Logout</button> */}
                </>
      {/* } */}
    </>
  )
}

export default App
