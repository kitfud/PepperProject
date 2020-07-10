import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media,CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Fade} from 'react-animation-components';
import { Loading } from './LoadingComponent';

function About(props) {

    const leaders = props.leaders.leaders.map((leader) => {
        
        return (
            <Fade in key={leader._id}>
            <RenderLeader leader = {leader} />
           </Fade> 
        );
    });

    function RenderLeader({leader}){
        return (
            <div key={leader.id} className="col-12 mt-5">
            <Media tag="li">
              <Media left middle>
                  <Media object style={imgStyle} src={leader.image} alt={leader.name} />
              </Media>
              <Media body className="ml-3">
                <Media heading>{leader.name}</Media>
                <p>{leader.description}</p>
              </Media>
            </Media>
          </div>
        )
        }
        if (props.leaders.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.leaders.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{props.leaders.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else

    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>                
            </div>
            <div style ={{padding:"20px"}}className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Working with a small space and limited resources we are doing what we can to bring the <em>HEAT</em> to our urban balcony.</p>
                    <img src="/assets/images/kitgarden.jpg" className="img-fluid" alt="Responsive"></img>
                    <p>Our humble garden houses multiple varieties of peppers, basil as well as flowers and is the inspiration behind this web application.</p>  
                </div>

                        
                <div className="col-12 col-md-5" style={positionBox}>
                <Card style = {{marginBottom:"5px"}}>
                        <CardHeader style={header} className=" text-white">How To Use Kit's Garden:</CardHeader>
                        <CardBody>
                         <CardText>
                        This application is an online repository for everyone's garden plants. <br/>
                        <br/>
                        Once you <span style={{color:"green"}}>"Login"</span>, through the <span style={{color:"green"}}>"Upload"</span> tab you can store images of a plant, update images as it grows, as well as log 
                        information about it.<br/> 
                        <br/> 
                        All uploaded plants go to the shared <a href="/garden"><span  style={{color:"blue"}}>"Garden"</span> </a> tab which is a searchable collection of plants. For each plant image you can "favorite" it by selecting the heart button overlaying the image which will
                        save the plant within your personalized <span style={{color:"green"}}> "My Garden" </span> tab. <br/> 
                        <br/> 

                        Have fun exploring the garden and I welcome you to contribute some plants :)  
                
                         </CardText>
                        </CardBody>
                    </Card>


                    <Card style = {{marginBottom:"5px"}}>
                        <CardHeader style={header} className=" text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Project Started</dt>
                                <dd className="col-6">June, 2019</dd>
                                <dt className="col-6">Major Stake Holder(s)</dt>
                                <dd className="col-6">Kit + Rita</dd>
                                <dt className="col-6">What We Grow</dt>
                                <dd className="col-6">Peppers, flowers, basil</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">2.5</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>


              
             
              

                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">"If you believe you can achieve."</p>
                                <footer className="blockquote-footer">-A Timeless Saying
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
                
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Contributors:</h2>
                </div>
                <div className="col-12">
                    <Media list>
                        {leaders}
                    </Media>
                </div>
            </div>
        </div>
    );
}

const imgStyle = {
    maxHeight: 128,
    maxWidth: 128
  }

  const positionBox = {
    marginTop: "40px"
  }

  const header = {
      background:"green"
  }

export default About;    