import React, {Component} from 'react';
import axios from 'axios';

export class Update extends Component{
    constructor(props){
        super(props);

        console.log("In update");

        this.OnChangeName          = this.OnChangeName.bind(this);
        this.OnChangeDescription   = this.OnChangeDescription.bind(this);
        this.OnChangeDateStarted   = this.OnChangeDateStarted.bind(this);
        this.OnChangeDateCompleted = this.OnChangeDateCompleted.bind(this);
        this.onUpdateCancel        = this.onUpdateCancel.bind(this);
        this.onSubmit              = this.onSubmit.bind(this);

        this.state = {
            name : '', 
            description : '',
            dateStarted : null, 
            dateCompleted : null
        }
    }

    componentDidMount(){        
        const {id} = this.props.match.params;        
        console.log("The Id on Component did mount is : "+ id);

        axios.get("api/Trips/GetTripById/"+id).then(
            trip=> 
            {
                const tripData = trip.data;
                this.setState({
                    name : tripData.name,
                    description : tripData.description,
                    dateStarted : new Date(tripData.dateStarted).toISOString().slice(0,10),
                    dateCompleted : tripData.dateCompleted ? new Date(tripData.dateCompleted).toISOString().slice(0,10) : null,
                    }
                )
            }
        )
    }

    OnChangeName(e){
        this.setState({
            name : e.target.value
        });
    }
    OnChangeDescription(e){
        this.setState({
            description : e.target.value
        });
    }
    OnChangeDateStarted(e){
        this.setState({
            dateStarted : e.target.value
        });
    }
    OnChangeDateCompleted(e){
        this.setState({
            dateCompleted : e.target.value
        });
    }
    onUpdateCancel(){
        const {history} = this.props;
        history.push('/trips');
    }        
    
    onSubmit(e){
        e.preventDefault();
        let {history} = this.props;
        const {id} = this.props.match.params;

        let tripObject = {            
            name : this.state.name,
            description : this.state.description,
            dateStarted : new Date(this.state.dateStarted).toISOString().slice(0,10),
            dateCompleted : this.state.dateCompleted ? new Date(this.state.dateCompleted).toISOString().slice(0,10) : null
        };        
        
        console.log("THe trip id : " + tripObject.id);
        console.log( tripObject);
        axios.put("api/Trips/UpdateTrip/"+id, tripObject).then(result =>{
            history.push("/trips");
        });        
        console.log("this right after  the request ");
    }

    render (){        
        return (
            <div className="trip-form" >
            <h3>Update trip</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Trip name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value = {this.state.name}
                      onChange = {this.OnChangeName}
                     />
                </div>
                <div className="form-group">
                    <label>Trip description: </label>
                    <textarea 
                      type="text" 
                      className="form-control"
                      value = {this.state.description}
                      onChange = {this.OnChangeDescription}
                    />
                </div>
                <div className="row">
                    <div className="col col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                            <label>Date of start:  </label>
                            <input 
                              type="date" 
                              className="form-control" 
                              value = {this.state.dateStarted}
                              onChange = {this.OnChangeDateStarted}
                            />
                        </div>
                    </div>
                    <div className="col col-md-6 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label>Date of completion:  </label>
                        <input 
                            type="date" 
                            className="form-control" 
                            value = {this.state.dateCompleted}
                            onChange = {this.OnChangeDateCompleted}
                        />
                        </div>
                    </div>
                </div>
                
                
                <div className="form-group">
                    <button type="submit" className="btn btn-success" >Update</button>
                    <button onClick={this.onUpdateCancel} className="btn btn-default" >Cancel</button>
                </div>
            </form>
        </div>
        )
    }
    
}