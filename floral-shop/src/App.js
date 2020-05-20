import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


import ImageList from './components/ImageList';
import PastWorkList from './components/PastWorkList';

import Home from './components/Home';
import Event from './components/Event';
import AboutUs from './components/AboutUs';
import Appointment from './components/Appointment/Appointment';

import img1 from './assets/home_page.png';
import img2 from './assets/mom_event.jpg';
import img3 from './assets/appointment_page1.png';
import img4 from './assets/bday_event.jpg';

import HomeImg from './assets/flower-in-breeze1.gif';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state={
      calendarEventList: [
        // initial event data
        { title: "Event Now", start: new Date() }
      ],
      containerOnDisplay: "home-container"
    }

    this.swapContainerOnDisplay=this.swapContainerOnDisplay.bind(this);
    this.setContainerOnDisplay=this.setContainerOnDisplay.bind(this);
    this.getcalendarEventList=this.getcalendarEventList.bind(this);
    this.addCalendarEvent=this.addCalendarEvent.bind(this);
    this.deleteCalendarEvent=this.deleteCalendarEvent.bind(this);

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
    let i=0;
    for (i=0; i<eventList.length; i++) {
      if (eventList[i].title === eventObj.title &&
          eventList[i].start === eventObj.start ) {
        break; //found the match
      }
    }
    if (i < eventList.length) {
      //match has been found
      eventList.splice(i, 1)
    }
    
    this.setState( {calendarEventList: eventList} );
  }

  navBar() {

    return (
      
      <Router>
        <nav className="menu">
          <ul className="menu-bar">
              <li>
              <Link to={{
                      pathname: "/Home",
                      swapDisplayCallback: this.swapContainerOnDisplay,
                    }}>Home</Link>
              </li>
              <li>
              <Link to={{
                      pathname: "/Event",
                      swapDisplayCallback: this.swapContainerOnDisplay,
                    }}>Our Events</Link>
              </li>
              <li>
              <Link to={{
                      pathname: "/AboutUs",
                      swapDisplayCallback: this.swapContainerOnDisplay,
                    }}>About Us</Link>
              </li>
              <li>
                  <Link to={{
                      pathname: "/Appointment",
                      swapDisplayCallback: this.swapContainerOnDisplay,
                      getEventListCallback: this.getcalendarEventList,
                      addEventCallback: this.addCalendarEvent,
                      deleteEventCallback: this.deleteCalendarEvent
                    }}>Appointments</Link>
              </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/Home" component={Home} />

          <Route exact path="/Event" component={Event} />

          <Route exact path="/AboutUs" component={AboutUs} />

          <Route exact path="/Appointment" component={Appointment} />
        </Switch>

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
        <img className="home-img" src={HomeImg} />
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
          <Redirect to='/Home' />  
        </Router>

        <div id="home-container">
          
          <p className="shop-name">Floral Arrangement Shop</p>

          {this.displayHome()}
        </div>
      </div>
    );
  }
}

