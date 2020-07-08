import React,{Component} from 'react';
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
                    <span className="fa fa-trash-o" onClick={() => deletePlant(plant._id, plant.image)}></span>
            </Card>
        );
    }

class Garden extends Component  {


  constructor(props) {
    super(props);

    this.plantsFilterOnChange = this.plantsFilterOnChange.bind(this);
 

    this.state = {
      plants: this.props.garden.plants,
      inputValue:''
    };
  }

  plantsFilterOnChange = (event) => {
    console.log("onChange activated!", event.target.value)
    this.setState({
        inputValue: event.target.value
    })
  }

  render(){
    const filteredPlants = this.state.plants.filter(plant =>{
        return plant.name.toLowerCase().includes(this.state.inputValue.toLowerCase())
    })


    const garden = filteredPlants.map((pepper) => {
        return (
            <div style= {styles} className="col-12 col-md-4 " key={pepper._id} >
                <RenderGardenItem plant={pepper} onClick={this.props.onClick} deletePlant = {this.props.deletePlant}/>
            </div>
        );
    });
    if (this.props.garden.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (this.props.garden.errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{this.props.garden.errMess}</h4>
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
                <label htmlFor = "search">Search for a plant by name: &nbsp; </label>
                <input type ="text" defaultValue={this.state.inputValue} onChange={this.plantsFilterOnChange}/>
                <hr />

            </div>                
        </div>
        <div className="row">
            {garden}
        </div>
    </div>
    );
  }

 
    }

export default Garden;

const styles = {
    marginBottom: "20px"
}    
