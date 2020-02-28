﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;

namespace OpenBreweryService.Helper
{
    public static class BreweryAPI
    {
        public static HttpClient GetClient()
        {
            HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("https://api.openbrewerydb.org/");

            return client;
        }
    }
}
