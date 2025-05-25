import { IsString, IsDateString } from "class-validator";

export class CreateLogDTO {
  @IsString()
  ip: string;

  @IsString()
  title?: string;

  @IsString()
  message: string;

  @IsDateString()
  date: Date;

  @IsString()
  userId?: string;
}

export class CreateErrorLogDTO {
  @IsString()
  ip: string;

  error: string;

  @IsString()
  title?: string;

  @IsString()
  message: string;

  @IsDateString()
  date: Date;

  @IsString()
  userId?: string;
}
