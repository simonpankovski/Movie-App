using System.ComponentModel.DataAnnotations;

namespace MovieApp.Models;

public class Movie : IEntity
{
    public int ID { get; set; }
    [Required] [StringLength(50)] public string Title { get; set; }
    [Required] public int Length { get; set; }
    public int ClickedCounter { get; set; } = 0;
    public int Rating { get; set; }
    
    public int Year { get; set; }

    public int NumberOfPeopleWhoRated { get; set; } = 0;
    public string Description { get; set; } = "";
    public string IMDBLink { get; set; }
    public List<string>? ImageLinks { get; set; }
    public ICollection<Genre>? Genres { get; set; }
    public ICollection<Person>? People { get; set; }
}