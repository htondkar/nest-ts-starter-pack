import { IsString, MinLength, IsEmail } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

// * required fields: name, email

export type UserType = {
  name: string
  email: string
  password: string
}

export class UserDTO {
  @IsString()
  @MinLength(3)
  @ApiModelProperty()
  name: string

  @IsString()
  @IsEmail()
  @ApiModelProperty()
  email: string

  @IsString()
  @ApiModelProperty()
  password: string
}
