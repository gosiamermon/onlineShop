using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.DTO
{
    public class ProductDto
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
        public string Category { get; set; }
        public string Producer { get; set; }
    }
}