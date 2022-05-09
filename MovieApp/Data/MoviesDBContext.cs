using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Options;
using MovieApp.Models;

namespace MovieApp.Data
{
    public class MoviesDBContext : DbContext
    {
        public DbSet<Person> People { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Genre> Genres { get; set; }

    
        public MoviesDBContext(DbContextOptions options)
            : base(options)
        {
        }

        
    }
}
