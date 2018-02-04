import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Panel, Nav, Modal, Button } from "react-bootstrap";
import { push } from "connected-react-router";
var ReactTable = require("react-table").default;
import { getAllUsers, deleteUser, getUser } from '../../../actions/users/users.action-creators'
import { adminPanelUsers } from '../../../helpers/routes'

class UsersTableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            userIdToDelete: ""
        }
    }


    componentDidMount() {
        this.props.getAllUsers()
    }

    render() {
        const { users } = this.props
        const columns = [
            {
                Header: "Name",
                accessor: "name"
            },
            {
                Header: "Surname",
                accessor: "surname"
            },
            {
                Header: "Address",
                accessor: "address"
            },
            {
                Header: "e-mail",
                accessor: "email"
            },
            {
                Header: "Role",
                accessor: "role"
            },
            {
                Header: "Edit",
                accessor: "userId",
                filterable: false,
                Cell: row => {
                    return (
                        <div className="text-center">
                            <button
                                className="btn btn-info"
                                onClick={() => {
                                    this.editUser(row.value)
                                }}
                            >
                                edit
                            </button>
                        </div>
                    )
                }
            },
            {
                Header: "Delete",
                accessor: "userId",
                filterable: false,
                Cell: row => {
                    return (
                        <div className="text-center">
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    this.deleteUser(row.value)
                                }
                                }
                            >
                                delete
                            </button>
                        </div>
                    )
                }
            }
        ]
        return (
            <div className="col-sm-12 table-container table-wrapper">
                <nav className="button-wrapper">
                    <Link to={`${adminPanelUsers}/form/new`} className="btn btn-primary">
                        Add new user
                    </Link>
                </nav>
                <h1>Users</h1>
                <hr />
                <ReactTable
                    data={users}
                    columns={columns}
                    filterable
                    defaultFilterMethod={(filter, row) => {
                        let rowValue = row[filter.id].toLowerCase();
                        let filterValue = filter.value.toLowerCase();
                        return rowValue.includes(filterValue);
                    }}
                    defaultPageSize={15}
                    pageSize={15}
                    minRows={15}
                />
                <Modal bsSize="large" show={this.state.showModal} onHide={this.closeModal.bind(this)}>
                    <Modal.Body>
                        <h4>Do you want to delete this user?</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.confirmDeleteUser.bind(this)}>Yes</Button>
                        <Button onClick={this.closeModal.bind(this)}>No</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }


    closeModal() {
        this.setState({
            ...this.state,
            showModal: false
        });
    }

    deleteUser(userId) {
        this.setState({
            ...this.state,
            userIdToDelete: userId,
            showModal: true
        });
    }

    confirmDeleteUser() {
        this.props.deleteUser(this.state.userIdToDelete);

        this.setState({
            ...this.state,
            userIdToDelete: "",
            showModal: false
        })
    }

    editUser(userId) {
        this.props.getUser(userId)
        this.props.push(`${adminPanelUsers}/form/${userId}`)
    }
}

function mapStateToProps(state) {
    return {
        users: state.users.usersList.users
    }
}

export const UsersTable = connect(mapStateToProps, { getAllUsers, push, deleteUser, getUser })(UsersTableComponent)