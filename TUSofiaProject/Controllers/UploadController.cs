using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using TUSofiaProject.Persistence;
using TUSofiaProject.Core.Models;
using Microsoft.AspNetCore.Authorization;
using TUSofiaProject.Core.Interfaces;

namespace TUSofiaProject.Controllers
{
    [Authorize]
    public class UploadController : Controller
    {
        private FileTransferWebAppDbContext context;
        private IUploadRepository uploadRepository;
        private readonly IHostingEnvironment host;

        public UploadController(FileTransferWebAppDbContext context, IUploadRepository uploadRepository, IHostingEnvironment host)
        {
            this.context = context;
            this.uploadRepository = uploadRepository;
            this.host = host;
        }

        [HttpGet]
        [Route("/api/upload/getUploadedFiles")]
        public async Task<ActionResult<IEnumerable<UploadedFile>>> GetUploadedFiles()
        {
            var uploadedFiles = await uploadRepository.GetUploadedFiles();

            return Ok(uploadedFiles);
        }

        [HttpPost]
        [Route("/api/upload/import")]
        public async Task<IActionResult> Upload(IFormCollection formData)
        {
            if (formData == null)
            {
                return BadRequest();
            }

            try
            {
                if (formData.Files.GetFile("file") != null &&
                    formData.Files.GetFile("file").Length > 0)
                {
                    var isUploadedSuccessfully = await uploadRepository.UploadFile(formData);

                    if (isUploadedSuccessfully == false)
                    {
                        return BadRequest("This file is already uploaded");
                    }

                    return Ok();
                }

                return BadRequest();
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        [HttpDelete]
        [Route("/api/upload/delete/{fileId}")]
        public async Task<IActionResult> DeleteFile(int? fileId)
        {
            bool fileExists = await uploadRepository.FileExists(fileId);

            if (fileId == null || !fileExists)
            {
                return NotFound();
            }

            await uploadRepository.DeleteFile(fileId);

            return NoContent();
        }
    }
}