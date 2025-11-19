import { db } from './firebase';
import { doc, Timestamp, getDoc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from 'react';

const cardData = [
    {
        p: 7000,
        Daily: 231.00,
        Monthly: "6,930.00",
        background: "linear-gradient(45deg, blue, red)",
        yearly: "84,315.00"
    },
    {
        p: "16,000",
        Daily: 528.00,
        Monthly: "15,840.00",
        background: "linear-gradient(45deg, darkBlue, transparent)",
        yearly: "192,720.00"
    },
    {
        p: "30,000",
        Daily: 990.00,
        Monthly: "29,770.00",
        background: "linear-gradient(to right, #3b82f6, #6366f1, #db2777)",
        yearly: "361,315.00"
    },
    {
        p: "50,000",
        Daily: 1650.00,
        Monthly: "49,500.00",
        background: "linear-gradient(to right, #0f172a, #334155)",
        yearly: "602,250.00"
    },
    {
        p: "100,000",
        Daily: "3300.00",
        Monthly: "99,000.00",
        background: " linear-gradient(to right, #f43f5e, #db2777, #ef4444)",
        yearly: "1,204,500.00"
    },
    {
        p: "120,000",
        Daily: 231.00,
        Monthly: "6,930.00",
        background: "linear-gradient(to right, #ea580c, #572e0c, #78350f)",
        yearly: "84,315.00"
    },
    {
        p: "150,000",
        Daily: "4,950.00",
        Monthly: "148,500.00",
        background: "linear-gradient(to bottom, #db2777, #ef4444, #f97316)",
        yearly: "1,806,750.00"
    },
    {
        p: "200,000",
        Daily: "6600.00",
        Monthly: "1,98,000.00",
        background: "conic-gradient(#4f46e5, #818cf8, #c7d2fe)",
        yearly: "2,409,000.00"
    },
    {
        p: "250,000",
        Daily: "8250.00",
        Monthly: "247,500",
        background: "conic-gradient(at bottom, #831843, #a21caf, #e879f9)",
        yearly: "3,011,250.00"
    },
    {
        p: "350,000.00",
        Daily: "11,550.00",
        Monthly: "346,500.00",
        background: "linear-gradient(to left, #f97316, #e11d48, #ef4444)",
        yearly: "4,215,750.00"
    },
    {
        p: "500,000",
        Daily: "16,500.00",
        Monthly: "495,000.00",
        background: " linear-gradient(to top left, #1e293b, #6366f1, #71717a)",
        yearly: "6,022,500.00"
    },
    {
        p: "650,000",
        Daily: "24,450.00",
        Monthly: "643,500.00",
        background: "radial-gradient(ellipse at bottom left, #ea580c, #fb923c, #fed7aa)",
        yearly: "7,829,250.00"
    }, {
        p: "800,000",
        Daily: "26,400.00",
        Monthly: "792,000.00",
        background: "radial-gradient(ellipse at bottom right, #9d174d, #d946ef, #f0abfc)",
        yearly: "9,636,000.00"
    },
    {
        p: "1,000,000",
        Daily: "33,000.00",
        Monthly: "990,000.00",
        background: " linear-gradient(to bottom left, #e879f9, #4ade80, #be123c)",
        yearly: "12,045,000.00"
    },

]

function InvestmentPlan() {
    const [activeIndex, setActiveIndex] = useState(null);
    useEffect(() => {
        const dataId = localStorage.getItem("dataId");
        async function fetchBalance() {
            if (!dataId) return;
            const userRef = doc(db, "users", dataId);
            const snapshot = await getDoc(userRef);
            if (snapshot.exists()) {
                const data = snapshot.data();
                if (typeof data.packageIndex === 'number') {
                    setActiveIndex(data.packageIndex);
                }
            }
        }
        fetchBalance();
    }, []);

    async function handlePackage(packagePrice, index) {
        const dataId = localStorage.getItem("dataId");
        const userData = localStorage.getItem('user');
        if (!userData) throw new Error('User not logged in');
        const userRef = doc(db, 'users', dataId);
        await updateDoc(userRef, {
            packageBought: packagePrice,
            packageIndex: index,
            updatedAt: Timestamp.now()
        });
        setActiveIndex(index);
    }
    return (
        <>
            <div className="Container-fluid  text-white bg-dark" >
                <div className="container ">
                    <div className="pt-3 mt-5">
                        {cardData.map((data, index) => (
                            <div key={index * 2} className="card-div p-2 col-11 ms-3 rounded-5 mt-4  d-flex align-items-center justify-content-evenly" style={{ background: data.background }}>
                                <div className="details">
                                    <center>  <h3>p{index + 1}: {data.p}</h3>
                                        <h6>Daily: {data.Daily}</h6>
                                        <h6>Monthly: {data.Monthly}</h6>
                                        <h6>yearly: {data.yearly}</h6>
                                    </center>
                                </div>
                                <button
                                    className='package-btn'
                                    disabled={activeIndex === index}
                                    style={{
                                        background: activeIndex === index ? "red" : "green",
                                        opacity: activeIndex === index ? 0.6 : 1,
                                        color: "white"
                                    }}
                                    onClick={() => handlePackage(data.p, index)}
                                >{activeIndex === index ? "Package Activated" : "Invest Now"}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
export default InvestmentPlan;