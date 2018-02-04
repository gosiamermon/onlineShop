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
    //[Authorize]
    [Route("[controller]")]
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

          public OrderController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }
        
        [HttpPost("Create")]
        public IActionResult Create([FromBody] OrderDto orderDto)
        {
            try
            {
                _orderService.Create(orderDto.UserId, orderDto.ProductId, orderDto.Amount);
                return Ok();
            } catch(AppException ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("AddToBasket")]
        public IActionResult AddToBasket([FromBody] OrderDto orderDto)
        {
            try
            {
                _orderService.AddToBasket(orderDto.OrderId, orderDto.ProductId, orderDto.Amount);
                return Ok();
            } catch(AppException ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("RemoveFromBasket/{orderId}/{productId}")]
        public IActionResult RemoveFromBasket([FromRoute] int orderId, int productId)
        {
            try
            {
                _orderService.RemoveFromBasket(orderId, productId);
                return Ok();
            } catch(AppException ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("ChangeAmount")]
        public IActionResult ChangeAmount([FromBody] OrderDto orderDto)
        {
            try
            {
                _orderService.ChangeAmount(orderDto.OrderId, orderDto.ProductId, orderDto.Amount);
                return Ok();
            } catch(AppException ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _orderService.Delete(id);
            return Ok();
        }

        [HttpGet("SubmitOrder/{orderId}")]
        public IActionResult SubmitOrder(int orderId)
        {
            try
            {
                _orderService.SubmitOrder(orderId);
                return Ok();
            } 
            catch(AppException ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("ChangeStatus")]
        public IActionResult SubmitOrder([FromBody] ChangeStatusDto changeStatusDto)
        {
            try
            {
                _orderService.ChangeStatus(changeStatusDto.OrderId, changeStatusDto.Status);
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
            var orders = _orderService.GetAll();
            var ordersDto = _mapper.Map<IList<OrderObjDto>>(orders);
            return Ok(ordersDto);
        }

        [HttpGet("GetAllReletedByUser/{userId}")]
        public IActionResult GetAllReletedByUser(int userId)
        {
            var orders = _orderService.GetOrdersReletedByUser(userId);
            var ordersDto = _mapper.Map<IList<OrderObjDto>>(orders);
            return Ok(ordersDto);
        }

        [HttpGet("GetOrderById/{orderId}")]
        public IActionResult GetOrderById(int orderId) 
        {
            var order = _orderService.GetOrderById(orderId);
            var orderDetailsDto = _mapper.Map<OrderDetailsDto>(order);
            return Ok(orderDetailsDto);
        }

        [HttpGet("PayOrder/{orderId}")]
        public IActionResult PayOrder(int orderId) 
        {
            try
            {
                _orderService.PayOrder(orderId);
                return Ok();
            } 
            catch(AppException ex) 
            {
                return BadRequest(ex.Message);
            }
        }

    }
}