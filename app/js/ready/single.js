import React from "react";

export default React.createClass({
    startPollHandler: function() {
        this.getDOMNode().dispatchEvent(new CustomEvent('startPollEvent',  {
            bubbles: true
        }));
    },
    render: function() {
        return (<div>YesOrNoStartPollCmp<button onClick={this.startPollHandler}>fb</button><button onClick={this.startPollHandler}>copy</button></div>)
    }
});