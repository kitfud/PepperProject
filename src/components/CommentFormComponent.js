import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
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
    this.checkLogin = this.checkLogin.bind(this);
        }


        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
          }

        handleLogin(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        this.props.postComment(this.props.plantId, values.comment, values.author, this.props.plantOwner);
        } 

        checkLogin(){
            if(!this.props.authenticate.isAuthenticated ){
                alert("login first to submit a comment")
            }
            else{
                this.toggleModal();
            }   
         }

render(){
    return(
<div>
<Button outline onClick={this.checkLogin} color="primary">Submit Comment</Button>

<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
<ModalBody>


<LocalForm onSubmit={(values) => this.handleLogin(values)}>

<div className="container">

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
                                    <Control.textarea model=".comment" id="comment"
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