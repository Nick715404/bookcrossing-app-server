export class CreateUserDto {
  id: number;
  city: {
    title: string
  }
  photo_100?: string;
  first_name: string;
  last_name: string;
}
