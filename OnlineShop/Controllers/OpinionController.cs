using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OnlineShop.DTO;
using OnlineShop.Helpers;
using OnlineShop.Models;
using OnlineShop.Service;

namespace OnlineShop
{
    [Authorize]
    [Route("[controller]")]
    public class OpinionController : Controller
    {
        private readonly IOpinionService _opinionService;
        private readonly IMapper _mapper;

        public OpinionController(IOpinionService opinionService, IMapper mapper)
        {
            _opinionService = opinionService;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult Create([FromBody] OpinionDto opinionDto) {
            var opinion = _mapper.Map<Opinion>(opinionDto);
            try 
            {
                _opinionService.Create(opinion);
                return Ok();
            } 
            catch(AppException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetAll() {
            var opinins =  _opinionService.GetAll();
            var opininsDto = _mapper.Map<IList<OpinionDto>>(opinins);
            return Ok(opininsDto);
        }

        [HttpGet("GetAllReletedByUser/{userId}")]
        public IActionResult GetAllReletedByUser(int userId) {
            var opinins =  _opinionService.GetAllReletedByUser(userId);
            var opininsDto = _mapper.Map<IList<OpinionDto>>(opinins);
            return Ok(opininsDto); 
        }

        [HttpGet("GetAllReletedByProduct/{productId}")]
        public IActionResult GetAllReletedByProduct(int productId) {
            var opinins =  _opinionService.GetAllReletedByProduct(productId);
            var opininsDto = _mapper.Map<IList<OpinionDto>>(opinins);
            return Ok(opininsDto); 
        }

    }
}