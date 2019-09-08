import React, { Component } from "react"
import NavBar from "./nav/NavBar"
import FeatureViews from "./FeatureViews"
import {
  Menu, Icon, Segment,
  Sidebar, Button
} from 'semantic-ui-react'
import { Link, Redirect } from "react-router-dom"


class Dashboard extends Component {
  state = { visible: false }
  handleClick = (event) => {
    if (this.state.visible === false) {
      this.setState({ visible: true })
    } else {
      this.setState({ visible: false })
    }
  }

  logout = () => {
    sessionStorage.clear()
    this.props.history.push("/")
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
                        size='tiny'/>
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
            <Menu.Item as='a'
              onClick={this.logout}
              className="sidebarButton">
              Logout
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={visible}>
            <FeatureViews />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </>
    )
  }
}

export default Dashboard