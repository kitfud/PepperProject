import {Breadcrumb, BreadcrumbItem, Button, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

import React, { Component } from "react";
import { storage } from '../firebase/firebase';
import { Control,Form, Errors} from 'react-redux-form';
import {  Redirect } from 'react-router-dom'
const required = (val) => val && val.length;


class Upload extends Component {

    constructor(props) {
        super(props);

        this.state = {
          image: null,
          url: "",
          progress: 0,

          formsubmitted:this.props.submitted

        
        };

        this.handleSubmit = this.handleSubmit.bind(this);
      }
      componentDidMount(){
        console.log("recent is now:" + this.props.recent)
      
      }

      resetProps(){
        this.props.resetProps();
      }

      handleChange = e => {
        if (e.target.files[0]) {
          const image = e.target.files[0];
          this.setState(() => ({ image }));
        }
      };
    
      handleUpload = () => {
      const { image } = this.state;

      if (this.state.image != null){

        let date = Date.now()
     
        const uploadTask = storage.ref(`images/${date+image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          snapshot => {
            // progress function ...
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.setState({ progress });
          },
          error => {
            // Error function ...
            console.log(error);
          },
          () => {
            // complete function ...
            storage
              .ref("images")
              .child(date+image.name)
              .getDownloadURL()
              .then(url => {
                this.setState({ url });
              });
          }
        );
      }
      else{
        alert("upload a file first")
      }
       
      };

     dataCheck(values){
      if(values.name.length !==0 && values.description.length !== 0){
     
   
        this.props.postPlant(values.source,this.state.url, values.name, values.description, values.scoville,values.category, this.props.auth.user.displayName?this.props.auth.user.displayName: this.props.auth.user.email,values.sown,values.transplant,values.fruits);
      
        this.props.resetPlantForm()
        
        alert("Success! Thank you for adding a plant to the garden!")

       
        
      }
      else{
        alert("You need to add a plant name + descrption before submitting") 
      }
    
     }

      handleSubmit(values) {
        console.log(values.description)
        if(this.state.url.length !== 0){
            this.dataCheck(values);
        }
        else{
          alert("Upload an Image first! ")
        }
       
        //event.preventDefault();
    }

      render(){
        if(!this.state.formsubmitted){
          return(
            <div className="container">
                   <div className="row col-12">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Upload</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Upload To The Garden</h3>
                        <hr />
                    </div>
                </div>

              <div className="row row-content">
                <div className ="col-12 col-md-5 align-items-left">

                <div style = {divStyle} className="file-field input-field" >
          <div className="btn">
            <input type="file" onChange={this.handleChange}  />
          </div>
        </div>


        <div className ="row ">
       <div className="col align-items-center">
       <span className = " align-items-center no-box-sizing no-gutters" >
       <button onClick={()=>{if(window.confirm('are you sure you want to upload this image to the Garden server?'))this.handleUpload()}}>
          Upload
        </button>
       </span>
         <span className = "align-items-center no-box-sizing no-gutters "> 
         <progress className = "no-box-sizing" style = {styles} value={this.state.progress} max="100"  />
         </span>

       </div>      
        </div>
       
      
        <br />
        <br />
        <img
          src={this.state.url || "https://via.placeholder.com/400x300"}
          alt="Uploaded Images"
          height="250"
          width="350"
          style={imageBox}
        />

                </div>



 <div className ="col-12 col-md-6">

 <Form model="plantform" onSubmit={(values) => this.handleSubmit(values)}>
                    
                    <Row className="form-group">
                                <Label htmlFor="name" md={2}>Plant Name</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Plant Name"
                                        className="form-control"
                                        validators={{required}}
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
                                <Label htmlFor="description" md={2}>Description</Label>
                                <Col md={10}>
                                    <Control.textarea model=".description" id="description" name="description"
                                        rows="12"
                                        className="form-control" 
                                        placeholder="Description"
                                        validators={{required}}/>
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
                                <Label htmlFor="fruits" md={2}># Fruits: </Label>
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
                                   Upload Plant!
                                    </Button>
                                </Col>
                            </Row>

                        </Form>

         
         </div>



              </div>
           
        
  
        


      </div>

      
     
     
     
                
            
        );
        }
        else{

          this.resetProps();
          return(
         
            <Redirect to={{
              pathname: '/garden/'+this.props.recent,
              
            }} />
          )
        }
        
    
   
    }

      }
   
 
const styles = {
  marginLeft: "0px",
  marginTop:"20px",
  paddingRight:"0px",
  paddingLeft:"0px",
  color:"green"
}

const divStyle = {
  marginLeft:"50px"
}

const imageBox={
  marginBottom:"10px"
}



export default Upload;