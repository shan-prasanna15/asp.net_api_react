import React, {Component} from 'react';

export class Trips extends Component{
    constructor(props){
        super(props);

        this.state = {
            trips : [],
            loading : false
        }
    }

    renderAllTripsTable(trips){
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
                        <tr>
                            <td> temp name A</td>
                            <td> temp desc </td>
                            <td> temp start date</td>
                            <td> temp end date</td>
                            <td> actions</td>
                        </tr>
                        <tr>
                            <td> temp name A</td>
                            <td> temp desc </td>
                            <td> temp start date</td>
                            <td> temp end date</td>
                            <td> actions</td>
                        </tr>                    
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