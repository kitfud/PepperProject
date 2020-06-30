import React from 'react';
import { Card, CardImg, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';


    function RenderGardenItem ({plant,deletePlant}) {
        return (
            <Card
            >
                    <Link to={`/garden/${plant._id}`} >
                    <CardTitle>{plant.name} </CardTitle>    
                    <CardImg width="100%" src={plant.image} alt={plant.name} key={plant.id}/>
                    </Link>
                    <span className="fa fa-trash-o" onClick={() => deletePlant(plant._id)}></span>
            </Card>
        );
    }

    const Garden = (props) => {

        const garden = props.garden.plants.map((pepper) => {
            return (
                <div style= {styles} className="col-12 col-md-4 " key={pepper._id} >
                    <RenderGardenItem plant={pepper} onClick={props.onClick} deletePlant = {props.deletePlant}/>
                </div>
            );
        });
        if (props.garden.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.garden.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{props.garden.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else

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


const styles = {
    marginBottom: "20px"
}    
export default Garden;