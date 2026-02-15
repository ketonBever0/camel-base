using CamelBackend.Features.Camels.Application.DTOs;
using CamelBackend.Localization;
using FluentValidation;

namespace CamelBackend.Features.Camels.Application.Validators
{
    public class CamelCreateValidator : AbstractValidator<CamelCreateDto>
    {
        public CamelCreateValidator(IResourceLocalizer<SharedResource> localizer)
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage(localizer.Localize("NameRequired"));
            RuleFor(x => x.HumpCount).Must(hc => hc == 1 || hc == 2).WithMessage(localizer.Localize("HumpCountConstraint"));
        }

    }

    public class CamelUpdateValidator : AbstractValidator<CamelCreateDto>
    {
        public CamelUpdateValidator(IResourceLocalizer<SharedResource> localizer)
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage(localizer.Localize("NameRequired"));
            RuleFor(x => x.HumpCount).Must(hc => hc == 1 || hc == 2).WithMessage(localizer.Localize("HumpCountConstraint"));
        }

    }
}
