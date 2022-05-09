using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Query.Internal;
using MovieApp.Data;
using MovieApp.Models;
using MovieApp.Models.DTOs;
using MovieApp.Services.Interfaces;

namespace MovieApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{

    private readonly MoviesDBContext _context;
    private readonly IDtoMapper _dtoMapper;
    public MoviesController(MoviesDBContext context, IDtoMapper dtoMapper)
    {
        _context = context;
        _dtoMapper = dtoMapper;
    }
    [HttpGet]
    public IActionResult GetAll(string? searchTerm = "")
    {
        List<Movie> movies = new List<Movie>();
        if (searchTerm == "")
        {
            movies = _context.Movies.Include(movie => movie.Genres).Include(movie => movie.People).ToList();   
        }
        else
        {
            
            movies = _context.Movies.Where(movie => movie.Title.ToLower().Contains(searchTerm.ToLower()) || movie.Description.ToLower().Contains(searchTerm.ToLower())).Include(movie => movie.Genres).Include(movie => movie.People).ToList();
        }
        
        List<MovieDto> movieDtos = new List<MovieDto>();
        foreach (Movie movie in movies)
        {
            movieDtos.Add(_dtoMapper.ToDto<MovieDto>(movie, _context));
        }
        return Ok(movieDtos);
    }
    
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        Movie? movie = _context.Movies.Include(movie => movie.Genres).Include(movie => movie.People).FirstOrDefault(movie => movie.ID == id);
        if (movie == null)
            return NotFound();

        return Ok(_dtoMapper.ToDto<MovieDto>(movie, _context));
    }
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<IActionResult> Create(MovieDto movieDto)
    {
        Movie movie = _dtoMapper.FromDto<Movie>(movieDto, _context);
        
        await _context.AddAsync(movie);
        await _context.SaveChangesAsync();
        return Created(nameof(GetById), new {id = movie.ID});
    }
    
    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(int id, MovieDto movieDto)
    {
        //Movie movie = _dtoMapper.FromDto<Movie>(movieDto, _context);
        
        Movie? movie = await _context.Movies.FindAsync(id);
        if (movie == null)
        {
            return NotFound();
        }
        await _context.SaveChangesAsync();
        return Created(nameof(GetById), new {id = movie.ID});
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        if (await _context.Movies.FindAsync(id) is { } movie)
        {
            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();
            return Ok();
        }

        return NotFound();
    }
}