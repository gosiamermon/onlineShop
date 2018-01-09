using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.Models
{
    public class Address
    {
        public int AddressId { get; set; }
        public string City { get; set; }
        public string Zippcode { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        public string ApartmentNumber { get; set; }

        public User User { get; set; }
    }
}
