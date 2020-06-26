import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Loading } from './LoadingComponent';

function About(props) {

    const leaders = props.leaders.leaders.map((leader) => {
        
        return (
            <Fade in>
            <RenderLeader leader = {leader} key={leader.id}/>
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
              <Media body className="ml-5">
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
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Working with a small space and limited resources we are doing what we can to bring the <em>HEAT</em> to our urban patio.</p>
                    <img src="/assets/images/kitgarden.jpg" class="img-fluid" alt="Responsive"></img>
                    <p>Our humble garden houses multiple varieties of peppers, basil as well as flower types.</p>  
                </div>
                <div className="col-12 col-md-5" style={positionBox}>
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">June, 2019</dd>
                                <dt className="col-6">Major Stake Holder(s)</dt>
                                <dd className="col-6">Kit + Rita</dd>
                                <dt className="col-6">Last Year's Produce:</dt>
                                <dd className="col-6">Peppers, beans, flowers</dd>
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
                                <p className="mb-0">If you believe you can achieve.</p>
                                <footer className="blockquote-footer">An Old Saying
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
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
    marginTop: "130px"
  }

export default About;    