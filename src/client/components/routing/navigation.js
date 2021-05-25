import React from 'react';
import { NavLink} from 'react-router-dom';


export const Navigation = () => (
    <nav>
        <ul>
            <li>
                <NavLink to="/homepage" activeStyle={{ color: 'green' }}>
                    Home page
                </NavLink>
            </li>
            <li>
                <NavLink to="/seasons" activeStyle={{ color: 'green' }}>
                    Stagioni
                </NavLink>
            </li>
        </ul>
    </nav>
);