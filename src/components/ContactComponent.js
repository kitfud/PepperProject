import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem,
    Button, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
        lastname: '',
        telnum: '',
        email: '',
        agree: false,
        contactType: 'Tel.',
        message: '',
        touched:{
            firstname: false,
            lastname: false,
            telnum: false,
            email: false
        }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this); 
        
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        //event.preventDefault();
    }

    handleBlur = (field)=>(evt)=>{
        this.setState({
            touched: { ...this.state.touched, [field]:true }
        });
    }

   validate(firstname,lastname, telnum, email){
       const errors = {
        firstname: '',
        lastname: '',
        telnum: '',
        email: '',
       };
       if(this.state.touched.firstname && firstname.length < 3){
           errors.firstname = 'First Name should be  >= 3 characters';
       }
       else if (this.state.touched.firstname && firstname.length > 10){
        errors.firsname = 'First Name should be <= 10 characters'
       }

       if(this.state.touched.lastname && lastname.length < 3){
        errors.lastname = 'Last Name should be  >= 3 characters';
    }
    else if (this.state.touched.lastname && lastname.length > 10){
     errors.lastname = 'Last Name should be <= 10 characters'
    }

    const reg = /^\d+$/;//numbers and nothing else
    if(this.state.touched.telnum && !reg.test(telnum)){
        errors.telnum = 'Tel. Number should contain only numbers';
    }

    if(this.state.touched.email && email.split('').filter(x => x === '@').length !== 1){
        errors.email = 'Email should contain a @'
    }

    return errors;
   } 

    render(){
       
        return(
            
            
            <div className="container">
                  <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Contact Us</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>Contact Us</h3>
                <hr />
            </div>                
            
            </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12" >
                            <h5>Our Address</h5>
                            <address>
                            530 Broadway E<br />
                            Seattle, WA<br />
                            USA<br />
                            <i className="fa fa-phone"></i>: +4132307016<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:kitfuderich@gmail.com">kitfuderich@gmail.com</a>
                            </address>
                    </div>
                    <div className="col-12">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+4132307016"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:kitfuderich@gmail.com"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>

                <div className="row row-content">
                   <div className="col-12">
                      <h3>Send us your Feedback</h3>
                   </div>
                    <div className="col-12 col-md-9">

                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        className="form-control"
                                         />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        className="form-control"
                                         />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text model=".telnum" id="telnum" name="telnum"
                                        placeholder="Tel. Number"
                                        className="form-control"
                                         />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 6, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree"
                                                className="form-check-input"
                                                 /> {' '}
                                                <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Control.select model=".contactType" name="contactType"
                                        className="form-control">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
               </div>

            </div>
        );

    }
    
}

export default Contact;