import React, { Component } from 'react';
import { Card, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem, CardImgOverlay,Button, Row, Col, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentFormComponent';
import { Loading } from './LoadingComponent';
import {Modal, ModalHeader, ModalBody,
     Label } from 'reactstrap';
    import { Control, LocalForm, Errors } from 'react-redux-form';
import { storage } from '../firebase/firebase';

import $ from 'jquery';
import 'bootstrap';


function RenderUpdates({updates, deleteUpdate, plant,toggleMainImageModal,toggleCommentModal, auth}){


        if(updates != null && updates.length !== 0){

            const updatePlants = updates.map((info) => 
            <div className="col-12 col-md-4 " key={info._id}>
            <Card style = {cardStyle} >
            <p style = {textStyle}>{info.comment}</p>
            <CardBody>
            <CardImg data-toggle="modal" data-target="#myModal" width="100%" top src={info.images} alt="" />
            </CardBody>
            <span className="fa fa-trash-o" onClick={() => (auth.isAuthenticated ===true && auth.user.displayName === plant.submittedBy) || (auth.isAuthenticated===true&&auth.user.email === plant.submittedBy) ? window.confirm('are you sure you want to delete this update?')? deleteUpdate(plant._id, info.images) :alert("another time"): alert("login to delete plants. You can only delete YOUR plants.")}></span>
            </Card>
            <CardText>Switch To Main Image:  <span className="fa fa fa-refresh" onClick={()=>toggleMainImageModal(info.images)}></span> </CardText>
           
            <CardText>Update Comment: <span className="fa fa fa-pencil" onClick={()=>toggleCommentModal(info.images)}></span></CardText>
            
            </div>
           
          
    )
    return (
        
         updatePlants
       
        
    )
           }
           else{
               return(<div className="col-12">
                <div style = {align}>No Updates Posted</div>
               </div>
                
               ) 
              
           }
    
}


function RenderPlant({plant,favorite, postFavorite, deleteFavorite, auth}){


const dataArray= [{category:"Description: ",data:plant.description}, {category:"Submitted By: ", data: plant.submittedBy}];


if(plant.scoville){
    let scovilleString = plant.scoville +" Scoville Units"
    dataArray.push({category: "Description: ", data: scovilleString})
}
if(plant.source){
    let sourceString = plant.source
    dataArray.push({category:"Seed Source: ",data: sourceString})
}
if(plant.category){
    let categoryString =  plant.category
    dataArray.push({category:"Category:" ,data:categoryString})
}
if(plant.sown){
    let sownString = plant.sown
    dataArray.push({category:"Plant Sown", data:sownString})
}
if(plant.transplant){
    let transplantString = plant.transplant
    dataArray.push({category:"Transplant Date: ", data:transplantString})
}
if(plant.fruits){
    let fruitString =  plant.fruits
    dataArray.push({category:"# Fruits: ", data: fruitString})
}

if(dataArray != null){

    const rendata = dataArray.map((info) =>

  <span key={info.data}>
  <span style = {hot}>{info.category}</span> <span > {info.data} </span> <br/>
   <br/>
    </span>  
    )

return (   
        
    <Card key={plant._id}>
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
     
     {rendata}
     
     </CardText>  
      
    </Card> 
   
     )
      
   }

      }
       
       
       
       function RenderComments({comments,postComment, plantId,deleteComment,auth, plant}){  
  
       if(comments != null){
        const rencomment = comments.map((info) => 
        <Card style = {cardStyle}  key={info._id}>
       
        <ol>
        <p style = {textStyle}>{info.comment}</p>
        <p>-- {info.author.firstname}<span> </span>
        {new Intl.DateTimeFormat('en-US', 
        { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(info.updatedAt.toDate())))}
         
       
         <span style={buttonStyle} className="fa fa-trash-o" onClick={() =>{if(window.confirm('are you sure you want to delete this comment?')) deleteComment(info) }}></span>
        

        </p>
        </ol> 
        
        </Card>
      
);
           //console.log("about to return JSX")    
           return(
           <div  >
              
                 {rencomment} 
                
           
           <CommentForm plantId={plantId} postComment={postComment} authenticate={auth} plantOwner = {plant.submittedBy}/> 
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

      this.toggleCommentModal = this.toggleCommentModal.bind(this);
      this.toggleCommentModalHandleClose = this.toggleCommentModalHandleClose.bind(this);
      this.handleSubmitCommentModal = this.handleSubmitCommentModal.bind(this);

      this.toggleImageModal = this.toggleImageModal.bind(this);
      this.toggleImageHandleClose = this.toggleImageHandleClose.bind(this);

      this.toggleMainImageModal = this.toggleMainImageModal.bind(this);
      this.toggleMainImageHandleClose = this.toggleMainImageHandleClose.bind(this);

      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleUpload = this.handleUpload.bind(this);

      this.handleMainImageUpdate = this.handleMainImageUpdate.bind(this);
        //this.test = this.test.bind(this);
   
        this.state = {
          isModalOpen: false,
          show: false,
          showMainImageModal:false,
          showCommentModal: false,
          image: null,
          url: "",
          progress: 0,
          updateURL:"",
         
        };

      
        
      }

      componentDidMount(){
       //console.log("user:"+JSON.stringify(this.state.user))
    
      

        $(document).ready(function () {
            $('img').on('click', function () {
                var image = $(this).attr('src');
                console.log(image)
                $('#myModal').on('show.bs.modal', function () {
                    $(".img-responsive").attr("src", image);
                });
              
             
            });
        });

      
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

    toggleImageModal(){
        if(this.props.auth.isAuthenticated){
            if(this.props.auth.user.displayName === this.props.plant.submittedBy || this.props.auth.user.email === this.props.plant.submittedBy){
                this.setState({
                    show: !this.state.show
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

    toggleImageHandleClose(){
        this.setState({show:!this.state.show})
    }

    toggleCommentModal(val){
        if(this.props.auth.isAuthenticated){
            if(this.props.auth.user.displayName === this.props.plant.submittedBy || this.props.auth.user.email === this.props.plant.submittedBy){
                console.log(val)
                let input = val
                this.setState({
                    updateURL: input,
                },() => 
                console.log(this.state.updateURL))
        
                this.setState({
                    showCommentModal: !this.state.showCommentModal
                })
            }
            else{
                alert("you can only update comments for plants YOU have added to the garden")
            }   
       
           }   
          
            else{
                alert("Login to edit plant update comments")
            }


     
    }

    handleSubmitCommentModal(values){
    this.props.updateComment(this.props.plant._id, this.state.updateURL, values.commentUpdate)
    } 

    toggleCommentModalHandleClose(){
        this.setState({showCommentModal:!this.state.showCommentModal})
    }

    toggleMainImageModal(val){
        if(this.props.auth.isAuthenticated){
            if(this.props.auth.user.displayName === this.props.plant.submittedBy || this.props.auth.user.email === this.props.plant.submittedBy){
                //console.log(val)
                let input = val
                this.setState({
                    updateURL: input,
                },() => 
                console.log(this.state.updateURL))
           
                this.setState({
                    showMainImageModal:!this.state.showMainImageModal
                })
            }
            else{
                alert("you can only edit plants YOU have added to the garden")
            }   
       
           }   
          
            else{
                alert("Login to edit plants")
            }


      
      
    }

    toggleMainImageHandleClose(){
        this.setState({
            showMainImageModal:!this.state.showMainImageModal
        })
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

    handleUpdate(values){
       
        //alert(("id:"+this.props.plant._id+ " url:"+this.state.url+" comment:"+values.commentUpdate))
        this.toggleImageHandleClose();
        this.props.postUpdate(this.props.plant._id, this.state.url, values.commentUpdate)
    }

    handleMainImageUpdate(values){
        if(values.commentMainUpdate === undefined || values.commentMainUpdate.length===0){
            values.commentMainUpdate = "";
        }
       
        //alert(("id:"+this.props.plant._id+ " url:"+this.state.url+" comment:"+values.commentUpdate))
        this.toggleMainImageHandleClose();
        this.props.updateMainPlantImage(this.props.plant._id, this.props.plant.image,this.state.updateURL,values.commentMainUpdate)
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

<div id="myModal" className="modal fade" role="dialog">
    <div className="modal-dialog" >
        <div style = {modalContent} className="modal-content">
            <div style={modalBody} className="modal-body">
              
                    
                    <img id="previewImg" className="img-responsive" src="" alt=""/>
                
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<Modal isOpen={this.state.showCommentModal} toggle={this.toggleCommentModalHandleClose}>
        <ModalHeader toggle={this.toggleCommentModalHandleClose}> Update Comment:</ModalHeader>

                    <ModalBody>
                        

<LocalForm model="updateComment" onSubmit={(val) => this.handleSubmitCommentModal(val)}>
                    
                    <Row className="form-group">
                    
                                <Col md={10}>
                                    <Control.text model=".commentUpdate" id="commentUpdate" name="commentUpdate"
                                        placeholder="Comment"
                                        className="form-control"
                                         />
                                </Col>
                                </Row>

                                <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                   Update Comment!
                                    </Button>
                                </Col>
                            </Row>

                           
</LocalForm>



                    </ModalBody>
        </Modal>  








<Modal isOpen={this.state.showMainImageModal} toggle={this.toggleMainImageHandleClose}>
        <ModalHeader toggle={this.toggleMainImageHandleClose}> Update Image: <span style = {hot}>optional: save a comment with replaced plant profile picture</span></ModalHeader>

                    <ModalBody>
                        

<LocalForm model="update" onSubmit={(val) => this.handleMainImageUpdate(val)}>
                    
                    <Row className="form-group">
                    
                                <Col md={10}>
                                    <Control.text model=".commentMainUpdate" id="commentMainUpdate" name="commentMainUpdate"
                                        placeholder="Comment"
                                        className="form-control"
                                         />
                                </Col>
                                </Row>

                                <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                   Update Main Plant Picture!
                                    </Button>
                                </Col>
                            </Row>

                           
</LocalForm>



                    </ModalBody>
        </Modal>  


            
       <Modal isOpen={this.state.show} toggle={this.toggleImageHandleClose}>
        <ModalHeader toggle={this.toggleImageHandleClose}> Update Image: <span style = {hot}>add an updated picture</span></ModalHeader>

                    <ModalBody>
                        <div className="container">

                        <div className="row file-field input-field" >
          <div className="btn">
            <input type="file" onChange={this.handleChange}  />
          </div>
        </div>
                        

                        <div className ="row align-items-center">
       <div className="col align-items-center">
       <span className = " align-items-center no-box-sizing no-gutters" >
       <button onClick={()=>{if(window.confirm('are you sure you want to upload this image?'))this.handleUpload()}}>
      
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
        <div className = "row align-items-center">
        <div style = {{padding:"0px"}}className = "col-12">
        <img
          className = "img-responsive"
          src={this.state.url || "https://via.placeholder.com/400x300"}
          alt="Uploaded Images"
          height="300"
          width="100%"
          style={imageBox}
        />
        </div>
       
        </div>
     

<LocalForm model="update" onSubmit={(val) => this.handleUpdate(val)}>
                    
                    <Row className="form-group align-items-center">
                                <Label htmlFor="commentUpdate" md={2}>Update Comment:</Label>

                                <Col md={10}>
                                    <Control.text model=".commentUpdate" id="commentUpdate" name="commentUpdate"
                                        placeholder="Comment (optional)"
                                        className="form-control"
                                         />
                                </Col>
                                </Row>

                                <Row className="form-group align-items-center">
                                <Col md={{size:10, offset: 2}}>
                                    <Button style = {{marginTop:"10px"}}type="submit" color="primary">
                                   Update!
                                    </Button>
                                </Col>
                            </Row>

                            
</LocalForm>


</div>
                    </ModalBody>
        </Modal>  
    


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
                <span style = {cardButtons} className="fa fa-pencil-square-o" onClick={this.toggleModal}> Edit Details</span>
                <span style = {cardButtons} className="fa fa-file-image-o" onClick={this.toggleImageModal}> Add Image To Diary</span>
            </div>
            <div className="col-12 col-md-5 m-1">
            <hr style= {linestyles}  />
                                    <div>Plant Favorited {this.props.allfavorites? this.props.allfavorites.filter((fav)=>fav.plant===this.props.plant._id).length: null} Times By App Users</div>
        <hr style= {linestyles}  />
                <RenderComments comments={this.props.comments}
                postComment={this.props.postComment}
                plantId={this.props.plant._id} 
                deleteComment = {this.props.deleteComment}
                auth={this.props.auth}
                plant = {this.props.plant}/>
            </div>
        </div>

        <hr style= {linestyles}  />
        <h3>{this.props.plant.name} Image Diary:</h3>
        <div className="row">
        <RenderUpdates updates={this.props.updates} 
        toggleCommentModal = {this.toggleCommentModal}
        auth = {this.props.auth}
        plant={this.props.plant} deleteUpdate={this.props.deleteUpdate} toggleMainImageModal ={this.toggleMainImageModal} />
        </div>

        </div>
       
       );
       
       else
       return(
           <div></div>
       );
       
   }   
       
       
       }

const modalBody ={
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0"

}   

const modalContent = {
    height: "auto",
    minHeight: "100%",
    borderRadius: "0"
}
const linestyles = {
    border:"2px solid black"
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

const cardButtons = {
    marginRight: "10px"
}

const align = {
    align: "center"
}



const imageBox={
    marginBottom:"10px",
    marginLeft:"5px"
  }

  const styles = {
    marginLeft: "0px",
    marginTop:"20px",
    paddingRight:"0px",
    paddingLeft:"0px",
    color:"green"
  }

  export default PlantDetails;