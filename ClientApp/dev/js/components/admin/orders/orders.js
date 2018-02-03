import React, { Component } from 'react'
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import { PublicRoute } from 'react-router-with-props';

export class Orders extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>ORDERS</div>
        )
    }
}