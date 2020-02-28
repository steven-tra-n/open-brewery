using OpenBreweryService.Interfaces;
using OpenBreweryService.Models;
using OpenBreweryService.Helper;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace OpenBreweryService.Services
{
    public class BreweryService : IBreweryService
    {
        private readonly HttpClient client = BreweryAPI.GetClient();

        public async Task<IEnumerable<Brewery>> ListBreweries()
        {
            IEnumerable<Brewery> breweries = Enumerable.Empty<Brewery>();

            HttpResponseMessage response = await client.GetAsync("breweries?by_state=pennsylvania");

            if (response.IsSuccessStatusCode)
            {
                var results = response.Content.ReadAsStringAsync().Result;
                breweries = JsonConvert.DeserializeObject<IEnumerable<Brewery>>(results);
            }

            return breweries;
        }

        public async Task<IEnumerable<Brewery>> SearchBreweriesByName(string breweryName)
        {
            IEnumerable<Brewery> breweries = Enumerable.Empty<Brewery>();

            HttpResponseMessage response = await client.GetAsync($"https://api.openbrewerydb.org/breweries/search?query={breweryName}");

            if (response.IsSuccessStatusCode)
            {
                var results = response.Content.ReadAsStringAsync().Result;
                breweries = JsonConvert.DeserializeObject<IEnumerable<Brewery>>(results);
            }

            return breweries;
        }

        public async Task<IEnumerable<Brewery>> SearchBreweriesByNameAutoComplete(string breweryName)
        {
            IEnumerable<Brewery> breweries = Enumerable.Empty<Brewery>();

            HttpResponseMessage response = await client.GetAsync($"https://api.openbrewerydb.org/breweries/autocomplete?query={breweryName}");

            if (response.IsSuccessStatusCode)
            {
                var results = response.Content.ReadAsStringAsync().Result;
                breweries = JsonConvert.DeserializeObject<IEnumerable<Brewery>>(results);
            }

            return breweries;
        }

        public async Task<Brewery> GetBreweryById(string breweryId)
        {
            Brewery brewery = new Brewery();

            HttpResponseMessage response = await client.GetAsync($"https://api.openbrewerydb.org/breweries/{breweryId}");

            if (response.IsSuccessStatusCode)
            {
                var results = response.Content.ReadAsStringAsync().Result;
                brewery = JsonConvert.DeserializeObject<Brewery>(results);
            }

            return brewery;
        }
    }
}
