import { UserDto } from './user.dto';

export interface AccessTokenDto {
  readonly accessToken: string;
  readonly expiresIn: number;
  readonly refreshToken: string;
}

export interface AccessTokenWithUserDto extends AccessTokenDto {
  readonly user: UserDto;
}
