import React, { Component } from "react"
import NavBar from "./nav/NavBar"
import FeatureViews from "./FeatureViews"
import { Menu, Icon, Sidebar, Confirm } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import EventsManager from '../modules/EventsManager'
import UserEventsManager from '../modules/UserEventsManager'
import UserManager from '../modules/UserManager'
import SuggestionsManager from '../modules/SuggestionsManager'


class Dashboard extends Component {
  state = {
    visible: false,
    open: false,
    events: [],
    userEvents: [],
    users:[],
    suggestions: []
  }

  getAllEvents = () => {
    EventsManager.getAll().then(events =>
      this.setState({events: events})
    )
  }

  getAllUsers = () => {
    UserManager.getAll().then(users => {
      this.setState({
          users: users
      })
  })
  }

  getAllSuggestions = () => {
    SuggestionsManager.getAll().then(suggestions => {
      this.setState({
          suggestions: suggestions
      })
  })
  }
  
  getUserEvents = () => {
    UserEventsManager.getAll().then(userEvents => {
        this.setState({
            userEvents: userEvents
        })
    })
}

  toggle = () => {
    this.setState({open: !this.state.open})
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
    this.getAllUsers()
    this.getAllSuggestions()
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
            <Menu.Item onClick={this.toggle}
              className="sidebarButton">
              Logout
              <Confirm
                open={this.state.open}
                cancelButton='Fuck you'
                confirmButton="Logout"
                onCancel={this.toggle}
                onConfirm={this.logout}
                content='Are you sure you want to Logout?'
              />
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={visible}>
            <FeatureViews
            events={this.state.events}
            userEvents={this.state.userEvents}
            getAllEvents={this.getAllEvents}
            getAllUserEvents={this.getAllUserEvents}
            allUsers={this.state.users}
            suggestions={this.state.suggestions}
            {...this.props} />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </>
    )
  }
}

export default Dashboard