import React from "react";

export default React.createClass({
    choosePollHandler: function(type) {
        this.getDOMNode().dispatchEvent(new CustomEvent('choosePollEvent', {
            detail: {
                pollType: type
            },
            bubbles: true
        }));
    },
    render: function() {
        return (
            <div>
                {this.props.pollType}
                <div onClick={this.choosePollHandler.bind(this, 'yes or no')}>one</div>
                <div onClick={this.choosePollHandler.bind(this, 'it or it')}>two</div>
            </div>
        )
    }
});