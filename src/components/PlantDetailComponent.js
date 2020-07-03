import React, { Component } from 'react';
import { Card, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem, CardImgOverlay,Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentFormComponent';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Loading } from './LoadingComponent';
import {Modal, ModalHeader, ModalBody,
    Form, Label } from 'reactstrap';
    import { Control, LocalForm, Errors } from 'react-redux-form';
import { plantsFailed } from '../redux/ActionCreators';

    const required = (val) => val && val.length;

    function RenderPlant({plant,favorite, postFavorite, deleteFavorite, auth}){
        return (   
        
       <Card key={plant.id}>
           <CardImg width="100%" top src={plant.image} alt={plant.name} />
           <CardImgOverlay>
                                <Button outline style={buttonStyle} onClick={() =>auth.isAuthenticated ? favorite ? deleteFavorite(plant._id) : postFavorite(plant._id) : alert("login first to use favorite button")}>
                                    {favorite ?
                                        <span className="fa fa-heart"></span>
                                        : 
                                        <span className="fa fa-heart-o"></span>
                                    }
                                </Button>
        </CardImgOverlay>
        <CardTitle>{plant.name} </CardTitle>
        <CardText>
        
        <span style = {hot}>Description:</span>{plant.description} <br/>
        <br/>
        <span style = {hot}>Submitted By:</span> {plant.submittedBy}<br/>
        <br/>
        {plant.scoville? <span> <span style = {hot}> Hotness:</span>{plant.scoville} Scoville Units </span> : null}<br/>
        <br/>
        {plant.source? <span> <span style = {hot}>Seed Source:</span> {plant.source} </span> : null}<br/>
        <br/>
        {plant.category?<span > <span style = {hot}> Category:</span> {plant.category}  </span> : null}<br/>
        <br/>
        {plant.sown?<span><span style = {hot}> Plant Sown:</span> {plant.sown}  </span> : null}<br/>
        <br/>
        {plant.transplant?<span> <span style = {hot}>Transplant Date:</span> {plant.transplant}  </span> : null} <br/>
        <br/>
        { plant.fruits? <span> <span style = {hot}># Fruits:</span> {plant.fruits}  </span> : null } <br/>                          
        <br/>
        </CardText>  
         
       </Card> 
      
        )}
       
       
       
       function RenderComments({comments,postComment, plantId,deleteComment,auth}){  
  
       if(comments != null){
        const rencomment = comments.map((info) => 
        <Card style = {cardStyle}>
        <Fade in key={comments._id} >
        <ol >
        <p style = {textStyle}>{info.comment}</p>
        <p>-- {info.author.firstname}<span> </span>
        {new Intl.DateTimeFormat('en-US', 
        { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(info.updatedAt.toDate())))}
         
       
         <span style={buttonStyle} className="fa fa-trash-o" onClick={() => deleteComment(info)}></span>
        
        
       

        </p>
        </ol> 
        </Fade>  
        </Card>
      
);
           console.log("about to return JSX")    
           return(
           <div  >
                 <Stagger in >
                 {rencomment} 
                 </Stagger>
           
           <CommentForm plantId={plantId} postComment={postComment} authenticate={auth}/> 
           </div> 
           )
       }
       else{
           return <div></div>;
       }
       }
       
       
class PlantDetails extends Component {
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.test = this.test.bind(this);
   
        this.state = {
          isModalOpen: false
        };
      }

      toggleModal(){
       if(this.props.auth.isAuthenticated){
        if(this.props.auth.user.displayName === this.props.plant.submittedBy || this.props.auth.user.email === this.props.plant.submittedBy){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            })
        }
        else{
            alert("you can only update plants YOU have added to the garden")
        }   
   
       }   
      
        else{
            alert("Login to edit plants")
        }
    }

    handleSubmit(values) {
        this.toggleModal();
        console.log('Current State is: ' + JSON.stringify(values));
        console.log("this is your plant:" + this.props.plant._id)
        let name;
        let source;
        let description;
        let scoville;
        let category; 
        let sown;
        let transplant;
        let fruits;

        if(values.name === undefined){
           name = this.props.plant.name
        }
        else{
            name = values.name
        }

        if(values.source === undefined){
            source = this.props.plant.name
         }
         else{
             source = values.source
         }

         if(values.description === undefined){
            description = this.props.plant.description
         }
         else{
             description = values.description
         }

         if(values.scoville === undefined){
            scoville = this.props.plant.scoville
         }
         else{
             scoville = values.scoville
         }

         if(values.category === undefined){
            category = this.props.plant.category
         }
         else{
             category = values.category
         }

         if(values.sown === undefined){
            sown = this.props.plant.sown
         }
         else{
             sown = values.sown
         }

         if(values.transplant === undefined){
            transplant = this.props.plant.transplant
         }
         else{
             transplant = values.transplant
         }

         if(values.fruits === undefined){
            fruits = this.props.plant.fruits
         }
         else{
             fruits = values.fruits
         }
      
        this.props.updatePlant(this.props.plant._id, source, name, description, scoville, category,sown,transplant,fruits);
       
        //values.preventDefault();
    }


   render(){
  
        if (this.props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        }
       
       else if (this.props.plant != null)
       
       return(
       
        <div className="container">
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}> Edit Details: <span style = {hot}>change the fields you want to update. Fields left blank will remain unchanged :)</span></ModalHeader>

                    <ModalBody>

                    <LocalForm onSubmit={(val) => this.handleSubmit(val)}>
                    
                    <Row className="form-group">
                                <Label htmlFor="name" md={2}>Plant Name</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Plant Name"
                                        className="form-control"
                                       
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                                 
                                </Col>
                            </Row>

                        
                            <Row className="form-group">
                                <Label htmlFor="scoville" md={2}>Scoville Hotness</Label>
                                <Col md={10}>
                                    <Control.text model=".scoville" id="scoville" name="scoville"
                                        placeholder="Scoville"
                                        className="form-control"
                                    
                                         />
                               
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="category" md={2}>Category</Label>
                                <Col md={10}>
                                    <Control.text model=".category" id="category" name="category"
                                        placeholder="Category"
                                        className="form-control"
                                    
                                         />
                               
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="source" md={2}>Seed Source (URL): </Label>
                                <Col md={10}>
                                    <Control.text model=".source" id="source" name="source"
                                        placeholder="Source"
                                        className="form-control"
                                    
                                         />
                               
                                </Col>
                            </Row>
                         
                            <Row className="form-group">
                                <Label htmlFor="description" md={2}>Description</Label>
                                <Col md={10}>
                                    <Control.textarea model=".description" id="description" name="description"
                                        rows="12"
                                        className="form-control" 
                                        />
                                        <Errors
                                        className="text-danger"
                                        model=".description"
                                        show="touched"
                                        messages={{
                                            required: 'Required'
                                        }}
                                     />
                                </Col>
                            </Row>
                            

                            <Row className="form-group">
                                <Label htmlFor="sown" md={2}>Seeds Sown: </Label>
                                <Col md={10}>
                                    <Control.text model=".sown" id="sown" name="sown"
                                        placeholder="Sown"
                                        className="form-control"
                                    
                                         />
                               
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="transplant" md={2}>Transplant Date: </Label>
                                <Col md={10}>
                                    <Control.text model=".transplant" id="transplant" name="transplant"
                                        placeholder="Transplant"
                                        className="form-control"

                                         />
                               
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="fruits" md={2}># Harvested Fruits: </Label>
                                <Col md={10}>
                                    <Control.text model=".fruits" id="fruits" name="fruits"
                                        placeholder="# Fruits"
                                        className="form-control"

                                         />
                               
                                </Col>
                            </Row>
                       
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                   Update Plant!
                                    </Button>
                                </Col>
                            </Row>

                        </LocalForm>





                    </ModalBody>

        </Modal>  
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/garden">Garden</Link></BreadcrumbItem>
                <BreadcrumbItem active>{this.props.plant.name}</BreadcrumbItem>
            </Breadcrumb>

            <div className="col-12">
                <h3>{this.props.plant.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderPlant plant={this.props.plant} favorite={this.props.favorite} postFavorite={this.props.postFavorite} deleteFavorite={this.props.deleteFavorite} auth={this.props.auth}/>
                <span className="fa fa-pencil-square-o" onClick={this.toggleModal}> Edit Details</span>
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={this.props.comments}
                postComment={this.props.postComment}
                plantId={this.props.plant._id} 
                deleteComment = {this.props.deleteComment}
                auth={this.props.auth}/>
            </div>
        </div>

        </div>
       
       );
       
       else
       return(
           <div></div>
       );
       
   }   
       
       
       }

const hot = {
    color:"red"
}
const buttonStyle ={
    marginLeft: "10px",
    color:"red",
    background: "white"
}

const textStyle = {
    color: "green"
}

const cardStyle = {
    marginBottom: "10px"
}

export default PlantDetails;

