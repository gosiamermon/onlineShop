import React, { Component } from 'react'
import { withRouter } from "react-router";
import { connect } from 'react-redux';

class UsersFormComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>USERS FORM</div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

export const UsersForm = withRouter(connect(mapStateToProps, null)(UsersFormComponent))