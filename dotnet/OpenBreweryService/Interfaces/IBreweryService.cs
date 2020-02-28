using OpenBreweryService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OpenBreweryService.Interfaces
{
    public interface IBreweryService
    {
        Task<IEnumerable<Brewery>> ListBreweries();
        Task<IEnumerable<Brewery>> SearchBreweriesByName(string breweryName);
        Task<IEnumerable<Brewery>> SearchBreweriesByNameAutoComplete(string breweryName);
        Task<Brewery> GetBreweryById(string breweryId);
    }
}
