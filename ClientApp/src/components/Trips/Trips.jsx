import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { getAllTrips } from '../../actions/tripActions'

export class Trips extends Component{
    constructor(props){
        super(props);

        this.onTripUdate =  this.onTripUdate.bind(this);        

        this.state = {
            trips : [],
            loading : true,
            failed : false,
            error : ""
        }
    }

    componentDidMount(){
        this.props.getAllTrips();
    }

    componentDidUpdate(prevProps){
        if(prevProps.trips.data != this.props.trips.data){
            this.setState({trips: this.props.trips.data})
        }
    }

    onTripUdate(id){
        console.log("Trip id into the onTripUpdate method call is : "+ id);
        const {history} = this.props;
        history.push('/update/'+id);
    }
    onTripDelete(id){
        console.log("Trip id into the onTripUpdate method call is : "+ id);
        const {history} = this.props;
        history.push('/delete/'+id);
    }

    renderAllTripsTable(trips){
        console.log(trips);
        return (            
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Actions</th>
                        </tr>                    
                    </thead>
                    <tbody>
                        {
                            trips.map(trip => (                                
                                <tr key={trip.id}>
                                    <td> {trip.name}</td>
                                    <td> {trip.description}</td>
                                    <td> {new Date(trip.dateStarted).toLocaleDateString()}</td>
                                    <td> {trip.dateCompleted ? new Date(trip.dateCompleted).toLocaleDateString() : 'Incomplete'}</td>
                                    <td> 
                                        <div className="form-group">
                                            <button onClick={()=> this.onTripUdate(trip.id)} className="btn btn-success">
                                                Update
                                            </button>
                                            <button onClick={()=> this.onTripDelete(trip.id)} className="btn btn-danger">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>                                    
                            ))
                            
                        }
                        
                    </tbody>
                </table>
            </div>
            
        );
    }

    render(){
        // let content = this.state.loading ? (
        //     <p>
        //         <em>loading...</em>
        //     </p>
        // ) : (this.state.failed) ? (
        //     <div className="text-danger">
        //         <p>
        //             <em>{this.state.error}</em>
        //         </p>
        //     </div>
        // ):
        // (
        //     this.renderAllTripsTable(this.state.trips)
        // )

        let content = this.props.trips.loading? (
            <p>
                <em> Loading...</em>
            </p>
        ) : (
            this.state.trips.length && this.renderAllTripsTable(this.state.trips)
        );

        return(
            <div>
                <h1>Trip information</h1>
                <p>displaying information about all the trips</p>
                {content}
            </div>
        );
    }
    
}

const mapStateToProps = ({trips}) => ({
    trips
});

export default connect(mapStateToProps, {getAllTrips})(Trips);

