using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.DTO
{
    public class OrderItemDto
    {
        public int ProductId {get; set;}
        public string ProductName {get; set;}
        public int ProductAmount { get; set; }
        public double Subtotal {get; set;}
        public string Size {get; set;}
    }
}