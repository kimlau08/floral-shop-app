import React from 'react';
import {Route, Link, Routes, BrowserRouter as Router } from 'react-router-dom';

import Home from './Home';
import Event from './Event';
import AboutUs from './AboutUs';
import Appointment from './Appointment/Appointment';

function NavBar () {
    return (
        <div>
            <Router>
                <nav>
                <ul>
                    <li>
                    <Link to="/Home">Home</Link>
                    </li>
                    <li>
                    <Link to="/Event">Our Events</Link>
                    </li>
                    <li>
                    <Link to="/AboutUs">About Us</Link>
                    </li>
                    <li>
                    <Link to="/Appointment">Appointments</Link>
                    </li>
                </ul>
                </nav>
                <Routes>
                <Route exact path="/Home" component={Home} />

                <Route exact path="/Event" component={Event} />

                <Route exact path="/AboutUs" component={AboutUs} />

                <Route exact path="/Appointment" component={Appointment} />
                </Routes>
            </Router>

        </div>
    )
}

export default NavBar;