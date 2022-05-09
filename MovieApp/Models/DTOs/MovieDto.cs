namespace MovieApp.Models.DTOs;

public class MovieDto : IDto
{
    public int ID { get; set; }
    public string Title { get; set; }
    public int Length { get; set; }
    public int ClickedCounter { get; set; }

    public int Rating { get; set; }

    public int NumberOfPeopleWhoRated { get; set; }
    public string IMDBLink { get; set; }
    public int Year { get; set; }
    public List<string>? ImageLinks { get; set; }

    public string Description { get; set; }
    public ICollection<GenreDto>? Genres { get; set; }
    public ICollection<PersonDto>? People { get; set; }
}