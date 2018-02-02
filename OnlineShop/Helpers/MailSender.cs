using System;
using System.Net;
using System.Net.Mail;

namespace OnlineShop
{
    public class MailSender
    {
        private const string Email = "mailtotest098@gmail.com";
        private const string Password = "pass";
        public static void Send(string email, string subject, string body)
        {
            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential(Email, Password),
                EnableSsl = true
            };
            client.Send(Email, email, subject, body);
        }
    }
}