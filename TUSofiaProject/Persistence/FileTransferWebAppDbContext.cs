using Microsoft.EntityFrameworkCore;
using TUSofiaProject.Core.Models;

namespace TUSofiaProject.Persistence
{
    public class FileTransferWebAppDbContext : DbContext
    {
        public DbSet<UploadedFile> UploadedFiles { get; set; }

        public FileTransferWebAppDbContext(DbContextOptions<FileTransferWebAppDbContext> options)
            : base(options)
        {

        }
    }
}
