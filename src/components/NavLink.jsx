import { HouseDoorFill } from 'react-bootstrap-icons';
import { Stack } from 'react-bootstrap-icons';
import { BootstrapReboot } from 'react-bootstrap-icons';
import { PersonFill } from 'react-bootstrap-icons';
import { ArrowsCollapseVertical } from 'react-bootstrap-icons';
import { NavLink as RouterNavLink } from "react-router-dom";

function NavLink(params) {

    return (
        <ul className="navLink d-flex p-3 m-4 rounded-5 justify-content-evenly">
            <li>
                <RouterNavLink to="/myHomePage" className={({ isActive }) => isActive ? "active-nav" : ""}>
                    <HouseDoorFill size={24} color="currentColor" />
                </RouterNavLink>
            </li>
            <li>
                <RouterNavLink to="/plan" className={({ isActive }) => isActive ? "active-nav" : ""}>
                    <ArrowsCollapseVertical size={24} color="currentColor" />                </RouterNavLink>
            </li>
            <li>
                <RouterNavLink to="/stack" className={({ isActive }) => isActive ? "active-nav" : ""}>
                    <Stack size={24} color="currentColor" />                 </RouterNavLink>
            </li>
            <li>
                <RouterNavLink to="/rebate" className={({ isActive }) => isActive ? "active-nav" : ""}>
                    <BootstrapReboot size={24} color="currentColor" />
                </RouterNavLink>
            </li>
            <li>
                <RouterNavLink to="/myself" className={({ isActive }) => isActive ? "active-nav" : ""}>
                    <PersonFill size={24} color="currentColor" />
                </RouterNavLink>
            </li>

        </ul>
    );
}
export default NavLink;