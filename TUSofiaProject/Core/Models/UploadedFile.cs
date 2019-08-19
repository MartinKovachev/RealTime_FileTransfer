using System.ComponentModel.DataAnnotations;

namespace TUSofiaProject.Core.Models
{
    public class UploadedFile
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public string DateUploaded { get; set; }
    }
}
