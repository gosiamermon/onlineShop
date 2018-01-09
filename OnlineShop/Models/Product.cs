using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageSmall { get; set; }
        public string ImageBig { get; set; }
        public double Cost { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string Fabric { get; set; }
        public string Gender { get; set; }
        public bool IsAvaiable { get; set; }
        public int ItemNumber { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public int ProducerId { get; set; }
        public Producer Producer { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; }
        public ICollection<Opinion> Opinions { get; set; }
    }
}
