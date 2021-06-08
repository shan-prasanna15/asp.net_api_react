using System.Collections.Generic;

namespace Trips.Data
{
    public class TripService : ITripService
    {
        public void AddTrip(Trip trip)
        {
            TripData.Trips.Add(trip);
        }

        public void DeleteTrip(Trip trip)
        {
            TripData.Trips.Remove(trip);
        }

        public List<Trip> GetAllTrips()
        {
            return TripData.Trips;
        }

        public Trip GetTripById(int Id) => TripData.Trips.Find(t => t.Id == Id);
        

        public Trip UpdateTrip(int Id, Trip trip)
        {
            if( TripData.Trips.Exists(p => p.Id == trip.Id)){
                    System.Console.WriteLine( $"The update failed as the ID {trip.Id} already exists");                    
            }
            else
            {
                if(TripData.Trips.Exists(p => p.Id == Id))
                {
                    DeleteTrip(GetTripById(Id));
                    AddTrip(trip);
                }   
                else{
                    AddTrip(trip);
                }
            }
            return trip;
        }
    }
}