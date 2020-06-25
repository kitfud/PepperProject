import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderPlant({plant}){
        return (   
       
       <Card key={plant.id}>
           <CardImg width="100%" top src={plant.image} alt={plant.name} />
           <CardTitle>{plant.name}</CardTitle>
           <CardText>{plant.description}</CardText>   
       </Card> 
       
        )}
       
       
       
       function RenderComments({comments}){  
  
       if(comments != null){
        const rencomment = comments.map((info) => 
             
        <ol key={info.id}>
        {console.log(info.id)}
        <p>{info.comment}</p>
        <p>-- {info.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(info.date)))}</p>
        </ol>  
         
);
           console.log("about to return JSX")    
           return rencomment   
       }
       else{
           return <div></div>;
       }
       }
       
       
       const PlantDetails = (props)=>{
       
       if (props.plant != null)
       
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
                <RenderComments comments={props.comments} />
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