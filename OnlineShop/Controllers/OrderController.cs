using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OnlineShop.DTO;
using OnlineShop.Helpers;
using OnlineShop.Models;

namespace OnlineShop
{
    [Authorize]
    [Route("[controller]")]
    public class OrderController : Controller
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;


          public OrderController(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }
        
        [HttpPost("Create/{userId}/{productId}/{amount}")]
        public IActionResult Create([FromRoute] int userId, int productId, int amount)
        {
            try
            {
                _orderRepository.Create(userId, productId, amount);
                return Ok();
            } catch(AppException ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("AddToBasket/{orderId}/{productId}/{amount}")]
        public IActionResult AddToBasket([FromRoute] int orderId, int productId, int amount)
        {
            try
            {
                _orderRepository.AddToBasket(orderId, productId, amount);
                return Ok();
            } catch(AppException ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("RemoveFromBasket/{orderId}/{productId}")]
        public IActionResult RemoveFromBasket([FromRoute] int orderId, int productId)
        {
            try
            {
                _orderRepository.RemoveFromBasket(orderId, productId);
                return Ok();
            } catch(AppException ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("ChangeAmount/{orderId}/{productId}/{amount}")]
        public IActionResult ChangeAmount([FromRoute] int orderId, int productId, int amount)
        {
            try
            {
                _orderRepository.ChangeAmount(orderId, productId, amount);
                return Ok();
            } catch(AppException ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _orderRepository.Delete(id);
            return Ok();
        }

        [HttpPost("SubmitOrder/{orderId}")]
        public IActionResult SubmitOrder([FromRoute] int orderId)
        {
            try
            {
                _orderRepository.SubmitOrder(orderId);
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
            var orders = _orderRepository.GetAll();
            var ordersDto = _mapper.Map<IList<OrderDto>>(orders);
            return Ok(ordersDto);
        }

        [HttpGet("GetAllReletedByUser/{userId}")]
        public IActionResult GetAllReletedByUser(int userId)
        {
            var orders = _orderRepository.GetOrdersReletedByUser(userId);
            var ordersDto = _mapper.Map<IList<OrderDto>>(orders);
            return Ok(ordersDto);
        }

        [HttpGet("GetOrderById/{orderId}")]
        public IActionResult GetOrderById(int orderId) 
        {
            var order = _orderRepository.GetOrderById(orderId);
            var orderDetailsDto = _mapper.Map<OrderDetailsDto>(order);
            return Ok(orderDetailsDto);
        }

        [HttpPost("PayOrder/{orderId}")]
        public IActionResult PayOrder([FromRoute] int orderId) 
        {
            try
            {
                _orderRepository.PayOrder(orderId);
                return Ok();
            } 
            catch(AppException ex) 
            {
                return BadRequest(ex.Message);
            }
        }

    }
}