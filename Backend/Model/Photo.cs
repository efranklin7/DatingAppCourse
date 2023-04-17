namespace Backend.Model
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; } // where to find the photo
        public Boolean IsMain { get; set; } // is it user main phtoo
        public string PublicId { get; set; } // 
    }
}