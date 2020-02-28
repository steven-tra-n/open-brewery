using OpenBreweryService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenBreweryService.Interfaces
{
    public interface IBreweryService
    {
        Task<IEnumerable<Brewery>> ListBreweries();
        Task<IEnumerable<Brewery>> SearchBreweriesByName(string breweryName);
        Task<Brewery> GetBreweryById(string breweryId);
    }
}
