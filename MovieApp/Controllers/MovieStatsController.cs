using Microsoft.AspNetCore.Mvc;
using MovieApp.Data;
using MovieApp.Models;


namespace MovieApp.Controllers;

[ApiController]
[Route("api/stats")]
public class MovieStatsController: ControllerBase
{
    private readonly MoviesDBContext _context;
    public MovieStatsController(MoviesDBContext context)
    {
        _context = context;
    }
    [HttpPost("{id}")]
    public IActionResult SetStatsForMovie(int id)
    {
        Movie? movie = _context.Movies.Find(id);
        if (movie == null)
            return NotFound();
        movie.ClickedCounter += 1;
        _context.SaveChanges();
        return Ok();
        
    }
}