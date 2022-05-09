using MovieApp.Data;
using MovieApp.Models;
using MovieApp.Models.DTOs;
using MovieApp.Services.Interfaces;

namespace MovieApp.Services;

public class MovieDtoMapper : IDtoMapper
{

    public T FromDto<T>(MovieDto movieDto, MoviesDBContext context)
    {
        ICollection<Genre>? genres = new List<Genre?>();
        ICollection<Person>? people = new List<Person?>();
        if (movieDto.Genres != null && movieDto.Genres.Count != 0)
        {
            foreach (var var in movieDto.Genres)
            {
                genres.Add(context.Find<Genre>(var));
            }
        }
        if (movieDto.People != null && movieDto.People.Count != 0)
        {
            foreach (var var in movieDto.People)
            {
                people.Add(context.Find<Person>(var));
            }
        }
        Movie movie = new Movie
        {
            ID = movieDto.ID,
            Title = movieDto.Title,
            Rating = movieDto.Rating,
            Length = movieDto.Length,
            ImageLinks = movieDto.ImageLinks,
            IMDBLink = movieDto.IMDBLink,
            Year = movieDto.Year,
            Genres = genres,
            People = people,
            Description = movieDto.Description,
            ClickedCounter = movieDto.ClickedCounter
        };

        return (T)(object)movie;
    }


    public T ToDto<T>(Movie movie, MoviesDBContext context)
    {
        ICollection<GenreDto> genres = new List<GenreDto>();
        ICollection<PersonDto> people = new List<PersonDto>();
        if (movie.Genres != null && movie.Genres.Count != 0)
        {
            foreach (Genre genre in movie.Genres)
            {
                GenreDto genreDto = new GenreDto
                {
                    ID = genre.ID,
                    Category = genre.Category.ToString()
                };
                genres.Add(genreDto);
            }
        }
        if (movie.People != null && movie.People.Count != 0)
        {
            foreach (Person person in movie.People)
            {
                PersonDto personDto = new PersonDto
                {
                    ID = person.ID,
                    FirstName = person.FirstName,
                    LastName = person.LastName,
                    Biography = person.Biography,
                    Birthday = person.Birthday.ToString(),
                    Country = person.Country,
                    RolesList = person.RolesList?.ConvertAll(n => n.ToString())
                };
                people.Add(personDto);
            }
        }
        MovieDto movieDto = new MovieDto
        {
            ID = movie.ID,
            Title = movie.Title,
            Rating = movie.Rating,
            Length = movie.Length,
            ImageLinks = movie.ImageLinks,
            IMDBLink = movie.IMDBLink,
            Genres = genres,
            People = people,
            Description = movie.Description,
            Year = movie.Year,
            ClickedCounter = movie.ClickedCounter
        };
        return (T)(object)movieDto;
    }
}