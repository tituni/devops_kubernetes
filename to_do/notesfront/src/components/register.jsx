import { useState } from "react"

const Register = ({registerHandler}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    return (
        <>
        <h2>Register:</h2>
        <form className="userform" onSubmit={e=>registerHandler(e, {username:username, password:password, email:email})}>
            <>Username:
            <input onChange={e=>setUsername(e.target.value)} id="rusername" type="text" value={username} required/></>
            <>Password:
            <input onChange={e=>setPassword(e.target.value)} id="rpassword" type="password" value={password} required/></>
            <>Email:
            <input onChange={e=>setEmail(e.target.value)} id="remail" type="text" value={email} required/></>
            <input type="submit" id="rsubmitbutton"/>
        </form>
        </>
    )
}

export default Register;