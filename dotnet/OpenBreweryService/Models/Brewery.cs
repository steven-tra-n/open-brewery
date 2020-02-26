using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenBreweryService.Models
{
    public class Brewery
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string BreweryType { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string WebSiteURL { get; set; }
    }
}
