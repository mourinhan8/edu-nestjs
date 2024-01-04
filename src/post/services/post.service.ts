import { PostRepository } from './../repositories/post.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  getAllPost() {
    return this.postRepository.getByCondition({});
  }

  getPostById(id: string) {
    const post = this.postRepository.findById(id);
    if (post) {
      return post;
    }

    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async replacePost(id: string, post: UpdatePostDto) {
    return await this.postRepository.findByIdAndUpdate(id, post);
  }

  async createPost(post: CreatePostDto) {
    const new_post = await this.postRepository.create(post);
    return new_post;
  }

  async deletePost(id: string) {
    return await this.postRepository.deleteOne(id);
  }
}
