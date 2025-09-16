import { useState, useEffect } from "react";
import { PersonCircle } from 'react-bootstrap-icons';
import { ArrowRightSquareFill } from 'react-bootstrap-icons';
import { useNavigate, useOutletContext } from "react-router-dom";
import "../app.css";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import WithdrawPage from "./withdrawel";
function HomePage(params) {
    const { userBalance, setuserBalance } = useOutletContext();
    const { myTodayBalance, setTodaybalance } = useOutletContext();
    const { firebaseData, setfirebaseData } = useOutletContext();
    const [showSpinners, setShowSpinners] = useState(false);
    const [time, setTime] = useState("00");
    const [mining, setMining] = useState("0.00000");
    const [isDisabled, setIsDisabled] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const dataId = localStorage.getItem("dataId");
        async function fetchBalance() {
            if (!dataId) return;
            const userRef = doc(db, "users", dataId);
            const snapshot = await getDoc(userRef);
            if (snapshot.exists()) {
                const data = snapshot.data();
                if (typeof data.claimBalance === 'number') {
                    setuserBalance(data.claimBalance);
                }
                if (data.lastClicked) {
                    const lastClickedTime = parseInt(data.lastClicked);
                    const currentTime = Date.now();
                    const timeDifference = currentTime - lastClickedTime;
                    if (timeDifference < 86400000) {
                        // 24 hours in milliseconds
                        setIsDisabled(true);
                        return;
                    }
                }
            }
        }
        fetchBalance();
    }, []);

    async function handleClaim() {
        const dataId = localStorage.getItem("dataId");
        const userRef = doc(db, "users", dataId);
        // Get the latest balance from state
        let currentBalance = userBalance;
        // Get the package value from Firestore
        const snapshot = await getDoc(userRef);
        let numPackage = 0;
        if (snapshot.exists()) {
            const data = snapshot.data();
            if (data.lastClicked) {
                const lastClickedTime = parseInt(data.lastClicked);
                const currentTime = Date.now();
                const timeDifference = currentTime - lastClickedTime;
                if (timeDifference < 86400000) {
                    // 24 hours in milliseconds
                    setIsDisabled(true);
                    return;
                }
            }
            const myPackage = data.packageBought;
            if (typeof myPackage === "string") {
                let withoutComa = myPackage.replace(/,/g, '');
                numPackage = parseFloat(withoutComa);
            } else if (typeof myPackage === "number") {
                numPackage = myPackage;
            }
            console.log(data.lastClicked);

        }
        console.log(numPackage);
        setTodaybalance(numPackage / 100 * 3);
        // Calculate new balance
        let newBalance = currentBalance + numPackage / 100 * 3;
        setuserBalance(newBalance);
        await updateDoc(userRef, {
            claimBalance: newBalance,
            lastClicked: Date.now().toString(),
        });
    }

    function logoutFunc(params) {
        setTimeout(() => {
            localStorage.removeItem("user")
            navigate("/login")
        }, 2000);
    }
    const handleMiningClick = () => {
        setShowSpinners(true);
        handleClaim();
        setTimeout(() => {
            setShowSpinners(false)
            console.log("button clicked");
        }, 60000);
        setTime(59)
        const interval = setInterval(() => {
            setMining(Math.random().toFixed(5))
            setTime(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };
    const handleCopy = () => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const data = JSON.parse(userData)
            navigator.clipboard.writeText(data.refrelCode);
        }
        alert("link copied")
    };


    return <>

        <div className="Container-fluid  text-white bg-dark">
            <div className="container ">
                <div className="main" style={{ paddingBottom: "100px", paddingTop: "80px" }}>
                    <center><h2 style={{}}>Balance : {userBalance} PKR</h2></center>
                    <div>
                        <center>
                            <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                                <div className={`spinner outer ${showSpinners ? 'animate' : ''}`} style={{ top: 0, left: 0 }} />
                                <div className={`spinner outer middle ${showSpinners ? 'animate-middle' : ''}`} />
                                <div className={`spinner outer inner ${showSpinners ? 'animate-inner' : ''}`} />
                            </div>
                            <p className="fw-500 fs-3 mt-4">{mining}</p></center>
                    </div>
                    <ul className="d-flex justify-content-around fw-bold fs-5">
                        <li><PersonCircle size={25} color="currentColor" /> 0</li>
                        <li>{myTodayBalance}PKR/h</li>
                        <li>00:00:{time}</li>
                    </ul>


                    <center> <button
                        disabled={isDisabled}
                        onClick={handleMiningClick}
                        className="btn btn-warning mt-2"
                    > {isDisabled ? "Come back tomorrow" : "Claim"}</button>
                    </center>
                    <ul className="funcList col-11 mt-4">
                        <li onClick={() => navigate("/withdraw")}>Withdrawal  <ArrowRightSquareFill size={24} color="currentColor" /></li>
                        <li>Top Up <ArrowRightSquareFill size={24} color="currentColor" /></li>
                        <li onClick={handleCopy}>Invite Friends <ArrowRightSquareFill size={24} color="currentColor" /></li>
                        <li>Vip Area <ArrowRightSquareFill size={24} color="currentColor" /></li>
                        <li>Stack <ArrowRightSquareFill size={24} color="currentColor" /></li>
                        <li onClick={() => logoutFunc()}>Logout <ArrowRightSquareFill size={24} color="currentColor" /></li>
                    </ul>
                </div>
            </div>
        </div >

    </>
}

export default HomePage;