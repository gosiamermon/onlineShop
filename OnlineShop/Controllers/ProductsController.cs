using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.DTO;
using OnlineShop.Helpers;
using OnlineShop.Models;
using OnlineShop.Repositories;

namespace OnlineShop
{
    [Authorize]
    [Route("[controller]")]
    public class ProductsController : Controller
    {
        private IProductRepository _productRepository;
        private IMapper _mapper;

        public ProductsController(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet("fewfirst/{amount}")]
        public IActionResult GetFewFirst([FromRoute]int amount)
        {
            var product = _productRepository.GetFewFirst(amount);
            var prouctDtos = _mapper.Map<IList<ProductDto>>(product);
            return Ok(prouctDtos);
        }

        [AllowAnonymous]
        [HttpGet("bycategory/{category}")]
        public IActionResult GetByCategory([FromRoute]string category)
        {
            var product = _productRepository.GetByCategory(category);
            var prouctDtos = _mapper.Map<IList<ProductDto>>(product);
            return Ok(prouctDtos);
        }

        [AllowAnonymous]
        [HttpGet("tocompare/{id1}/{id2}")]
        public IActionResult GetToCompare([FromRoute]int id1, int id2)
        {
            var product = _productRepository.GetToCompare(id1, id2);;
            var prouctDtos = _mapper.Map<IList<ProductDto>>(product);
            return Ok(prouctDtos);
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAll()
        {
            var product =  _productRepository.GetAll();
            var prouctDtos = _mapper.Map<IList<ProductDto>>(product);
            return Ok(prouctDtos);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var product =  _productRepository.GetById(id);
            var productDto = _mapper.Map<ProductDto>(product);
            return Ok(productDto);
        }

        [HttpPost]
        public IActionResult Create([FromBody]ProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            try 
            {
                _productRepository.Create(product);
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
                _productRepository.Update(product);
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
            _productRepository.Delete(id);
            return Ok();
        }
    }
}