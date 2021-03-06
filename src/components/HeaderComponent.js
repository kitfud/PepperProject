import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import  Notification from './NotificationComponent';


class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
        this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.toggleNotificationModal = this.toggleNotificationModal.bind(this);

        this.state = {
          isNavOpen: false,
          isModalOpen: false,
          isNotificationOpen:false,
          user: null,
       
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

    toggleNotificationModal(){
        this.setState({
            isNotificationOpen: !this.state.isNotificationOpen
        })
       this.props.toggleSeen(); 
       
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

    handleFacebookLogin(event) {
        this.toggleModal();
        this.props.facebookLogin();
        event.preventDefault();
    }

    handleLogout() {
        this.props.logoutUser();
    }

    checkLogin(){
       if(!this.props.auth.isAuthenticated){
           alert("login first to access this tab")
       }   
    }

   
  
  render() {
    return(
        <div>
            
        <Modal isOpen={this.state.isNotificationOpen} toggle={this.toggleNotificationModal}>
        <ModalHeader toggle={this.toggleNotificationModal}>Notifications</ModalHeader>
        
        <ModalBody>

            <Notification closeModal = {this.toggleNotificationModal} resolveNotifications = {this.props.resolveNotifications} receiveLogin = {this.props.receiveLogin} auth={this.props.auth} plants={this.props.plants} comments = {this.props.comments}/>
        
        </ModalBody>
        </Modal>

        <Navbar dark expand="md">
            
            <div className="container">
                <NavbarToggler onClick={this.toggleNav} />
                <NavbarBrand style = {{marginLeft:"10px"}} className="mr-auto" href="/"><img src='/assets/images/pepperpainting.jpg' height="30" width="41" alt="Kit's Garden" /></NavbarBrand>
            
                <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav navbar id="thenav" >
                    <NavItem>
                        <NavLink onClick={this.toggleNav} className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={this.toggleNav} className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={this.toggleNav} className="nav-link"  to='/garden'><span className="fa fa-envira fa-lg"></span>Garden</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={this.toggleNav}  className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                    </NavItem>
                    <NavItem onClick = {this.checkLogin}>
                                    <NavLink onClick={this.props.auth.isAuthenticated ? this.toggleNav:null} className="nav-link" to="/favorites">
                                        <span className="fa fa-heart fa-lg"></span> My Garden
                                    </NavLink>
                    </NavItem>
                    <NavItem onClick = {this.checkLogin}> 
                    <NavLink onClick={this.props.auth.isAuthenticated ? this.toggleNav:null} className="nav-link" to='/upload'><span className="fa fa-cloud-upload fa-lg"></span> Upload</NavLink>
                    </NavItem>
                    </Nav>
                </Collapse>

                {this.props.auth.userUpdates === true ?
                 <Nav navbar>
                 <NavItem onClick = {this.checkLogin}>
                 <Button style={buttonBell} onClick={this.props.auth.isAuthenticated?this.toggleNotificationModal:null}><span className="fa fa-bell fa-lg"> </span> </Button>
                 </NavItem>
                 </Nav>
                 :
                 <Nav navbar>
                 <NavItem onClick = {this.checkLogin}>
                 <Button style={buttonBellNo} onClick={this.props.auth.isAuthenticated?this.toggleNotificationModal:null}><span className="fa fa-bell fa-lg"> </span> </Button>
                 </NavItem>
                 </Nav>
            
            
            }
                   



                <Nav className="ml-auto" navbar>

                   

                                <NavItem>
                                { this.props.auth.user ===null ?
                                        <Button onClick={this.toggleModal}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        :
                                        <div>
                                            
                                        <div className="navbar-text mr-3">{this.props.auth.user.displayName ?this.props.auth.user.displayName: this.props.auth.user.email}</div>
                                        <Button onClick={this.handleLogout}>
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
                        <p>A Green Space At The Heart Of The Internet</p>
                    </div>
                </div>
            </div>
        </Jumbotron>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                    <div> General Users login here via Google:</div>    
                    <Button color="danger" onClick={this.handleGoogleLogin}><span className="fa fa-google fa-lg"></span> Login with Google</Button>
                    <hr className="rounded"></hr>
                    <hr className="rounded"></hr>
                     <div>Don't have a Google account? Sign up here: 
                         <a target="_blank" rel="noopener noreferrer" href= "https://accounts.google.com/signup/v2/webcreateaccount?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F%3Fpc%3Dtopnav-about-n-en&flowName=GlifWebSignIn&flowEntry=SignUp">
                         HERE</a></div>
                      
                        <p></p>
                        
                    </ModalBody>
                </Modal>
    </div>
    );
  }
}

const styles ={
   
    color: "white",
    textShadow: "0 0 3px #015e20, 0 0 5px #015e20" 
}



const divStyle = {
    marginBottom : "20px" 
}

const buttonBell = {
    background:"yellow",
    marginRight:"20px"
}

const buttonBellNo = {
    background:"lightGreen",
    marginRight:"20px"
}




export default Header;