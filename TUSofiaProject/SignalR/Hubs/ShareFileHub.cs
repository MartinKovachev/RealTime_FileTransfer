using Microsoft.AspNetCore.SignalR;
using TUSofiaProject.Core.Models;

namespace TUSofiaProject.SignalR.Hubs
{
    public class ShareFileHub : Hub
    {
        public async void ShareFile(UploadedFile file) // We call ShareFile(file -> comes from the client app) from the client app
        {
            // Notify(UploadedFile file) will be called in the client app (function in the client app)
            await Clients.All.SendAsync("Notify", file);
        }
    }
}
