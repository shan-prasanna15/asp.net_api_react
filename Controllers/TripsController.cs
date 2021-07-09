using System;
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
        public IActionResult GetTrips(){
            try{                
                return Ok(_tripService.GetAllTrips());
            }
            catch(NullReferenceException e){                
                return BadRequest("The server failed to fetch data, contact Administrator! /n"+ e);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [HttpPut("[action]/{id}")]
        public IActionResult UpdateTrip(int Id, [FromBody]Trip trip) 
            => Ok(_tripService.UpdateTrip(Id, trip));

        [HttpDelete("[action]/{id}")]
        public IActionResult DeleteTrip(int Id){            
            _tripService.DeleteTrip(_tripService.GetTripById(Id));
            return Ok();
        }
    }
    
}