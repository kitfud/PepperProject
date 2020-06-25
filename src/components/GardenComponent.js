import React from 'react';
import { Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


    function RenderGardenItem ({plant, onClick}) {
        return (
            <Card
                >
                    <Link to={`/garden/${plant.id}`} >
                    <CardImg width="100%" src={plant.image} alt={plant.name} />
                <CardImgOverlay>
                    <CardTitle>{plant.name}</CardTitle>
                </CardImgOverlay>
                    </Link>
             
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
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Garden</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Garden</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                {garden}
            </div>
        </div>
        );
    }


export default Garden;