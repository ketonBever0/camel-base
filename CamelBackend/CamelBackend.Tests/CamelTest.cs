using CamelBackend.DB;
using CamelBackend.Features.Camels.Application.Services;
using CamelBackend.Features.Camels.Domain.Models;
using CamelBackend.Features.Camels.Infrastructure.Repositories;
using CamelBackend.Tests.config;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System.Net;
using System.Net.Http.Json;
using Xunit;

namespace CamelBackend.Testing
{
    public class CamelTest : IClassFixture<ApiFactory>
    {
        private readonly HttpClient _client;
        private readonly ApiFactory _factory;

        public CamelTest(ApiFactory factory)
        {
            _factory = factory;
            _client = factory.CreateClient();
        }

        private readonly string _apiPrefix = "/api/camels/";


        [Fact]
        public async Task GetAllCamelsBeOk()
        {
            var res = await _client.GetAsync(_apiPrefix);

            res.StatusCode.Should().Be(HttpStatusCode.OK);
            //res.Content.GetType().Should().Be(typeof(List<Camel>));
        }

        [Fact]
        public async Task PostCamelAndBeCreated()
        {
            var dto = new { Name = "Post Test Camel", HumpCount = 2 };
            var postRes = await _client.PostAsJsonAsync(_apiPrefix, dto);

            postRes.StatusCode.Should().Be(HttpStatusCode.Created);
            var postCamel = await postRes.Content.ReadFromJsonAsync<Camel>();
            postCamel.Should().NotBeNull();
            postCamel.Name.Should().Be(dto.Name);

            var getRes = await _client.GetAsync(_apiPrefix + postCamel.Id);
            getRes.StatusCode.Should().Be(HttpStatusCode.OK);
            var getCamel = await getRes.Content.ReadFromJsonAsync<Camel>();
            getCamel.Name.Should().Be(dto.Name);

        }


        [Fact]
        public async Task PostBadCamelShouldBeBadRequest()
        {
            var dto = new { Name = "C", HumpCount = 0 };
            var postRes = await _client.PostAsJsonAsync(_apiPrefix, dto);

            postRes.StatusCode.Should().Be(HttpStatusCode.BadRequest);
            var resBody = await postRes.Content.ReadFromJsonAsync<ValidationProblemDetails>();
            resBody.Errors.Should().ContainKeys("Name", "HumpCount");

        }

        [Fact]
        public async Task DeleteShouldDelete()
        {
            var dto = new { Name = "DeleteCamel", HumpCount = 1 };
            var postRes = await _client.PostAsJsonAsync(_apiPrefix, dto);

            postRes.StatusCode.Should().Be(HttpStatusCode.Created);
            var postCamel = await postRes.Content.ReadFromJsonAsync<Camel>();

            var deleteRes = await _client.DeleteAsync(_apiPrefix + postCamel.Id);
            deleteRes.StatusCode.Should().Be(HttpStatusCode.OK);

            var getRes = await _client.GetAsync(_apiPrefix + postCamel.Id);
            getRes.StatusCode.Should().Be(HttpStatusCode.NotFound);

        }


    }
}
