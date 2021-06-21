import React, {Component} from 'react';
import axios from 'axios';

export class Trips extends Component{
    constructor(props){
        super(props);

        this.state = {
            trips : [],
            loading : true
        }
    }

    populateTripsData(){
        axios.get("api/Trips/GetTrips").then(result =>{
            const response = result.data;
            this.setState({trips : response, loading: false});
            // console.log(this.state.trips);
            console.log("Lodaing of the data form the api is complete")
    })
    }

    componentDidMount(){
        this.populateTripsData();
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
                                    <td> actions</td>
                                </tr>                                    
                            ))
                            
                        }
                        
                    </tbody>
                </table>
            </div>
            
        );
    }

    render(){
        let content = this.state.loading ? (
            <p>
                <em>loading...</em>
            </p>
        ) : (
            this.renderAllTripsTable(this.state.trips)
        )

        return(
            <div>
                <h1>Trip information</h1>
                <p>displaying information about all the trips</p>
                {content}
            </div>
        );
    }
    
}