import { useState, useEffect } from "react";
import { PersonCircle } from 'react-bootstrap-icons';
import { XSquareFill } from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";


function TopProfile() {
    const navigate = useNavigate()
    const [number, setnumber] = useState()
    const [popUp, setPopup] = useState(false)
    const [popupEmail, sePopupEmail] = useState()
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const data = JSON.parse(userData)
            setnumber(data.number)
            sePopupEmail(data.email)

        }
    }, []);

    return <>
        <div className="main text-white">
            <div
                className="d-flex justify-content-between bg-dark p-3"
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: "100vw",
                    zIndex: 0
                }}
            >
                <div>
                    <PersonCircle size={45} color="currentColor" onClick={() => setPopup(true)} />
                    <span className="ms-2">{number}</span>
                </div>
                <div className=" rounded-5 p-2" style={{ backgroundColor: "lightgray" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                    </svg>
                </div>
            </div>
            {popUp &&
                <div className="pop-up " style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '20px',
                    margin: "opx 50px",
                    width: "312px",
                    backgroundColor: 'aliceblue',
                    border: '1px solid #ccc',
                    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                    borderRadius: "25px",
                    display: "flex",
                    flexDirection: "column"
                }} >
                    <center>
                        <PersonCircle size={100} color="black" />                    </center>

                    <XSquareFill onClick={() => setPopup(false)} size={40} color="black" className="close-profile" />;
                    <center>
                        <p style={{ color: "black", marginTop: "10px", marginLeft: "2.5rem" }}>{popupEmail}</p>
                        <button className=" rounded-5 text-white "
                            style={{
                                background: "#F7931A",
                                fontSize: "25px",
                                border: "none",
                                height: "42px",
                                width: "190px"
                            }}
                            onClick={() => { localStorage.removeItem("user"); navigate("/register") }}
                        >Log  out</button></center>
                </div>
            }
        </div>
    </>

}
export default TopProfile;