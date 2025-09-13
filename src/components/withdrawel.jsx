import { useState, useTransition } from "react";
import { db } from "./firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
function WithdrawPage(params) {
    const [withdarwMessage, setWithdrawMessage] = useState(0)
    const [message, setMessage] = useState(false)
    const [cancel, setCancel] = useState("")
    const [withtransition, startTransition] = useTransition()
    const [cancelTransition, startCancelTransition] = useTransition()
    const dataId = localStorage.getItem("dataId")
    const userRef = doc(db, "users", dataId)

    async function withdrawSubmit(e) {
        e.preventDefault()
        console.log(userRef);
        const doc = await getDoc(userRef)

        console.log(e.target[0].value);
        startTransition(async () => {
            if (doc.exists()) {
                console.log(doc.data());
                const data = doc.data()
                if (data.claimBalance < e.target[0].value) {
                    alert("insufficient balance")
                    return
                }
            }
            await updateDoc(userRef, {
                requestedWithdrawel: e.target[0].value,
            })
            setWithdrawMessage(e.target[0].value)
            setMessage(true)
            setCancel("pending ")
            e.target[0].value = ""
        })
    }


    function cancelBtn(params) {
        startCancelTransition(async () => {
            await updateDoc(userRef, {
                requestedWithdrawel: "cancelled",
            })
        })
        setCancel("cancelled")
    }

    return <>
        <div className="bg-dark vh-100 text-white">
            <center>
                <h1 className="mt-5 pt-5">
                    Withdraw cash</h1>
                <form className="d-flex flex-column col-8 gap-3 mt-3" onSubmit={withdrawSubmit}>
                    <input className="p-2 rounded-3"
                        onChange={(e) => e.target.value}
                        type="number"
                        placeholder="Enter an amount "
                    />
                    <button type="submit" disabled={withtransition} className="btn btn-success">{withtransition ? "loading..." : "withdraw"}</button>
                    <button type="button" disabled={cancelTransition} onClick={cancelBtn} className="btn btn-success">{cancelTransition ? "loading ..." : "cancel"}</button>
                </form>

            </center>
            {message &&
                <center>
                    <div className="message text-dark col-10 bg-white mt-4 p-1">
                        <p>
                            you withdraw request for <strong className="text-primary">{withdarwMessage} </strong>is {cancel} now
                        </p> </div></center>}
        </div>

    </>
}
export default WithdrawPage;