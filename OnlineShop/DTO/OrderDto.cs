using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.DTO
{
    public class OrderDto
    {
        public int OrderId {get; set;}
        public int UserId {get; set;}
        public int ProductId {get; set;}
        public int Amount {get; set;}
        public string Size {get; set;}
    }
}