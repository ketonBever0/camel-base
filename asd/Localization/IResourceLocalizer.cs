namespace CamelBackend.Localization
{
    public interface IResourceLocalizer<T>
    {
        string Localize(string key);
    }
}
