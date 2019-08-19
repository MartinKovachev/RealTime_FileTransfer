using System.Threading.Tasks;
using TUSofiaProject.Core.Models;

namespace TUSofiaProject.Core.Interfaces
{
    public interface IDashboardRepository
    {
        Task<UploadedFile> GetUploadedFile(string fileId);
    }
}
