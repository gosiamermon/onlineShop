using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using OnlineShop.DAL;
using OnlineShop.Helpers;
using OnlineShop.Models;

namespace OnlineShop.Service
{
public interface IUserService
    {
        User AuthenticateUser(string email, string password);
        User AuthenticateAdmin(string email, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        User Create(User user, string password, bool isAdmin);
        void Update(User user, string password);
        void Delete(int id);
    }

    public class UserService : IUserService
    {
        private ShopContext _context;

        public UserService(ShopContext context)
        {
            _context = context;
        }

        public User AuthenticateUser(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                return null;
            var user = _context.Users.SingleOrDefault(x => x.Email == email);
            if (user == null)
                return null;
            if (!HashHelper.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;
            return user;
        }

        public User AuthenticateAdmin(string email, string password) {
            User user = AuthenticateUser(email, password);
            if(user == null)
                return null;
            if(!user.IsAdmin)
                return null;
            return user;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public User GetById(int id)
        {
            return _context.Users
            .SingleOrDefault(u => u.UserId == id);
        }

        public User Create(User user, string password, bool isAdmin)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");
            if (_context.Users.Any(x => x.Email == user.Email))
                throw new AppException("Email '" + user.Email + "' is already taken");
            byte[] passwordHash, passwordSalt;
            HashHelper.CreatePasswordHash(password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.IsAdmin = isAdmin;
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }

        public void Update(User userParam, string password)
        {
            var user = _context.Users.Find(userParam.UserId);
            if (user == null)
                throw new AppException("User not found");
            if (userParam.Email != user.Email)
            {
                if (_context.Users.Any(x => x.Email == userParam.Email))
                    throw new AppException("Email " + userParam.Email + " is already taken");
            }
            user.Name = userParam.Name;
            user.Surname = userParam.Surname;
            user.Email = userParam.Email;
            user.IsAdmin = userParam.IsAdmin;
            user.Address = userParam.Address;
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                HashHelper.CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }
            _context.Users.Update(user);
            _context.SaveChanges();
        }
        public void Delete(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }
    }
}