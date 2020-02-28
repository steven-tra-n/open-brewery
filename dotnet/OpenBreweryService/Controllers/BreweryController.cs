using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OpenBreweryService.Interfaces;
using OpenBreweryService.Models;

namespace OpenBreweryService.Controllers
{
    [Route("v1")]
    [ApiController]
    public class BreweryController : ControllerBase
    {
        private readonly IBreweryService _service;

        public BreweryController(IBreweryService breweryService)
        {
            _service = breweryService;
        }

        [HttpGet]
        [Route("ListBreweries")]
        public async Task<IActionResult> ListBreweries()
        {
            var breweries = await _service.ListBreweries();

            return Ok(breweries);
        }

        [HttpGet]
        [Route("GetBreweryById")]
        public async Task<IActionResult> GetBreweryById(string breweryId)
        {
            var brewery = await _service.GetBreweryById(breweryId);

            return Ok(brewery);
        }
    }
}