export class UserDto {
  readonly id!: number;
  readonly name!: string;
  readonly email!: string;
  readonly firstName!: string;
  readonly lastName!: string;
  readonly roles!: string[];
  readonly enabled!: boolean;
  readonly external!: boolean;
}
