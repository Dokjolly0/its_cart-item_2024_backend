import { IsString, IsDateString } from "class-validator";

export class CreateLogDTO {
  @IsString()
  ip: string;

  @IsDateString()
  date: Date;

  @IsString()
  title?: string;

  @IsString()
  message: string;

  @IsString()
  userId?: string;
}
