import React from 'react';
import { Card, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem, CardImgOverlay,Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentFormComponent';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Loading } from './LoadingComponent';

    function RenderPlant({plant,favorite, postFavorite, deleteFavorite, auth}){
        return (   
            <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
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
           <CardTitle>{plant.name}</CardTitle>
           <CardText>
        {plant.description} <br></br>
        <text style = {hot}>Hotness:</text> {plant.scoville} Scoville Units
           </CardText>  
         
       </Card> 
       </FadeTransform>
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
       
       
       const PlantDetails = (props)=>{
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
       
       else if (props.plant != null)
       
       return( 
        <div className="container">
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/garden">Garden</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.plant.name}</BreadcrumbItem>
            </Breadcrumb>

            <div className="col-12">
                <h3>{props.plant.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderPlant plant={props.plant} favorite={props.favorite} postFavorite={props.postFavorite} deleteFavorite={props.deleteFavorite} auth={props.auth}/>
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments}
                postComment={props.postComment}
                plantId={props.plant._id} 
                deleteComment = {props.deleteComment}
                auth={props.auth}/>
            </div>
        </div>
        </div>
       
       );
       
       else
       return(
           <div></div>
       );
       
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

