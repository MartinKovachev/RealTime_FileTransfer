using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using TUSofiaProject.Core.Interfaces;
using TUSofiaProject.Core.Models;

namespace TUSofiaProject.Persistence
{
    public class UploadRepository : IUploadRepository
    {
        private FileTransferWebAppDbContext context;
        private readonly IHostingEnvironment host;

        public UploadRepository(FileTransferWebAppDbContext context, IHostingEnvironment host)
        {
            this.context = context;
            this.host = host;
        }

        public async Task<IEnumerable<UploadedFile>> GetUploadedFiles()
        {
            return await context.UploadedFiles.ToListAsync();
        }

        public async Task<bool> UploadFile(IFormCollection formData)
        {
            string uploadFolderPath = Path.Combine(host.WebRootPath, "uploads");

            var file = formData.Files.GetFile("file");
            var fileName = ContentDispositionHeaderValue
                .Parse(file.ContentDisposition).FileName.Trim('"');
            var filePath = Path.Combine("uploads", "Files\\" + fileName);
            var fullPath = Path.Combine(uploadFolderPath,
                "Files\\" + fileName);

            if (await context.UploadedFiles.AnyAsync(upf => upf.Name == fileName))
            {
                return false;
            }

            if (!Directory.Exists(uploadFolderPath + "\\Files"))
                Directory.CreateDirectory(uploadFolderPath + "\\Files");

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream); // Import the file to the folder
            }

            var uploadedFile = new UploadedFile()
            {
                Name = fileName,
                Location = filePath,
                DateUploaded = DateTime.Now.ToString()
            };

            await context.UploadedFiles.AddAsync(uploadedFile);
            await context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> FileExists(int? fileId)
        {
            return await context.UploadedFiles.AnyAsync(uf => uf.Id == fileId);
        }

        public async Task DeleteFile(int? fileId)
        {
            UploadedFile file = await context.UploadedFiles.Where(uf => uf.Id == fileId).FirstOrDefaultAsync();

            context.UploadedFiles.Remove(file);
            await context.SaveChangesAsync();
        }
    }
}
