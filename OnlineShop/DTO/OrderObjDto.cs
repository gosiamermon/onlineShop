using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.DTO
{
    public class OrderObjDto
    {
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public bool IsAccepted { get; set; }
        public DateTime AcceptedDate { get; set; }
        public double TotalValue { get; set; }
        public bool IsPaid { get; set; }
        public DateTime PaymentDate { get; set; }
        public string status {get; set;}
    }
}