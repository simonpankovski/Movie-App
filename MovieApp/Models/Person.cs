using System.ComponentModel.DataAnnotations;

namespace MovieApp.Models;
public enum Roles
{
    Actor, Director, Producer
}
public class Person: IEntity
{
    public int ID { get; set; }
    [StringLength(50)]
    public string FirstName { get; set; }
    [StringLength(50)]
    public string LastName { get; set; }
    [DataType(DataType.Date)]
    public DateOnly Birthday { get; set; }
    public string Country { get; set; }
    public string Biography { get; set; }
    public List<Roles>? RolesList { get; set; }
    public ICollection<Movie> Movies { get; set; }
}