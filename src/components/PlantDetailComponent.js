import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentFormComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Loading } from './LoadingComponent';

    function RenderPlant({plant}){
        return (   
            <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
       <Card key={plant.id}>
           <CardImg width="100%" top src={baseUrl + plant.image} alt={plant.name} />
           <CardTitle>{plant.name}</CardTitle>
           <CardText>{plant.description}</CardText>   
       </Card> 
       </FadeTransform>
        )}
       
       
       
       function RenderComments({comments,postComment, plantId}){  
  
       if(comments != null){
        const rencomment = comments.map((info) => 
        <Fade in>
        <ol key={info.id}>
        {console.log(info.id)}
        <p>{info.comment}</p>
        <p>-- {info.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(info.date)))}</p>
        </ol>  
        </Fade>  
);
           console.log("about to return JSX")    
           return(
           <div>
                 <Stagger in>
                 {rencomment} 
                 </Stagger>
           
           <CommentForm plantId={plantId} postComment={postComment}/> 
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
                <RenderPlant plant={props.plant} />
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments}
                postComment={props.postComment}
                plantId={props.plant.id} />
            </div>
        </div>
        </div>
       
       );
       
       else
       return(
           <div></div>
       );
       
       }
       
    

export default PlantDetails;