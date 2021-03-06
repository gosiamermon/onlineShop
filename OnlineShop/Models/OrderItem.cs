﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.Models
{
    public class OrderItem
    {
        public int OrderItemId { get; set; }
        public int ProductAmount { get; set; }
        public double Subtotal {get; set;}
        public string Size { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int OrderId { get; set; }
        public Order Order { get; set; }

    }
}
