namespace MovieApp.Models.DTOs;

public class PersonDto
{
    public int ID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Birthday { get; set; }
    public string Country { get; set; }
    
    public List<string>? RolesList { get; set; }  
    public string Biography { get; set; }}