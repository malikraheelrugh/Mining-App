import { useState, useTransition } from "react";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
function LoginPage(params) {
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();

    const [email, setEmail] = useState("raheelrugh@gmail.com")
    const [password, setPassword] = useState("")
    const [loginMessage, setLoginMessage] = useState("")
    async function handleSubmit(e) {
        e.preventDefault()
        startTransition(async () => {


            let found = false;
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log("Logged in:", user.email);
                found = true;
            } catch (error) {
                setLoginMessage(`Login failed: ${error.message}`);
            }
            if (found) {
                setLoginMessage("Login successful!");
                alert("login successful")
                navigate("/myHomePage")
                setEmail("");
                setPassword("");
            }

        })
    }
    return <>
        <div className="d-flex flex-column justify-content-evenly align-items-center  vh-100  fs-5 fw-1"
            style={{
                backgroundColor: "hsl(39.12deg 100% 51.37%)"

            }}>
            <div className="topDiv">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-telephone-forward-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zm10.761.135a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L14.293 4H9.5a.5.5 0 0 1 0-1h4.793l-1.647-1.646a.5.5 0 0 1 0-.708" />
                </svg>
                <h1 className='mt-4 ' style={{ fontFamily: "monospace" }}>Website</h1>
            </div>
            {loginMessage && <div className="mt-3 text-center fw-bold ">{loginMessage}</div>}

            <form className="d-flex flex-column col-9 "
                // style={{ background: "repeating-linear-gradient(45deg, black, transparent 100px)" }}
                onSubmit={handleSubmit}>
                <h1 className='text-center mb-3' style={{ fontFamily: "fantasy" }}>Login</h1>

                <div className="mb-3">
                    <input type="email"
                        className="form-control"
                        value={email}
                        style={{ width: "100%" }}
                        placeholder='email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input type="password"
                        className="form-control"
                        value={password}
                        style={{ width: "100%" }}

                        placeholder='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3 row">

                    <button disabled={isPending} className='btn  btn-dark fw-bold col-11  ms-3'> {isPending ? "loading.." : "login"}</button>
                </div>
                <center className="d-flex flex-nowrap ms-3">Don't have an acount? <strong className='text-primary'
                    onClick={() => navigate('/register')}>Register</strong>
                </center>
            </form>


        </div>
    </>
}
export default LoginPage;