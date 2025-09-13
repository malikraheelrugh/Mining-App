import 'bootstrap/dist/css/bootstrap.min.css'
import { db, auth } from './firebase';
import { useState, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';

function RegisterUser() {
    const navigate = useNavigate();
    const [firebaseError, setFirebaseError] = useState("")
    const [error, setError] = useState("")
    const [isPending, startTransition] = useTransition()
    const [refrelCode, setRefrelCode] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [number, setNumber] = useState("")
    async function handleSubmit(e) {
        e.preventDefault();
        startTransition(async () => {
            let isValid = true;

            if (!number.match(/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/)) {
                isValid = false;
                setError("Enter a valid number")
            } else {
                isValid = true
                setError("")
            }
            if (isValid === true) {
                try {
                    // Register user with Firebase Auth
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const firebaseUser = userCredential.user;
                    const uid = firebaseUser.uid;
                    console.log(uid);

                    // Save additional user data in Firestore
                    let data = {
                        lastClicked: "",
                        claimBalance: "",
                        requestedWithdrawel: "",
                        packageBought: 0,
                        refrelCode: refrelCode,
                        name: userName,
                        email: email,
                        number: number,
                        Timestamp: new Date()
                    };
                    // Add document to 'users' collection (not subcollection)
                    const docRef = await addDoc(collection(db, 'users'), data);
                    // Add the generated document id to the data object
                    data.id = docRef.id;
                    localStorage.setItem("dataId", data.id)
                    console.log(data.id);

                    // await addDoc(collection(db, 'users'), data);

                    alert('Document successfully submitted!');
                    localStorage.setItem('user', JSON.stringify(data))
                    setRefrelCode("");
                    setUserName("");
                    setEmail("");
                    setPassword("");
                    setNumber("");
                    navigate("/myHomePage")
                } catch (error) {
                    console.error(error.message);
                    setFirebaseError(error.message);
                }
            } else {
                console.log("form can not be submitted");

            }
        })
    }

    return <>

        <div className="d-flex flex-column justify-content-evenly align-items-center vh-100   fs-5 fw-1"
            style={{
                backgroundColor: "hsl(39.12deg 100% 51.37%)"

            }}>
            <div className="topDiv">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-telephone-forward-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zm10.761.135a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L14.293 4H9.5a.5.5 0 0 1 0-1h4.793l-1.647-1.646a.5.5 0 0 1 0-.708" />
                </svg>
                <h1 className='mt-4 ' style={{ fontFamily: "cursive" }}>Website</h1>
            </div>
            <form className="d-flex flex-column  " onSubmit={handleSubmit}>
                <h1 className='text-center mb-3'
                    style={{ fontFamily: "fantasy" }}
                >Register</h1>

                <div className="mb-3">
                    <input
                        name="Refrel Code"
                        placeholder="Refrel Code"
                        className="form-control"
                        value={refrelCode}
                        onChange={(e) => setRefrelCode(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <input
                        name="name"
                        placeholder="Name"
                        className="form-control"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input type="email"
                        className="form-control"
                        value={email}
                        placeholder='email'
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>
                <div className="mb-3">
                    <input type="password"
                        className="form-control"
                        value={password}
                        placeholder='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </div>
                <div className="mb-3">
                    <input type="number"
                        className="form-control"
                        value={number}
                        placeholder='phone number'

                        onChange={(e) => setNumber(e.target.value)}
                    />

                </div>

                <div className="mb-3 row">
                    <button type="submit" disabled={isPending} className="btn btn-dark fw-bold col-11 ms-2 ">{isPending ? "loading..." : "Register"}</button>
                </div>
                <p>Already have a acount?
                    <strong className='text-primary'
                    >Login</strong>
                </p>


            </form>
            <div className="error-div">
                <p className='text-danger'>{error}</p>
                <p className='text-danger'>{firebaseError}</p>
            </div>
        </div>

    </>
}
export default RegisterUser;