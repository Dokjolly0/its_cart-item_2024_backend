import { Type } from "class-transformer";
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class LocationDTO {
  @IsOptional()
  @IsNumber()
  latitude: number | null;

  @IsOptional()
  @IsNumber()
  longitude: number | null;
}

export class AddressInfoDTO {
  @IsOptional()
  @IsString()
  address: string | null;

  @IsOptional()
  @IsString()
  city: string | null;

  @IsOptional()
  @IsString()
  state: string | null;

  @IsOptional()
  @IsString()
  country: string | null;

  @IsOptional()
  @IsString()
  zipCode: string | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDTO)
  location: LocationDTO;
}
