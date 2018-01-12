using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool IsAdmin { get; set; }
        
        public int AddressId { get; set; }
        public Address Address { get; set; }

        public ICollection<Order> Orders { get; set; }
        public ICollection<Opinion> Opinions { get; set; }

    }
}
