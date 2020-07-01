import {Breadcrumb, BreadcrumbItem, Button, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

import React, { Component } from "react";
import { storage } from '../firebase/firebase';
import { Control,Form, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const minLength = (len) => (val) => val && (val.length >= len);

class Upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
          image: null,
          url: "",
          progress: 0,

     
        };

        this.handleSubmit = this.handleSubmit.bind(this);
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
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
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
              .child(image.name)
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
        this.props.postPlant(values.source,this.state.url, values.name, values.description, values.scoville,values.category, this.props.auth.user.displayName?this.props.auth.user.displayName: this.props.auth.user.email);
        this.props.resetPlantForm();
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
        return(
            <div className="container-fluid">
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
        
     <div className = "row row-content">
     <div className="col-12 col-md-6" >
   
        <div style = {divStyle} className="file-field input-field" >
          <div className="btn">
            <span>File</span>
            <input type="file" onChange={this.handleChange}  />
          </div>
        </div>

        <div>
        <button onClick={this.handleUpload}>
          Upload
        </button>
        <progress style = {styles} value={this.state.progress} max="100" className="progress" />
        </div>
       
      
        <br />
        <br />
        <img
          src={this.state.url || "https://via.placeholder.com/400x300"}
          alt="Uploaded Images"
          height="300"
          width="400"
        />
      </div>

      <div className="col-12 col-md-6">
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
                                    <Control.text model=".source" id="category" name="category"
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

      }
   
 
const styles = {
  marginLeft: "210px",
  marginTop:"20px",
  color:"green"
}

const divStyle = {
  marginLeft:"150px"
}

export default Upload;