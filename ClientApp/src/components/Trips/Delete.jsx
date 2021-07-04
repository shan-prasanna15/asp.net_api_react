import React, {Component} from 'react';
import axios from 'axios';

export class Delete extends Component{
    constructor(props){
        super(props);

        console.log("In Delete");

        this.OnCancelDelete        = this.OnCancelDelete.bind(this);
        this.onConfirmDelete       = this.onConfirmDelete.bind(this);  

        this.state = {
            name : '', 
            description : '',
            dateStarted : null, 
            dateCompleted : null
        }
    }

    componentDidMount(){        
        const {id} = this.props.match.params;        
        console.log("The Id on Component did mount In Delte is : "+ id);

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


    OnCancelDelete(){
        const {history} = this.props;
        history.push('/trips');
    }        
    
    onConfirmDelete(e){  
        let {history} = this.props;
        const {id} = this.props.match.params;

        let tripObject = {            
            name : this.state.name,
            description : this.state.description,
            dateStarted : new Date(this.state.dateStarted).toISOString().slice(0,10),
            dateCompleted : this.state.dateCompleted ? new Date(this.state.dateCompleted).toISOString().slice(0,10) : null
        };        
        
        console.log( tripObject);
        axios.delete("api/Trips/DeleteTrip/"+id).then(result =>{
            history.push("/trips");
        });        
        console.log("this right after  the request ");
    }

    render (){        
        return (
            <div style={{ marginTop: 10 }}>
                <h2>Delete trip confirmation</h2>
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title"> {this.state.name} </h4>
                        <p class="card-text"> {this.state.description} </p>
                        <div className="form-group">
                            <button onClick={this.onConfirmDelete} className="btn btn-danger" >Delete test</button>
                            <button onClick={this.OnCancelDelete} className="btn btn-default" >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
    
}