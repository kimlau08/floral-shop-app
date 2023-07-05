import React from 'react';

export default function Home(props) {

    if (props.swapContainerOnDisplay !== undefined) {
        props.swapContainerOnDisplay("home-container", props);
    }

    return (  //display already rendered in App.js
        <div>
        </div>
    )
}
