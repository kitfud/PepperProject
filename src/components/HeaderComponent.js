import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.checkLogin = this.checkLogin.bind(this);

        this.state = {
          isNavOpen: false,
          isModalOpen: false
        };
      }

      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleLogin(event) {
        this.toggleModal();
        this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();

    }

    handleGoogleLogin(event) {
        this.toggleModal();
        this.props.googleLogin();
        event.preventDefault();
    }

    handleLogout() {
        this.props.logoutUser();
    }

    checkLogin(){
       if(!this.props.auth.isAuthenticated){
           alert("login first to access favorites tab")
       }   
    }
  
  render() {
    return(
        <div>
        <Navbar dark expand="md">
            <div className="container">
                <NavbarToggler onClick={this.toggleNav} />
                <NavbarBrand className="mr-auto" href="/"><img src='/assets/images/logo.png' height="30" width="41" alt="Kit's Garden" /></NavbarBrand>
                <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav navbar>
                    <NavItem>
                        <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link"  to='/garden'><span className="fa fa-list fa-lg"></span>Garden</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                    </NavItem>
                    <NavItem onClick = {this.checkLogin}>
                                    <NavLink className="nav-link" to="/favorites">
                                        <span className="fa fa-heart fa-lg"></span> My Favorites
                                    </NavLink>
                    </NavItem>
                    </Nav>
                </Collapse>
                <Nav className="ml-auto" navbar>
                                <NavItem>
                                { !this.props.auth.isAuthenticated ?
                                        <Button style ={buttonStyle} outline onClick={this.toggleModal}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        :
                                        <div>
                                            
                                        <div className="navbar-text mr-3">{this.props.auth.user.displayName?this.props.auth.user.displayName: this.props.auth.user.email}</div>
                                        <Button style ={buttonStyle} outline onClick={this.handleLogout}>
                                            <span className="fa fa-sign-out fa-lg"></span> Logout
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        </div>
                                    }
                                </NavItem>
                            </Nav>
            </div>
        </Navbar>
        <Jumbotron style = {styles}>
            <div className="container">
                <div className="row row-header">
                    <div className="col-12 col-sm-6">
                        <h1>Kit's Garden</h1>
                        <p>A Green Space In The Heart Of Seattle</p>
                    </div>
                </div>
            </div>
        </Jumbotron>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                    <div> General Users login here via Google:</div>    
                    <Button color="danger" onClick={this.handleGoogleLogin}><span className="fa fa-google fa-lg"></span> Login with Google</Button>
                    <hr class="rounded"></hr>
                     <div>Don't have a Google Account? Sign up for one <a target="_blank" rel="noopener noreferrer" href= "https://accounts.google.com/signup/v2/webcreateaccount?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F%3Fpc%3Dtopnav-about-n-en&flowName=GlifWebSignIn&flowEntry=SignUp">HERE</a></div>
                    <hr class="rounded"></hr>
                    <div style={divStyle}>If I assigned you a login and password then login here:</div>
                    <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                        <p></p>
                        
                    </ModalBody>
                </Modal>
    </div>
    );
  }
}

const styles ={
    background: "lightgreen",
    color: "white"
   
}

const buttonStyle={
    color:"black"
}

const divStyle = {
    marginBottom : "20px" 
}


export default Header;