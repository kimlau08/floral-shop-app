import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

import "./Appointment.css";

// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";


let nameElem = {};
let dateTimeId = {};
export default class CalendarApp extends React.Component {
  constructor(props) {
    super(props);

    
    let eventList = [];
    if (props.getEventListCallback !== undefined) {
      eventList = props.getEventListCallback();
    }
    this.state = {
      calendarWeekends: true,
      calendarEvents: eventList
    };
  
  }

  calendarComponentRef = React.createRef();

  render() {

    if (this.props.updateDateTimeCallBack === undefined) {
      return <div></div>   //no callback to record datetime
    }

    nameElem = document.getElementById(this.props.nameId);
    dateTimeId = this.props.dateTimeId;
    if (nameElem === null) {
      return <div></div>   //no name element to identify guest
    }

    if (nameElem.value === "") {
      alert("Please enter your name first");
      return <div></div>   //need a name to make reservation
    }
    
    return (
      <div className="calendar-app">
        <div className="calendar-app-top">
          &nbsp; (click a date/time to add appointment)
        </div>
        <div id="calendar-app-calendar">
          <FullCalendar
            defaultView="timeGridWeek"
            header={{
              left: "prev,next today",
              center: "title",
              right: "timeGridWeek,timeGridDay,listWeek"

            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={ this.state.calendarEvents }
            dateClick={this.handleDateClick}
            eventClick={this.handleEventClick}
          />
        </div>
      </div>
    );
  }

  handleDateClick = arg => {
    console.log(arg);
    if (window.confirm("Adding an 1 hr appt at " + arg.date + " ?")) {

      let eventObj = {
        // new event data
          title: nameElem.value,
          start: arg.date,
          allDay: arg.allDay
        };

      //update local state to redraw
      this.setState({        
        calendarEvents: this.state.calendarEvents.concat(eventObj)
      });

      //update form
      this.props.updateDateTimeCallBack(eventObj);

      //update global state      
      this.props.addEventCallback(eventObj);
    }
  };

  handleEventClick = arg => {
   
    if (window.confirm("Confirm deleting appointment ? (To reschedule, please add another appointment afterwards)")) {
      
      let eventObj = {
        title: arg.event.title,
        start: arg.event.start
      }

      //update local state to redraw
      let i = this.state.calendarEvents.findIndex(obj => obj.title === eventObj.title && 
                                              obj.start.toString() === eventObj.start.toString());
      let arr = this.state.calendarEvents;
      arr.splice(i, 1);
      this.setState({        
        calendarEvents: arr
      });

      //update global state      
      this.props.deleteEventCallback(eventObj);

      this.props.closeFormCallBack();   //close appointment form and redirect to home
    }
  }
}
