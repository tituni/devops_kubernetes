import { useState} from 'react'


const NotesList = ({notes, submitNew, deleteNote, updateNote}) => {
    const [newNote, setNewNote] = useState("")
    const [newImportance, setNewImportance] = useState(false)
    return (
        <div className='noteslist'>
            <h2>Notes:</h2>
            <form onSubmit={e=>{submitNew(e, newNote, newImportance);
                                setNewNote("");
                                setNewImportance(false)}}>
            <input onChange={e=>{if(e.target.value.length < 140){setNewNote(e.target.value)}}} 
                   id="newNote" 
                   value={newNote}/>
            <input onChange={()=>setNewImportance(!newImportance)} 
                   id='importance'
                   type="checkbox"
                   checked={newImportance}/>
            <input type='submit' />
            </form>
            <ul>
            {notes.map((n)=> <li onClick={()=>updateNote(n.id)} className={n.important?'important':'normal'} key={n.id}>{n.content} <button className='deletebutton' onClick={e=>deleteNote(n.id,e)}>Delete</button></li>)}
            </ul>
        </div>
    )
}

export default NotesList