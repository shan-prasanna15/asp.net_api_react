using System.Collections.Generic;

namespace Trips.Data
{
    public interface ITripService
    {
        List<Trip> GetAllTrips();
        Trip GetTripById(int Id);
        Trip UpdateTrip(int Id, Trip trip);

        void AddTrip(Trip trip);
        void DeleteTrip(Trip trip);

    }
}