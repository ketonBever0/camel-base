using CamelBackend.Features.Camels.Application.Services;
using CamelBackend.Features.Camels.Domain.Models;
using CamelBackend.Features.Camels.Infrastructure.Repositories;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Moq;
using System.Net;
using Xunit;

namespace CamelBackend.Testing
{
    public class CamelTest : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly Mock<ICamelRepository> _repo;
        private readonly Mock<ICamelService> _service;
        private readonly HttpClient _client;

        public CamelTest(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
            _service = new Mock<ICamelService>();
        }

        private readonly string _apiPrefix = "/api/camels/";

        [Fact]
        public async Task GetAllCamels()
        {
            var res = await _client.GetAsync(_apiPrefix);

            res.StatusCode.Should().Be(HttpStatusCode.OK);
            res.Content.GetType().Should().Be(typeof(List<Camel>));
        }

    }
}
