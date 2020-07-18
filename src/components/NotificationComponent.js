import React, {Component} from 'react'; 
import { auth } from 'firebase';
import { Link } from 'react-router-dom';


class Notification extends Component {

constructor(props){
    super(props);

    this.state = {
        comments: this.props.comments.comments,
        user: this.props.auth.user,
        plants:this.props.plants.plants,        
    }
  
}

componentDidMount(){
    this.props.resolveNotifications(this.state.user)
    console.log(auth.currentUser? "CURRENT USER IS"+ auth.currentUser : "THERE IS NO CURRENT USER")
}

 
render(){

    if(this.state.comments != null){
    
    
    const userplants =this.state.plants.filter(element=> (element.submittedBy === this.state.user.displayName || element.submittedBy === this.state.user.email))
    
    const userplantIds = []
    userplants.forEach(element=> userplantIds.push(element._id))


    const filterdata = this.state.comments.filter(element=> userplantIds.includes(element.plant))
    filterdata.sort((a, b) => b.createdAt - a.createdAt);
  
  
  
if(filterdata.length !==0){
    var commentdata = filterdata.map(element=>{
        var seconds = new Date().getTime() / 1000;

        var planttime= new Date(Date.parse(element.createdAt.toDate()))
        var plantseconds= planttime.getTime()/1000
      
        var days = Math.floor((((seconds-plantseconds)/60)/60)/24)

        let plant = userplants.find(p=> p._id === element.plant)
        let planturl = '/garden/'+plant._id

        return  (
        <div key={element._id}> 
        <span style={hot}>{element.author.firstname}</span> <span style={spacer}> commented on: <Link onClick={this.props.closeModal} style = {linkstyle} to={planturl}>{plant.name}</Link></span>

        <span style={spacer}>
        {parseInt(days) === 0? "today": days + " days ago"} </span> 
         <br/>
        <br/>
        <hr />
        </div> 
         
       
        )
      })
}
else{
    commentdata = <div><h1>No updates available. User comments on your uploaded plant(s) will appear here.</h1> </div>
}
    
      
      
        
    return(
        <h1>{commentdata}</h1>
        )
}

}

}

export default Notification;

const hot = {
    color:"red"
}

const spacer = {
    marginLeft:"10px"
}

const linkstyle = {
    color: "blue"
}