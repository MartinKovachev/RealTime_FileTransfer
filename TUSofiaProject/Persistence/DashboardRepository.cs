using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using TUSofiaProject.Core.Interfaces;
using TUSofiaProject.Core.Models;

namespace TUSofiaProject.Persistence
{
    public class DashboardRepository : IDashboardRepository
    {
        private FileTransferWebAppDbContext context;

        public DashboardRepository(FileTransferWebAppDbContext context)
        {
            this.context = context;
        }

        public async Task<UploadedFile> GetUploadedFile(string fileId)
        {
            return await context.UploadedFiles
                .SingleOrDefaultAsync(upf => upf.Id == Convert.ToInt32(fileId));
        }
    }
}
