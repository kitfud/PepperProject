import React, {Component} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {

constructor(props){
    super(props);  
 
    this.state = {
        isModalOpen: false
      };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
        }


        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
          }

        handleLogin(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        this.props.addComment(this.props.plantId, values.rating, values.author, values.comment);
        } 

render(){
    return(
<div>
<Button outline onClick={this.toggleModal} color="primary">Submit Comment</Button>

<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
<ModalBody>


<LocalForm onSubmit={(values) => this.handleLogin(values)}>

<div className="container">

<Row className="form-group">
<Label htmlFor="rating" md={12}>Rating</Label>
<Col md={{size: 3, offset: 0}}>
<Control.select model=".rating" name="rating" className="form-control">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
</Control.select>
</Col>

</Row>




             <Row className="form-group">
                                <Label htmlFor="firstname" md={12}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            
                            <Row className="form-group">
                                <Col md={{size:10, offset: 0}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                            </div>
                           

                            </LocalForm>







</ModalBody>
</Modal>

  </div>



                

    )    
}
}


export default CommentForm;