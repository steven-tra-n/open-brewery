using OpenBreweryService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenBreweryService.Interfaces
{
    public interface IBreweryService
    {
        Task<Dictionary<int, Brewery>> ListBreweries();
    }
}
