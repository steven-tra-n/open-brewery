using System.Runtime.Serialization;

namespace OpenBreweryService.Models
{
    [DataContract]
    public class Brewery
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember (Name = "brewery_type")]
        public string Brewery_Type { get; set; }

        [DataMember]
        public string Street { get; set; }

        [DataMember]
        public string City { get; set; }

        [DataMember]
        public string State { get; set; }

        [DataMember (Name = "website_url")]
        public string WebSite_URL { get; set; }

        [DataMember]
        public string Latitude { get; set; }

        [DataMember]
        public string Longitude { get; set; }
    }
}
