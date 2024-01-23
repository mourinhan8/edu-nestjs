import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostQuery } from '../queries/getPost.query';
import { PostRepository } from '../repositories/post.repository';

@QueryHandler(GetPostQuery)
export class GetPostHandler implements ICommandHandler<GetPostQuery> {
  constructor(private postRepository: PostRepository) {}

  async execute(command: GetPostQuery): Promise<any> {
    return await this.postRepository.findById(command.postId);
  }
}
