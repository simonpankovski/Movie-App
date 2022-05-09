namespace MovieApp.Models;
public enum Category
{
    Thriller, Mystery, Action, SciFi, Comedy, Drama, Animated
}
public class Genre: IEntity
{
    public int ID { get; set; }
    public Category Category { get; set; }
    public ICollection<Movie>? Movies { get; set; }
}