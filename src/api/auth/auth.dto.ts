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
  // Requested fields
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  username: string;

  @MinLength(8)
  password: string;

  // Optional fields
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
  @IsString()
  preferredLanguage: string | null;

  @IsOptional()
  @IsString()
  timeZone: string | null;

  @IsOptional()
  @IsString()
  role: string;
}

export class LoginDTO {
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
