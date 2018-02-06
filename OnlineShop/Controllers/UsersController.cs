using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using OnlineShop.Service;
using AutoMapper;
using OnlineShop.Helpers;
using OnlineShop.DTO;
using OnlineShop.Models;

namespace OnlineShop.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UsersController(
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticateUser")]
        public IActionResult AuthenticateUser([FromBody]LoginDto loginDto)
        {
            var user = _userService.AuthenticateUser(loginDto.Email, loginDto.Password);
           return Authenticate(user);
        }

        [AllowAnonymous]
        [HttpPost("authenticateAdmin")]
        public IActionResult AuthenticateAdmin([FromBody]LoginDto loginDto)
        {
            var user = _userService.AuthenticateAdmin(loginDto.Email, loginDto.Password);
            return Authenticate(user);
        }

        private IActionResult Authenticate(User user) {
            if (user == null)
                return BadRequest("Email or password is incorrect");
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var Expires = DateTime.UtcNow.AddHours(2);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString()),
                    new Claim(ClaimTypes.AuthorizationDecision, TypeConverter.BoolToString(user.IsAdmin))
                }),
                Expires = Expires,
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
                Token = tokenString,
                Expires = Expires
            });
        }

        [AllowAnonymous]
        [HttpPost("registerUser")]
        public IActionResult RegisterUser([FromBody]UserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            try 
            {
                _userService.Create(user, userDto.Password, false);
                return Ok();
            } 
            catch(AppException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost("registerAdmin")]
        public IActionResult RegisterAdmin([FromBody]UserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            try 
            {
                _userService.Create(user, userDto.Password, true);
                return Ok();
            } 
            catch(AppException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize (Policy = "AdminOnly")]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users =  _userService.GetAll();
            var userDtos = _mapper.Map<IList<UserDto>>(users);
            return Ok(userDtos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user =  _userService.GetById(id);
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
                _userService.Update(user, userDto.Password);
                return Ok();
            } 
            catch(AppException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize (Policy = "AdminOnly")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userService.Delete(id);
            return Ok();
        }
    }
}
