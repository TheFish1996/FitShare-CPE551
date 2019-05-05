import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import {connect} from 'react-redux'
import {Link} from "react-router-dom"
import {logout} from "../actions/userActions"

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout = () => {
    this.props.logout()
  }

  render() {
    return (
      <Navbar fixed="top" color="light" light expand="md">
        <NavbarBrand tag={Link} to="/"> 
          FitShare
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/sponsoredPrograms">
                Sponsored Programs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/allPrograms">All Programs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/discoverTrainers">
                Discover Trainers
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Account
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} to="/profile">View Profile</DropdownItem>
                <DropdownItem>Share Your Plan</DropdownItem>
                <DropdownItem>Purchased Plans</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.logout}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NavBar)
