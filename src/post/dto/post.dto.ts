import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  description: string;

  user: any;

  categories: [string];
}

export class UpdatePostDto {
  @IsNotEmpty()
  id: number;

  content: string;

  @IsNotEmpty()
  title: string;
}
