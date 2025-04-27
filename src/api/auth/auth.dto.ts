import { Type } from "class-transformer";
import {
  IsDateString,
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  ValidateNested,
} from "class-validator";
import { AddressInfoDTO } from "../user/user.dto";
import { IsValidAddressInfo } from "../../validators/IsValidAddressInfo";

export class AddUserDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  picture: string;

  @IsOptional()
  @IsDateString()
  birthDate: Date | string | null;

  @IsOptional()
  @IsString()
  gender: string | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressInfoDTO)
  @IsValidAddressInfo({
    message:
      "L'oggetto addressInfo deve contenere address, city, state, country, zipCode e location (con latitude e longitude).",
  })
  addressInfo: AddressInfoDTO;

  @IsOptional()
  @IsString()
  preferredLanguage: string | null;

  @IsOptional()
  @IsString()
  timeZone: string | null;

  @IsString()
  role: string;

  @IsEmail()
  username: string;

  @MinLength(8)
  password: string;
}

export class LoginDTO {
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
