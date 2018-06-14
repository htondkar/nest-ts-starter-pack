import { IsDefined, IsString, MinLength, IsEmail } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class SignupDTO {
  @IsDefined()
  @IsString()
  @MinLength(5)
  @ApiModelProperty()
  password: string

  @IsDefined()
  @IsString()
  @IsEmail()
  @ApiModelProperty()
  email: string
}
