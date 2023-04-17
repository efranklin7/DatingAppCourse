using System.Diagnostics;
using Backend.Extensions;

namespace Backend.Model
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; } 
        public byte[] PasswordSalt { get; set; }
       public DateOnly DateOfBirth { get; set; } // introduced in net 6 
       public string KnownAs { get; set; }
       public DateTime Created { get; set; }=DateTime.UtcNow; //utc international date
       public DateTime LastActive { get; set; }=DateTime.UtcNow;
       public string Gender { get; set; }
       public string Introduction { get; set; }
       public string LookingFor { get; set; }
       public string Interests { get; set; }
       public string City { get; set; }
       public string Country { get; set; }
       public List<Photo> Photo {get;set;}=new();// = new List<Photo>();
    public int GetAge()
    {
            return DateOfBirth.CalculateAge();
            
    }
    }
}
