import { PostRepository } from './../repositories/post.repository';
import {
  // HttpException,
  // HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { UserService } from 'src/user/services/user.service';
import { CategoryRepository } from '../repositories/category.repository';
// import { PostNotFoundException } from '../exceptions/postNotFound.exception';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userService: UserService,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async getAllPost() {
    return await this.postRepository.getByCondition({});
  }

  async getPostById(id: string) {
    const post = await this.postRepository.findById(id);
    if (post) {
      await post.populate({ path: 'user', select: '-password' });
      return post;
    } else {
      throw new NotFoundException(id);
      // throw new PostNotFoundException(id);
      // throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }

  async replacePost(id: string, post: UpdatePostDto) {
    return await this.postRepository.findByIdAndUpdate(id, post);
  }

  async createPost(user: any, post: CreatePostDto) {
    post.user = user._id;
    const newPost = await this.postRepository.create(post);
    if (post.categories) {
      await this.categoryRepository.updateMany(
        { _id: { $in: post.categories } },
        { $push: { posts: newPost._id } },
      );
    }
    return newPost;
  }

  async deletePost(id: string) {
    return await this.postRepository.deleteOne(id);
  }

  async getByCategory(category_id: string) {
    return await this.postRepository.getByCondition({
      categories: {
        $elemMatch: { $eq: category_id },
      },
    });
  }

  async getByCategories(category_ids: [string]) {
    return await this.postRepository.getByCondition({
      categories: {
        $all: category_ids,
      },
    });
  }
}
