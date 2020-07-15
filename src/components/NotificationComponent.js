import React, {Component} from 'react'; 


class Notification extends Component {

constructor(props){
    super(props);

    this.state = {
        comments: this.props.comments.comments,
        user: this.props.auth,
        plants:this.props.plants.plants,
     
    }
  
}
componentDidMount(){
    console.log("user"+ JSON.stringify(this.state.user))
    
 
}

 
render(){

    if(this.state.comments != null){
    
    
    const userplants =this.state.plants.filter(element=> (element.submittedBy === this.state.user.user.displayName || element.submittedBy === this.state.user.user.email))
    
    const userplantIds = []
    userplants.forEach(element=> userplantIds.push(element._id))


    const filterdata = this.state.comments.filter(element=> userplantIds.includes(element.plant))
    filterdata.sort((a, b) => b.createdAt - a.createdAt);
  
  
  

    const commentdata = filterdata.map(element=>{
        var seconds = new Date().getTime() / 1000;

        var planttime= new Date(Date.parse(element.createdAt.toDate()))
        var plantseconds= planttime.getTime()/1000
      
        var days = Math.floor((((seconds-plantseconds)/60)/60)/24)

        let plant = userplants.find(p=> p._id === element.plant)
        let planturl = '/garden/'+plant._id

        return  (
        <div key={element._id}> 
        <span style={hot}>{element.author.firstname}</span> <span style={spacer}> commented on: <a href={planturl}>{plant.name}</a></span> 
        
        <span style={spacer}>
        {days} days ago</span> 
         <br/>
        <br/>
        </div> 
       
        )
      })
      
      
        
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