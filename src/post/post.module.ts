import { Global, Module } from '@nestjs/common';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './models/post.model';
import { PostRepository } from './repositories/post.repository';
import { UserModule } from 'src/user/user.module';
import { CategorySchema } from './models/category.model';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { CategoryRepository } from './repositories/category.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Post',
        schema: PostSchema,
      },
      {
        name: 'Category',
        schema: CategorySchema,
      },
    ]),
    UserModule,
  ],
  controllers: [PostController, CategoryController],
  providers: [PostService, PostRepository, CategoryService, CategoryRepository],
})
export class PostModule {}
