namespace MovieApp.Models;
public enum Role
{
    Actor, Director, Producer
}
public class PersonRole
{
    public int ID { get; set; }
    public Role Role { get; set; }
}