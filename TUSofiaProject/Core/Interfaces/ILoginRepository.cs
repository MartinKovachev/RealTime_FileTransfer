using System.Threading.Tasks;

namespace TUSofiaProject.Core.Interfaces
{
    public interface ILoginRepository
    {
        Task<string> Login();
    }
}
