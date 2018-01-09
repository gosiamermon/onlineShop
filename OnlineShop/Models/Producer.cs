using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.Models
{
    public class Producer
    {
        public int ProducerId { get; set; }
        public string Name { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
