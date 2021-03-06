import React, {Component} from 'react';
import axios from 'axios';

export class Create extends Component{
    constructor(props){
        super(props);       
        console.log("In Create");
        this.OnChangeName          = this.OnChangeName.bind(this);
        this.OnChangeDescription   = this.OnChangeDescription.bind(this);
        this.OnChangeDateStarted   = this.OnChangeDateStarted.bind(this);
        this.OnChangeDateCompleted = this.OnChangeDateCompleted.bind(this);
        this.onSubmit              = this.onSubmit.bind(this);

        this.state = {
            name : '', 
            description : '',
            dateStarted : null, 
            dateCompleted : null
        }
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
    onSubmit(e){
        e.preventDefault();
        let {history} = this.props;

        let tripObject = {
            id  : Math.floor(Math.random()*1000),
            name : this.state.name,
            description : this.state.description,
            dateStarted : this.state.dateStarted,
            dateCompleted : this.state.dateCompleted
        };
        console.log(tripObject);
        console.log("this right above the request ");
        axios.post("api/Trips/AddTrip", tripObject).then(result =>{
            history.push("/trips");
        });
        console.log("this right after  the request ");
    }

    render (){        
        return (
            <div className="trip-form" >
            <h3>Add new trip</h3>
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
                    <input type="submit" value="Add trip" className="btn btn-primary"/>
                </div>
            </form>
        </div>
        )
    }
    
}