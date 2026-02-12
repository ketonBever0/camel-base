using CamelBackend.Localization;
using CamelBackend.Models;
using FluentValidation;

namespace CamelBackend.Validators
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
