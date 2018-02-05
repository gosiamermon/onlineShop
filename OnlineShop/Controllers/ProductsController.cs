using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.DTO;
using OnlineShop.Helpers;
using OnlineShop.Models;
using OnlineShop.Service;

namespace OnlineShop
{
    [Authorize]
    [Route("[controller]")]
    public class ProductsController : Controller
    {
        private IProductService _productService;
        private IMapper _mapper;

        public ProductsController(IProductService productService, IMapper mapper)
        {
            _productService = productService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet("fewfirst/{amount}")]
        public IActionResult GetFewFirst([FromRoute]int amount)
        {
            var product = _productService.GetFewFirst(amount);
            var prouctDtos = _mapper.Map<IList<ProductDto>>(product);
            return Ok(prouctDtos);
        }

        [AllowAnonymous]
        [HttpGet("bycategory/{category}")]
        public IActionResult GetByCategory([FromRoute]string category)
        {
            var product = _productService.GetByCategory(category);
            var prouctDtos = _mapper.Map<IList<ProductDto>>(product);
            return Ok(prouctDtos);
        }

        [AllowAnonymous]
        [HttpGet("tocompare/{id1}/{id2}")]
        public IActionResult GetToCompare([FromRoute]int id1, int id2)
        {
            var product = _productService.GetToCompare(id1, id2);;
            var prouctDtos = _mapper.Map<IList<ProductDto>>(product);
            return Ok(prouctDtos);
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAll()
        {
            var product =  _productService.GetAll();
            var prouctDtos = _mapper.Map<IList<ProductDto>>(product);
            return Ok(prouctDtos);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var product =  _productService.GetById(id);
            var productDto = _mapper.Map<ProductDto>(product);
            return Ok(productDto);
        }

        [HttpPost]
        public IActionResult Create([FromBody]ProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            try 
            {
                _productService.Create(product);
                return Ok();
            } 
            catch(AppException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]ProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            product.ProductId = id;
            try 
            {
                _productService.Update(product);
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
            _productService.Delete(id);
            return Ok();
        }
    }
}