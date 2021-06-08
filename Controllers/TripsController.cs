using Microsoft.AspNetCore.Mvc;
using Trips.Data;

namespace  Trips.Controllers
{
    [Route("api/[controller]")]
    public class TripsController: Controller
    {
        private ITripService _tripService;

        public TripsController(ITripService tripService)
        {
            _tripService = tripService;
        }

        [HttpPost("AddTrip")]
        public IActionResult AddTrip([FromBody]Trip trip){
            if(trip != null){
                _tripService.AddTrip(trip);
                return Ok();
            }
            return BadRequest();
            
        }

        [HttpGet("[action]/{Id}")]
        public IActionResult GetTripById(int Id){
            Trip tripById = _tripService.GetTripById(Id);
            if( tripById != null){
                return Ok(tripById);
            }
            else 
            {
                return BadRequest();
            }
        }

        [HttpGet("[action]")]
        public IActionResult GetTrips() => Ok(_tripService.GetAllTrips());

        [HttpPut("[action]/{id}")]
        public IActionResult UpdateTrip(int Id, [FromBody]Trip trip) 
            => Ok(_tripService.UpdateTrip(Id, trip));
    }
    
}