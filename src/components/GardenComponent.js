import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

import PlantDetails from './PlantDetailComponent';

class Garden extends Component {
    constructor(props) {
        super(props);

        this.state = {
        selectedPlant: null
        };
    }

    onPlantSelect(plant) {
        this.setState({ selectedPlant: plant});
    }

    renderPlant(plant){
        if(plant != null)
        return(
            <Card>
            <CardImg top src={plant.image} alt={plant.name} />
            <CardBody>
              <CardTitle>{plant.name}</CardTitle>
              <CardText>{plant.description}</CardText>
            </CardBody>
        </Card> 
        )
        else
            return(
                <div></div>
            );
    }
   
    render() {
        

        const garden = this.props.garden.map((pepper) => {
            return (
                <div  className="col-12 col-md-5 m-1">
                <Card key={pepper.id}
                  onClick={() => this.onPlantSelect(pepper)}>
                  <CardImg width="100%" src={pepper.image} alt={pepper.name} />
                  <CardImgOverlay>
                      <CardTitle style={textStyle}>{pepper.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
              </div>
            );
        });

        return (
          <div className="container">
            <div className="row">
                  {garden} 
            </div>
           
                  <div  className="row">
                  <PlantDetails plant={this.state.selectedPlant}/>
                  </div>
               

          </div>
        );
    }
}


const imgStyle = {
    maxHeight: 128,
    maxWidth: 128
  }
  const textStyle=
  {
      color: "black",
      fontSize: 30
      
      
  }
export default Garden;