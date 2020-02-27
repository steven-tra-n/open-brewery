using OpenBreweryService.Interfaces;
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

        public async Task<IEnumerable<Brewery>> ListBreweries()
        {
            HttpClient client = _api.Initialize();
            IEnumerable<Brewery> breweries = Enumerable.Empty<Brewery>();

            HttpResponseMessage response = await client.GetAsync("breweries?by_state=pennsylvania");

            if (response.IsSuccessStatusCode)
            {
                var results = response.Content.ReadAsStringAsync().Result;
                breweries = JsonConvert.DeserializeObject<IEnumerable<Brewery>>(results);
            }

            return breweries;
        }
    }
}
