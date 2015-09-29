import React from "react";

export default React.createClass({
    takePhotoHandler: function() {
        this.getDOMNode().dispatchEvent(new CustomEvent('takePhotoEvent',  {
            bubbles: true
        }));
    },
    render: function() {
        return (<div>'it or it'{this.props.photosLength}<button onClick={this.takePhotoHandler}>take a photo</button></div>)
    }
});