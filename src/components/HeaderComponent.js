import React, { Component } from 'react';
import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap';

class Header extends Component {
  render() {
    return(
    <React.Fragment>
      <Navbar dark>
        <div className="container">
            <NavbarBrand href="/">Kit's Garden</NavbarBrand>
        </div>
      </Navbar>
      <Jumbotron style={styles}>
           <div className="container">
               <div className="row row-header">
                   <div className="col-12 col-sm-6">
                       <h1>Kit's Garden</h1>
                       <p>A Small Urban Garden in the Heart of Seattle</p>
                   </div>
               </div>
           </div>
       </Jumbotron>
    </React.Fragment>
    );
  }
}

const styles ={
    background: "lightgreen"
}

export default Header;