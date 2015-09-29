import React from "react";
import $ from "jquery";
import Choose from "./choose";
import SingleProcess from "./proccess/single";
import DoubleProcess from "./proccess/double";
import SingleReady from "./ready/single";
import DoubleReady from "./ready/double";

var Shoppoll = React.createClass({
    getInitialState: function() {
        return{photos:[]}
    },
    componentWillMount: function() {
        window.addEventListener('choosePollEvent', this.choosePollHandler, false);
        window.addEventListener('takePhotoEvent', this.takePhotoHandler, false);
        window.addEventListener('startPollEvent', this.startPollHandler, false);
    },
    choosePollHandler: function(event) {
        this.setState({
            pollType: event.detail.pollType,
            showNav: true
        })
    },
    backHistoryHandler: function() {
        var state = {
            photos: this.state.photos
        };
        if (this.state.photos.length === 0) {
            state.pollType = null;
            state.showNav = false;
        }
        this.state.photos.splice(this.state.photos.length - 1, 1);
        this.setState(state);
    },
    startPollHandler: function() {
        this.setState({
            showNav: false,
            pollStarted: true
        });
    },
    takePhotoHandler: function() {
        this.setState({hidden: true});
        $('img').click(function(event) {
            $('img').off('click');

            this.state.photos.push(event.target);
            this.setState({
                hidden: false,
                photos: this.state.photos
            });

        }.bind(this));
    },
    render: function() {
        var cmp = <Choose />;

        if (this.state.pollType) {
            switch(this.state.pollType) {
                case 'yes or no':
                    cmp = <SingleProcess photosLength={this.state.photos.length} />;
                    break;
                case 'it or it':
                    cmp = <DoubleProcess photosLength={this.state.photos.length} />;
                    break;
            }
        }

        if (
            this.state.pollType === 'yes or no' && this.state.photos.length === 1 ||
            this.state.pollType === 'it or it' && this.state.photos.length === 2
        ) {
            switch(this.state.pollType) {
                case 'yes or no':
                    cmp = <SingleReady />;
                    break;
                case 'it or it':
                    cmp = <DoubleReady />;
                    break;
            }
        }

        var style = {
            border: '1px solid',
            display: 'inline-block',
            padding: '20px'
        };
        var resultCmp = (
            <div style={style}>
                {
                    this.state.showNav ?
                        <div>
                            <span onClick={this.backHistoryHandler.bind(this, 'back')}>back</span>
                            <span onClick={this.backHistoryHandler.bind(this, 'close')}>x</span>
                        </div>
                        : null
                }
                {cmp}
            </div>
        );

        if (this.state.hidden) {
            resultCmp = (null)
        }

        return resultCmp
    }
});

React.render(
    <Shoppoll hidden="false"/>,
    document.getElementById('container')
);