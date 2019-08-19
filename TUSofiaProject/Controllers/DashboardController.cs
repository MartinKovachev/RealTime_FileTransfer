using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using TUSofiaProject.Core.Interfaces;

namespace TUSofiaProject.Controllers
{
    public class DashboardController : Controller
    {
        private readonly IDashboardRepository dashboardRepository;
        private readonly IHostingEnvironment host;

        public DashboardController(IDashboardRepository dashboardRepository, IHostingEnvironment host)
        {
            this.dashboardRepository = dashboardRepository;
            this.host = host;
        }

        [HttpPost]
        [Route("/api/dashboard/downloadFile")]
        public async Task<IActionResult> GetDownloadableFile([FromBody] string fileId)
        {
            var file = await dashboardRepository.GetUploadedFile(fileId);

            string pathToFile = Path.Combine(host.WebRootPath, file.Location);

            try
            {
                if (!System.IO.File.Exists(pathToFile))
                {
                    return StatusCode(404);
                }

                var memoryStream = new MemoryStream();
                using (var stream = new FileStream(pathToFile, FileMode.Open))
                {
                    await stream.CopyToAsync(memoryStream);
                }

                return File(memoryStream.GetBuffer(), "application/octet-stream", System.Web.HttpUtility.UrlPathEncode(file.Name));
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
    }
}