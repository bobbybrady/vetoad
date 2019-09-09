import React, { Component } from "react"
import NavBar from "./nav/NavBar"
import FeatureViews from "./FeatureViews"
import { Menu, Icon, Sidebar, Confirm } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import EventsManager from '../modules/EventsManager'
import UserEventsManager from '../modules/UserEventsManager'


class Dashboard extends Component {
  state = {
    visible: false,
    open: false,
    events: [],
    userEvents: []
  }

  getAllEvents = () => {
    EventsManager.getAll().then(events =>
      this.setState({events: events})
    )
  }
  
  getUserEvents = () => {
    UserEventsManager.getAll().then(userEvents => {
        this.setState({
            userEvents: userEvents
        })
    })
}
  show = () => {
    if (this.state.open === false) {
      this.setState({
        open: true
      })
    } else {
      this.setState({
        open: false
      })
    }
  }
  handleConfirm = () => {
    this.setState({
      open: false
    })
  }


  handleClick = () => {
    if (this.state.visible === false) {
      this.setState({ visible: true })
    } else {
      this.setState({ visible: false })
    }
  }


  logout = () => {
    sessionStorage.clear()
    this.props.history.push("/")
    this.handleConfirm()
  }

  componentDidMount() {
    this.getAllEvents()
    this.getUserEvents()
  }
  render() {
    const { visible } = this.state
    return (
      <>
        <NavBar {...this.props}
          handleClick={this.handleClick}
          className="getRidOfSpace" />
              <Sidebar.Pushable >
          <Sidebar
            className="dimmed"
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            direction='right'
            visible={visible}
            width='thin'
          >
            <Menu.Item onClick={this.handleClick}
              name='close'>
              <Icon name="close"
                size='tiny' />
            </Menu.Item>
            <Menu.Item as={Link} to='/'
              onClick={this.handleClick} className="sidebarButton"
            >Current Events
            </Menu.Item>
            <Menu.Item as={Link} to='/pastevents'
              className="sidebarButton"
              onClick={this.handleClick}>
              Past Events
            </Menu.Item>
            <Menu.Item as={Link} to='/profile'
              className="sidebarButton"
              onClick={this.handleClick}>
              Profile
            </Menu.Item>
            <Menu.Item onClick={this.show}
              className="sidebarButton">
              Logout
              <Confirm
                open={this.state.open}
                cancelButton='Cancel'
                confirmButton="Logout"
                onCancel={this.show}
                onConfirm={this.logout}
                content='Are you sure you want to Logout?'
              />
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={visible}>
            <FeatureViews
            events={this.state.events}
            userEvents={this.state.userEvents}
            {...this.props} />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </>
    )
  }
}

export default Dashboard