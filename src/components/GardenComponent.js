import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';


    function RenderGardenItem ({plant, onClick}) {
        return (
            <Card
                >
                <CardImg width="100%" src={plant.image} alt={plant.name} />
                <CardImgOverlay>
                    <CardTitle>{plant.name}</CardTitle>
                </CardImgOverlay>
            </Card>
        );
    }

    const Garden = (props) => {

        const garden = props.garden.map((pepper) => {
            return (
                <div className="col-12 col-md-5 m-1"  key={pepper.id}>
                    <RenderGardenItem plant={pepper} onClick={props.onClick} />
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {garden}
                </div>
            </div>
        );
    }


export default Garden;