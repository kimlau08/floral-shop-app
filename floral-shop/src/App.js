import React, { Component } from 'react';
import './App.css';
import {Route, Link, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


import PastWorkList from './components/PastWorkList';

import Home from './components/Home';
import Event from './components/Event';
import AboutUs from './components/AboutUs';
import Appointment from './components/Appointment/Appointment';

import HomeImg from './assets/flower-in-breeze1.gif';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state={
      calendarEventList: [
        // initial event data
           //  event for debug only { title: "Event Now", start: new Date() }
      ],
      containerOnDisplay: "home-container"
    }

    this.swapContainerOnDisplay=this.swapContainerOnDisplay.bind(this);
    this.setContainerOnDisplay=this.setContainerOnDisplay.bind(this);
    this.getcalendarEventList=this.getcalendarEventList.bind(this);
    this.addCalendarEvent=this.addCalendarEvent.bind(this);
    this.deleteCalendarEvent=this.deleteCalendarEvent.bind(this);
    this.resetEventColor=this.resetEventColor.bind(this);

  }

  getcalendarEventList() {
    return ( this.state.calendarEventList );
  }
  addCalendarEvent(eventObj) {
    let eventList = this.state.calendarEventList;
    eventList.push(eventObj);
    this.setState( {calendarEventList: eventList} );
  }
  deleteCalendarEvent(eventObj) {

    let eventList = this.state.calendarEventList;
    let i = eventList.findIndex(obj => obj.title === eventObj.title && 
                            obj.start.toString() === eventObj.start.toString())
    if (i >= 0) {
      //match has been found
      eventList.splice(i, 1)
    }
    
    this.setState( {calendarEventList: eventList} );
  }
  resetEventColor(tempObj) {

    this.state.calendarEventList.foreach( obj => {
      if (obj.title === tempObj.title && 
          obj.start.toString() === tempObj.start.toString()) {
            obj.backgroundColor = ''
        }
    })
  }

  navBar() {

    return (
      
      <Router>
        <nav className="menu">
          <ul className="menu-bar">
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
          <Route exact path="/Home" element={<Home 
                      swapDisplayCallback = {this.swapContainerOnDisplay} 
          /> } />

          <Route exact path="/Event" element={ <Event 
                  swapDisplayCallback = {this.swapContainerOnDisplay} 
          />} />

          <Route exact path="/AboutUs" element={ <AboutUs
                      swapDisplayCallback = {this.swapContainerOnDisplay}
          /> } />

          <Route exact path="/Appointment" element={ <Appointment 
            swapDisplayCallback = {this.swapContainerOnDisplay}
            getEventListCallback = {this.getcalendarEventList}
            addEventCallback = {this.addCalendarEvent}
            deleteEventCallback = {this.deleteCalendarEvent}
            resetEventColorCallBack = {this.resetEventColor}
          /> } />
        </Routes>

      </Router>

    )
  }

  setContainerOnDisplay(container) {   //Do not cause render
    this.state.containerOnDisplay = container;   
  }

  swapContainerOnDisplay(toContainerId, inputProps) {   

    //turn off display of "from container" in props. display "to container" instead

    if (inputProps.location === undefined) { 
      //Came in from direct React component call instead of Router. No need to swap display

      this.setContainerOnDisplay(toContainerId); //just save the to container and return
      return;
    }

    //Look for the container element to be swapped from
    let fromContainerId=this.state.containerOnDisplay;
    let fromContainerElem=null;
    if (fromContainerId !== ""  &&  fromContainerId !== toContainerId) {
        fromContainerElem = document.getElementById(fromContainerId);
        if (fromContainerElem !== null) {

            document.getElementById(fromContainerId).style.display="none";
        }
    }

    //display to container
    let toContainerElem=document.getElementById(toContainerId);
    if (toContainerElem === null) {

      return;   //cannot find to container

    } else {
      
      //display to container
      document.getElementById(toContainerId).style.display="";
      this.setContainerOnDisplay(toContainerId); //save the to container 

    }
  }

  displayHome() {
    return (
      <div className="home-img-box">
        <img className="home-img" src={HomeImg} alt="A field or roses"/>
        <p className="home-text">“Every flower is a soul blossoming in nature.” – Gerard De Nerval</p>
      </div>
    )
  }

  render() {

    if (PastWorkList === undefined) {
      return <div></div>;
    }


    return (
      <div className="App">
        
        {this.navBar()}

        <Router>
          <Navigate to='/Home' />  
        </Router>

        <div id="home-container">
          
          <p className="shop-name">Floral Arrangement Shop</p>

          {this.displayHome()}
        </div>
      </div>
    );
  }
}

