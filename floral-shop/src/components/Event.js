import React from 'react';
import '../App.css';

import wedImg from '../assets/wed_momday pic.jpg';
import showerImg from '../assets/shower_event.jpg';
import annImg from '../assets/home copy.jpg';
import bdayImg from '../assets/bday_event.jpg';
import funeralImg from '../assets/funeral2_event.jpg';
import dinnerImg from '../assets/dinner_event.jpg';

export default function Event(props) {

    let toContainerId="event-container";

    if (props.swapContainerOnDisplay !== undefined) {
        props.swapContainerOnDisplay(toContainerId, props);
    }

    return (  
        <div id={toContainerId}>
            
            <div className="event-box">
                <img className="event-img" src={wedImg} alt="Wedding floral arangement sample"/>
                <div className="event-desc-box">
                <br /><br /> <br /><br />
                    <h3>WEDDINGS</h3>
                    <p className="event-desc">No Matter the type of wedding you have in mind, we can assist in making your dream wedding come true</p>
                </div>
            </div>
            <p className="quote-text1">"Happiness Blossoms From Within"</p>
            <div className="event-box">
                <div className="event-desc-box">
                    <br /><br /><br /><br /><br />
                    <h3>SHOWERS</h3>
                    <p className="event-desc">We can assist in the floral designs for your bridal shower, bro-dal shower and baby shower</p>
                </div>
                <img className="event-img" src={showerImg} alt="Shower floral arangement sample"/>
            </div>

            <br /><br /><br />

            <div className="event-box">
                <img className="event-img" src={annImg} alt="Annversary floral arangement sample" />
                <div className="event-desc-box">
                <br /><br /> <br /><br />
                    <h3>ANNIVERSARY</h3>
                    <p className="event-desc">Romantic floral arrangements to celebrate your love</p>
                </div>
            </div>
            <p className="quote-text1">"Earth laughs in flowers"</p>
            <div className="event-box">
                <div className="event-desc-box">
                    <br /><br /><br /><br /><br />
                    <h3>EVENTS</h3>
                    <p className="event-desc">fresh floral arrangements that will complement any event</p>
                </div>
                <img className="event-img" src={bdayImg} alt="Special occasion floral arangement sample" />
            </div>

            <br /><br /><br />

            <div className="event-box">
                <img className="event-img" src={funeralImg} alt="Funeral floral arangement sample"/>
                <div className="event-desc-box">
                <br /><br /> <br /><br />
                    <h3>FUNERALS</h3>
                    <p className="event-desc">Honor the life of a loved one. We will ensure your flowers are hand-picked with care and respect.</p>
                </div>
            </div>
            <p className="quote-text1">"Where flowers bloom so does hope"</p>
            <div className="event-box">
                <div className="event-desc-box">
                    <br /><br /><br /><br /><br />
                    <h3>SPECIAL DINNERS</h3>
                    <p className="event-desc">We will design intimate floral dinner combinations for your personal space</p>
                </div>
                <img className="event-img" src={dinnerImg} alt="Dinner floral arangement sample"/>
            </div>
        </div>
    )
}
