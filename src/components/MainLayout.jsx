import { Outlet } from "react-router-dom";
import TopProfile from './TopProfile.jsx';
import NavLink from './NavLink.jsx';
import { useState } from 'react';

function MainLayout() {
    const [userBalance, setuserBalance] = useState(0);
    const [myTodayBalance, setTodaybalance] = useState(0);
    const [firebaseData, setfirebaseData] = useState(0);
    return (
        <div>
            <TopProfile />
            <Outlet context={{ userBalance, setuserBalance, myTodayBalance, setTodaybalance, firebaseData, setfirebaseData }} />
            <NavLink />
        </div>
    );
}

export default MainLayout;
