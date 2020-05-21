import React, { Component } from 'react';
import './Appointment.css';

import { Redirect } from 'react-router-dom';

import axios from 'axios';
import config from '../../config/config';
import CalendarApp from './CalendarApp';

let tempEvents=[];
let tempDeletedEvents=[];
export default class Appointment extends Component {

    constructor(props) {
        super(props);
        this.state={name: "", 
                    email: "",
                    phone: "",
                    dateTime: "",
                    occasion: "",
                    quantity: 0,

                    bookingList: [],
                
                    response: {},
                    redirectToHome: false };

        this.handleNameChange=this.handleNameChange.bind(this);
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.handlePhoneChange=this.handlePhoneChange.bind(this);
        this.handleDateTimeChange=this.handleDateTimeChange.bind(this);
        this.handleOccasionChange=this.handleOccasionChange.bind(this);
        this.handleQuantityChange=this.handleQuantityChange.bind(this);
        this.closeForm=this.closeForm.bind(this);
        this.handleReserve=this.handleReserve.bind(this);
        this.handleCancel=this.handleCancel.bind(this);

        this.validateEmail=this.valdateEmail.bind(this);
        this.updateDateTime=this.updateDateTime.bind(this);
        this.markDateTimeDeleted=this.markDateTimeDeleted.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value}); //update the value state when the field is changed
    }
    handleEmailChange(event) {
        this.setState({email: event.target.value}); //update the value state when the field is changed
    }
    handlePhoneChange(event) {
        this.setState({phone: event.target.value}); //update the value state when the field is changed
    }
    handleDateTimeChange(event) {
        this.setState({dateTime: event.target.value}); //update the value state when the field is changed
    }
    handleOccasionChange(event) {
        this.setState({occasion: event.target.value}); //update the value state when the field is changed
    }
    handleQuantityChange(event) {
        this.setState({quantity: event.target.value}); //update the value state when the field is changed
    }

    closeForm() {
        
        //Redirect back to root (App component)
        this.setState( { redirectToHome: true } ); 
        //swap back to the Home component display before redirect
        this.props.location.swapDisplayCallback("home-container", this.props);
    }
    
    handleReserve(event) {

        if (event.target.elements === undefined) {
            return;
        }

        let bookingObj={};
        for (let i=0; i<event.target.elements.length; i++) {
            let elem=event.target.elements[i];
            if (elem.type !== "text" && elem.type !== "number" ) {
                continue;
            }

            let keyValue={ [elem.name]: elem.value  }
            //merge key:value pair to bookingObj
            Object.assign(bookingObj, keyValue);

        }

        event.preventDefault();

        if (window.confirm("Confirming update")) {
            //update booking list
            let bookings = this.state.bookingList;
            bookings.push(bookingObj);
            this.setState( {bookingList: bookings} );

            //delete events marked for deletion        
            tempDeletedEvents.map(eventObj => {this.props.location.deleteEventCallback(eventObj)}  )
            
            tempEvents = [];  //clear unconfirmed events
            tempDeletedEvents = [];
        
            this.closeForm();  //redirect to home

        } 

    }
    handleCancel(event) {

        //delete unconfirmed temp event
        tempEvents.map(eventObj => {this.props.location.deleteEventCallback(eventObj)}  )

        //reset highlight color for events marked for deletion 
        tempDeletedEvents.map(eventObj => {this.props.location.resetEventColorCallBack(eventObj)}  )

        tempEvents = [];  //clear unconfirmed events
        tempDeletedEvents = [];

        this.closeForm();  //redirect to home
    }
    
    async valdateEmail(event) {

        let emailValidationKey = config.REACT_APP_EMAIL_VALIDATION_KEY;
        let emailAddr = event.target.value;

        try {
        const response=await axios.get('http://apilayer.net/api/check?access_key='+emailValidationKey
                                +'&smtp=1&format=1&email='+emailAddr);
        console.log("getHTTP response:", response.data);

        if (response.data.smtp_check !== true) {
            alert("Invalid email!")
        }

        this.setState({response: response.data})

        } catch (e) {
        console.error(e);
        }
    }

    updateDateTime(eventObj) {
        this.setState( {dateTime: eventObj.start} ) ;
        tempEvents.push(eventObj);  //remember unconfirmed event. it can be confirmed/cancelled at form submit
    }
    markDateTimeDeleted(eventObj) {
        tempDeletedEvents.push(eventObj);  //actually delete when confirming update, i.e. in handleReserve
    }

    render() {

        if (this.props.location.swapDisplayCallback === undefined) {
            return <div></div>    //no callback to make query
        }

        let toContainerId="appointment-container";
        let dateTimeInputId="datetime-input"; 
        let nameInputId="name-input"
        if (! this.state.redirectToHome) {  //do not overwrite display setup by filter form if redirecting away 
            
            this.props.location.swapDisplayCallback(toContainerId, this.props);
        }

        return (

            <div id={toContainerId}>

                {this.state.redirectToHome &&
                    <Redirect to='/Home' />    //route back to root (App component) depending on state
                }

                <p className="reservation-title">Brighten someone's day with flowers</p>
                <p className="reservation-title">Make an appointment with our designer today</p><br />

                <form className="reservation-form" onSubmit={this.handleReserve}>

                    <div className="input-container">

                        <label className="name-input-box">
                            Name<br />
                            <input id={nameInputId} type="text" value={this.state.name} placeholder="name" onChange={this.handleNameChange} />
                        </label>
                        <label className="email-input-box">
                            Email<br />

                            <input className="text-input" type="text" value={this.state.email} placeholder="email" onChange={this.handleEmailChange} onBlur={this.validateEmail} />
               
                        </label>
                        <label className="phone-input-box">
                            Phone#<br />
                            <input className="text-input" type="text" value={this.state.phone} placeholder="phone number" onChange={this.handlePhoneChange} />
                        </label>
                        <label className="quantity-input-box">
                            Quantity<br />
                            <input className="number-input" type="number" value={this.state.quantity} placeholder="quantity" onChange={this.handleQuantityChange} />
                        </label>
                        <label className="datetime-input-box">
                            Reserve time<br />
                            <input id={dateTimeInputId} type="text" value={this.state.dateTime} placeholder="pick a time from calendar" onChange={this.handleDateTimeChange} />
                        </label>
                        <label className="occasion-input-box">
                            Occasion<br />
                            <select id="occasion-select">
                                <option value="party">Party</option>
                                <option value="shower">Shower</option>
                                <option value="birthday">Birthday</option>
                                <option value="wedding">Wedding</option>
                            </select>
                        </label>

                        <div className="button-row">
                            <button type="submit" className="form-button" >Update Booking</button>  
                            <button className="form-button" onClick={this.handleCancel} >Cancel</button>  
                        </div>
                    </div>
                </form><br />

                <div id="appointment-calendar">
                    <CalendarApp 
                        dateTimeId={dateTimeInputId}
                        nameId={nameInputId}
                        updateDateTimeCallBack={this.updateDateTime}
                        markDateTimeCallBack={this.markDateTimeDeleted}
                        
                        getEventListCallback={this.props.location.getEventListCallback}
                        addEventCallback={this.props.location.addEventCallback}
                        deleteEventCallback={this.props.location.deleteEventCallback}
                    />
                </div>

            </div>

        )
    }

}
