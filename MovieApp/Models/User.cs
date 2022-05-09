namespace MovieApp.Models;

public class User: IEntity
{
    public int ID { get; set; }
    public string Email { get; set; }
}