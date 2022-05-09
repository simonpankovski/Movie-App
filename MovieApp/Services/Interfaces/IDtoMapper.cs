using MovieApp.Data;
using MovieApp.Models;
using MovieApp.Models.DTOs;

namespace MovieApp.Services.Interfaces;

public interface IDtoMapper
{
    public T FromDto<T>(MovieDto dto, MoviesDBContext context);
    public T ToDto<T>(Movie entity, MoviesDBContext context);
}