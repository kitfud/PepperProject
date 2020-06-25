import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';

class PlantDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plant: props
    }
}


renderComments(plantSelect){  



if(plantSelect != null){

    const rencomment = plantSelect.map((info) => 
      
    <li key={info.id}>
    {console.log(info.id)}
    <p>{info.comment}</p>
    <p>-- {info.author}, {info.date}</p>
  </li>  
     
);



    console.log("about to return JSX")    
    return rencomment   
}
else{
    return <div></div>;
}


}


render(){
const plant= this.props.plant

if (plant != null)
return( 
<div className = "container">
<div className = "row">

<div  className="col-12 col-md-5 m-1">
<Card key={plant.id}>
    <CardImg width="100%" top src={plant.image} alt={plant.name} />
    <CardTitle>{plant.name}</CardTitle>
    <CardText>{plant.description}</CardText>   
</Card> 
</div> 

<div  className="col-12 col-md-5 m-1">
<h4>Comments:</h4>
<ul className="list-unstyled">
{this.renderComments(plant.comments)}
</ul>
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

export default PlantDetails;