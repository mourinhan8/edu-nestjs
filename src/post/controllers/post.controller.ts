import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  // UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { PostService } from '../services/post.service';
// import { ExceptionLoggerFilter } from 'src/utils/exceptionLogger.filter';
// import { HttpExceptionFilter } from 'src/utils/httpException.filter';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPost(@Query() query: any) {
    console.log(query);
    return this.postService.getAllPost();
  }

  @Get(':id')
  // @UseFilters(HttpExceptionFilter)
  // @UseFilters(ExceptionLoggerFilter)
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(@Req() req: any, @Body() post: CreatePostDto) {
    return this.postService.createPost(req.user, post);
  }

  @Put(':id')
  async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postService.replacePost(id, post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    await this.postService.deletePost(id);
    return true;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/all')
  async getPostUser(@Req() req: any) {
    await req.user.populate('posts');
    return req.user.posts;
  }

  @Get('get/category')
  async getByCategory(@Query('category_id') category_id) {
    return await this.postService.getByCategory(category_id);
  }

  @Get('get/categories')
  async getByCategories(@Query('category_ids') category_ids) {
    return await this.postService.getByCategories(category_ids);
  }
}
