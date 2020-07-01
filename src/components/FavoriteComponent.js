import React from 'react';
import { Media, Breadcrumb, BreadcrumbItem, Button, CardBody,Card } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';


function RenderGardenItem({ plant, deleteFavorite }) {
    return(
        <Media tag="li">
            <Media body className="ml-5">
                <Media heading>{plant.name}</Media>
                <Media object src={plant.image} alt={plant.name} />
                <p>{plant.description}</p>
                <Button outline color="danger" onClick={() => deleteFavorite(plant._id)}>
                    <span className="fa fa-times"></span>
                </Button>
            </Media>
        </Media>
    );
}

function RenderUploadItems({plant}){
    return(
        <Card>
            <CardBody>
            <Media tag="li">
        <Media body className="ml-5">
        <Link to={`/garden/${plant._id}`} >
            <Media heading  > {plant.name}</Media>
            </Link>  
        </Media>
    </Media>
            </CardBody>
        </Card>
     
    )
}

const Favorites = (props) => {

    if (props.favorites.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.favorites.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.favorites.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (props.favorites.favorites.plants.length !==0) {
     
        console.log(props.plants.plants)

        const favorites = props.favorites.favorites.plants.map((plantId) => {
            let plant = props.plants.plants.filter((plant) => plant._id === plantId)[0];
            if(plant === undefined){
                return null
            }
                return (
                    <div key={plant._id} className="col-12 col-sm-4">
                        <RenderGardenItem plant={plant} deleteFavorite={props.deleteFavorite} />
                    </div>
                );
            })

            const filterUploads = props.plants.plants.filter(plant => plant.submittedBy === props.auth.user.displayName || plant.submittedBy ===props.auth.user.email)


            const uploads = filterUploads.map((plant) => {
                    return (
                        <div key={plant._id} className="col-12 mt-5">
                            <RenderUploadItems plant={plant} />
                        </div>
                    );
                })

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>My Garden</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>My Garden</h3>
                        <hr />
                    </div>
                </div>
                <div className="container row">
                    <div className="col-12 col-md-6">
                    <h3>Favorites:</h3>
                    <Media list>
                        {favorites}
                    </Media>
                    </div>
                    <div className = "col-12 col-md-6">
                        <h3>Uploaded Plants:</h3>
                        <Media list>
                        {uploads}
                    </Media>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return(
            <div className="container">
                <div className="row">
                    <h4>You have no favorites! Head to the <a href ="/garden">Garden</a> and add some plants you like :)</h4>
                </div>
            </div>
        )
    }
}
export default Favorites;