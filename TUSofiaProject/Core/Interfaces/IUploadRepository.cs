using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using TUSofiaProject.Core.Models;

namespace TUSofiaProject.Core.Interfaces
{
    public interface IUploadRepository
    {
        Task<IEnumerable<UploadedFile>> GetUploadedFiles();
        Task<bool> UploadFile(IFormCollection formData);
        Task<bool> FileExists(int? fileId);
        Task DeleteFile(int? fileId);
    }
}
