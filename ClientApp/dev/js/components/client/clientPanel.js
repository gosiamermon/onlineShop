import React, { Component } from 'react'
import { connect } from "react-redux";

export class ClientPanel extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>Client Panel</div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

//export const ClientPanelContainer = connect(mapStateToProps, null)(ClientPanel)