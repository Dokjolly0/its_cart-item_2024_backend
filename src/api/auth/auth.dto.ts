import {
  IsDateString,
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
} from "class-validator";

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
  birthDate: Date | string | undefined;

  @IsOptional()
  @IsString()
  gender: string | undefined;

  @IsOptional()
  @IsString()
  preferredLanguage: string | undefined;

  @IsOptional()
  @IsString()
  timeZone: string | undefined;

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
