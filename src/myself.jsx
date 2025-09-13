import { ArrowRightSquareFill } from 'react-bootstrap-icons';
import { useState, useEffect, use } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./components/firebase";
import { useOutletContext } from "react-router-dom";
function MySelf(params) {
    const { userBalance } = useOutletContext();
    const [showPopup, setShowPopup] = useState(false);
    const [name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Mobile, setMobile] = useState("")
    const [ReferralCode, setReferralCode] = useState("")
    const [Refrels, setRefrels] = useState("")
    const [amount, setAmount] = useState("")
    const [invitePop, seInvitePop] = useState(false)
    const [inviteRefrel, setInviteRefrel] = useState("")
    const [copyText, setCopyText] = useState("Copy");
    const [todayBalance, setTodayBalance] = useState("");
    useEffect(() => {

        const dataId = localStorage.getItem("dataId");
        let numPackage = 0;
        async function fetchBalance() {
            if (!dataId) return;
            const userRef = doc(db, "users", dataId);
            const snapshot = await getDoc(userRef);
            if (snapshot.exists()) {
                const data = snapshot.data();
                console.log(data);
                let myPackage = data.packageBought
                console.log(typeof myPackage);
                if (typeof myPackage === "string") {
                    let withoutComa = myPackage.replace(/,/g, '');
                    numPackage = parseFloat(withoutComa);
                } else if (typeof myPackage === "number") {
                    numPackage = myPackage;
                }
                setTodayBalance(numPackage / 100 * 3);

            }
        }
        fetchBalance();
    }, []);
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const data = JSON.parse(userData)
            setName(data.name)
            setEmail(data.email)
            setMobile(data.number)
            setReferralCode(data.refrelCode)
            setRefrels(0)
            setAmount(0)
            setInviteRefrel(data.refrelCode)
        }
    }, []);
    const dataArray = [
        {
            earning: "Today Earning",
            rs: `${todayBalance} PKR`
        },
        {
            earning: "Last Week Earning",
            rs: `${todayBalance * 7} PKR`
        },
        {
            earning: "Last Month Earning",
            rs: `${todayBalance * 30} PKR`
        },
        {
            earning: "Total Team",
            rs: "0"
        },
        {
            earning: "Today Team comission",
            rs: "0.00 PKR"
        },
        {
            earning: "Referal Rebate",
            rs: "0.00 PKR"
        },
    ]
    // Function to handle copy to clipboard

    const handleCopy = () => {
        navigator.clipboard.writeText(inviteRefrel);
        setCopyText("Copied!");
        setTimeout(() => {
            setCopyText("Copy");
            seInvitePop(false)
        }, 2000); // Reset text after 2 seconds
    };

    return <>
        <div className="container-fluid bg-dark text-white ">
            <div className="container pb-3 mt-5">

                <h1 className="text-center pt-5">Balance : {userBalance} PKR</h1>
                <div className=" row  ms-3 gap-3 mt-5">
                    {dataArray.map((data) => {
                        return <div key={data.earning} className="box-div  text-center col-5 p-3 rounded-4">
                            <h5>{data.earning}</h5>
                            <h6 className="mt-3">{data.rs}</h6>
                        </div>
                    })}
                </div>
                <ul className="funcList col-11 mt-4  " style={{ paddingBottom: "100px" }}>
                    <li onClick={() => setShowPopup(true)}>Personal Information  <ArrowRightSquareFill size={24} color="currentColor" /></li>
                    <li >Task ords <ArrowRightSquareFill size={24} color="currentColor" /></li>
                    <li>Daily Statement <ArrowRightSquareFill size={24} color="currentColor" /></li>
                    <li>Team Reports <ArrowRightSquareFill size={24} color="currentColor" /></li>
                    <li onClick={() => seInvitePop(true)}>Invite Friends <ArrowRightSquareFill size={24} color="currentColor" /></li>
                    <li>Financial Records <ArrowRightSquareFill size={24} color="currentColor" /></li>
                </ul>
                {showPopup && (
                    <div className="pop-up">
                        <h2>Profile Detail</h2>
                        <p> <strong>Name:</strong> <span>{name}</span></p>
                        <p> <strong>Email:</strong> <span>{Email}</span></p>
                        <p> <strong>Mobile:</strong> <span>{Mobile}</span></p>
                        <p> <strong>Referral code:</strong> <span>{ReferralCode}</span></p>
                        <p> <strong>Refrels:</strong> <span>{Refrels}</span></p>
                        <p> <strong>amount:</strong> <span>{amount}</span></p>
                        <button onClick={() => setShowPopup(false)} className="btn btn-danger">Close</button>
                    </div>
                )}
                {invitePop && <div className="pop-up">
                    <h2>your Refrel link : </h2>
                    <p style={{ border: "none" }}>{inviteRefrel}</p>
                    <button className="btn btn-success" onClick={handleCopy}>{copyText}</button>
                    <button onClick={() => seInvitePop(false)} className="btn btn-danger ms-3">close</button>
                </div>}
            </div>
        </div>

    </>
}
export default MySelf;