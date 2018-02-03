using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using OnlineShop.Repositories;
using AutoMapper;
using OnlineShop.Helpers;
using OnlineShop.DTO;
using OnlineShop.Models;

namespace OnlineShop.Controllers
{
    // [Authorize]
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private IUserRepository _userRepository;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UsersController(
            IUserRepository userRepository,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]UserDto userDto)
        {
            var user = _userRepository.Authenticate(userDto.Email, userDto.Password);
            if (user == null)
                return BadRequest("Email or password is incorrect");
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return Ok(new {
                UserId = user.UserId,
                Email = user.Email,
                Name = user.Name,
                Surname = user.Surname,
                IsAdmin = user.IsAdmin,
                Token = tokenString
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody]UserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            try 
            {
                _userRepository.Create(user, userDto.Password);
                return Ok();
            } 
            catch(AppException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users =  _userRepository.GetAll();
            var userDtos = _mapper.Map<IList<UserDto>>(users);
            return Ok(userDtos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user =  _userRepository.GetById(id);
            var userDto = _mapper.Map<UserDto>(user);
            return Ok(userDto);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]UserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            user.UserId = id;
            try 
            {
                _userRepository.Update(user, userDto.Password);
                return Ok();
            } 
            catch(AppException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userRepository.Delete(id);
            return Ok();
        }
    }
}
