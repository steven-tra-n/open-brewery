﻿using OpenBreweryService.Interfaces;
using OpenBreweryService.Models;
using OpenBreweryService.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace OpenBreweryService.Services
{
    public class BreweryService : IBreweryService
    {
        private readonly BreweryAPI _api = new BreweryAPI();

        public async Task<Dictionary<int, Brewery>> ListBreweries()
        {
            HttpClient client = _api.Initialize();
            Dictionary<int, Brewery> breweries = new Dictionary<int, Brewery>();

            HttpResponseMessage response = await client.GetAsync("breweries?by_state=pennsylvania");

            if (response.IsSuccessStatusCode)
            {
                var results = response.Content.ReadAsStringAsync().Result;
                breweries = JsonConvert.DeserializeObject<Dictionary<int, Brewery>>(results);
            }

            return breweries;
        }
    }
}