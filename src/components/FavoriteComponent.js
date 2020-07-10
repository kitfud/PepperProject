import React from 'react';
import { Media, Breadcrumb, BreadcrumbItem, Button, CardBody,CardText,Card } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';


function RenderGardenItem({ plant, deleteFavorite }) {
    let plantHash = '#'+plant._id
    let plantHead = plant._id + 'head'
    console.log(plantHash)
    console.log(plantHead)
    return(
        <div className = "col-6">
   <div class="card">
        <div class="card-header" id={plantHead}>
            <h3 class="mb-0">
                    {plant.name}   
                </h3>
        </div>
            <div class="card-body">
            <Link to={`/garden/${plant._id}`} >
                <Media object width="50%" height="50%" src={plant.image} alt={plant.name} />
                </Link>
                <div className ="row">
                    <div className = "col-12">
                        <div style = {align}>
                        <Button  outline color="danger" onClick={() => deleteFavorite(plant._id)}>
                    <span className="fa fa-times"></span>
                </Button>
                        </div>
                  
                    </div>
              
                </div>
           
        </div>
        
    </div> 
        </div>
     
        
    /* 
   <Media tag="li">
            <Media body >
                <Media heading>{plant.name}</Media>
                <Link to={`/garden/${plant._id}`} >
                <Media object src={plant.image} alt={plant.name} />
                </Link>
                
                <p>{plant.description}</p>
               
            </Media>
        </Media>
      */
     
    );
}

function RenderUploadItems({plant}){
    return(
        <Card>
            <CardBody>
            <Media tag="li">
        <Media >
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

    const filterUploads = props.plants.plants.filter(plant => plant.submittedBy === props.auth.user.displayName || plant.submittedBy ===props.auth.user.email)
    const uploads = filterUploads.map((plant) => {
        return (
           
                <RenderUploadItems key={plant._id} plant={plant} />
          
        );
    })    

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
    else if (props.favorites.favorites.plants.length !==0 || uploads.length !==0) {
     
        console.log(props.plants.plants)

        const favorites = props.favorites.favorites.plants.map((plantId) => {
            let plant = props.plants.plants.filter((plant) => plant._id === plantId)[0];
            if(plant === undefined){
                return null
            }
                return (
                 
                        <RenderGardenItem  key={plant._id} plant={plant} deleteFavorite={props.deleteFavorite} />
                    
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
                <div className="row">
               
                    <div className="col-12 col-md-6">
                    <h3>Favorites:</h3>
                  <div className = "row">
                  {favorites}
                  </div>
                    
                   
                       
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
                    <h4><span style={stylez}>You have no favorites yet!</span><br/>
                     <br/>
                     Head to the <a  href ="/garden"><span style ={styles}>Garden</span></a> and when you are logged in add some plants you like by clicking the heart symbol. Afterwards you will be able to see these plants and also the plants you have uploaded to the garden. You can also access My Garden by Uploading plant via the "Upload" tab above- be sure to log in first before using.</h4>
                </div>
            </div>
        )
    }
}

const styles = {
    color:"blue"
}
const stylez = {
    color:"red"
}
const align = {
    align: "center"
}
export default Favorites;