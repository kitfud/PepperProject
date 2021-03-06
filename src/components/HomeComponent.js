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
       {props.auth ?  <div className="row align-items-start">
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
            </div>:<div style = {loginStyle}><em>Login First to Access Kit's Garden </em></div> }

          
        </div>
    );
}

const loginStyle = {
    fontSize: "20px"
}
export default Home;