import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function IsValidAddressInfo(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isValidAddressInfo",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== "object" || value === null) {
            return false;
          }

          const requiredFields = [
            "address",
            "city",
            "state",
            "country",
            "zipCode",
            "location",
          ];
          for (const field of requiredFields) {
            if (!(field in value)) {
              return false;
            }
          }

          if (typeof value.location !== "object" || value.location === null) {
            return false;
          }

          if (
            !("latitude" in value.location) ||
            !("longitude" in value.location)
          ) {
            return false;
          }

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `L'oggetto '${args.property}' deve avere i campi obbligatori: address, city, state, country, zipCode e location (con latitude e longitude).`;
        },
      },
    });
  };
}
