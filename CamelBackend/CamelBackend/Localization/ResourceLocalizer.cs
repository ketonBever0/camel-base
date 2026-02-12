using Microsoft.Extensions.Localization;
using System.Reflection;

namespace CamelBackend.Localization
{
    public class ResourceLocalizer<T> : IResourceLocalizer<T>
    {
        private readonly IStringLocalizer _localizer;
        public ResourceLocalizer(IStringLocalizerFactory factory)
        {
            var type = typeof(T);
            var assemblyName = new AssemblyName(type.Assembly.FullName!);
            _localizer = factory.Create(type.Name, assemblyName.Name!);
        }
        public string Localize(string key) => _localizer[key];
    }
    public class SharedResource { }
}

