import { useState } from "react"

const Login = ({loginHandler}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    return (
        <>
        <h2>Login:</h2>
        <form className="userform" onSubmit={e=>loginHandler(e, {username:username, password:password})}>
            <>Username:
            <input onChange={e=>setUsername(e.target.value)} id="lusername" type="text" value={username} required/></>
            <>Password:
            <input onChange={e=>setPassword(e.target.value)} id="lpassword" type="password" value={password} required/></>
            <input type="submit" id="lsubmitbutton"/>
        </form>
        </>
    )
}

export default Login;