import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';

    import { Loading } from './LoadingComponent';
    
    import { FadeTransform } from 'react-animation-components';

function RenderCard({item , isLoading, errMess}) {
    if (isLoading) {
        return(
                <Loading />
        );
    }
    else if (errMess) {
        return(
                <h4>{errMess}</h4>
        );
    }
    else 
    return(
        <FadeTransform
        in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
        <Card className = "h-100">
            <CardImg src={item.image} alt={item.name} />
            <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
            <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
        </FadeTransform>
    );

}

function Home(props) {
    return(
        <div className="container">
            <div className= "row">
       <h3 style={{color:"green",marginLeft:"19px"}}>New? Click <a href="/aboutus"><span style={{color:"blue"}}>HERE</span></a> to learn about this application.</h3>
            </div>

            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <a href = "/garden">
                    <RenderCard item={props.plant}
                   isLoading={props.plantsLoading} errMess={props.plantsErrMess}
                    />
                    </a>
                   
                </div>


               
                <div className="col-12 col-md m-1">
                <a href="/contactus">
                    <RenderCard item={props.promotion} isLoading={props.promoLoading} errMess={props.promoErrMess} />
                    </a>
                </div>
               
               
                
                <div className="col-12 col-md m-1">
                    <a href = "/aboutus">
                    <RenderCard item={props.leader} 
                    isLoading={props.leaderLoading} 
                    errMess={props.leaderErrMess}
                    />
                    </a>
                    
                </div>
            </div>
        </div>
    );
}

export default Home;