import { Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';

@Controller('subscriber')
export class SubscriberController {
  constructor(
    @Inject('SUBSCRIBER_SERVICE')
    private readonly subscriberService: ClientProxy,

    // @Inject('SUBSCRIBER_SERVICE')
    // private client: ClientGrpc,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getSubscribers() {
    return this.subscriberService.send(
      {
        cmd: 'get-all-subscriber',
      },
      {},
    );
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createSubscribers(@Req() req: any) {
    return this.subscriberService.send(
      {
        cmd: 'add-subscriber',
      },
      req.user,
    );
  }

  @Post('event')
  @UseGuards(AuthGuard('jwt'))
  async createSubscribersEvent(@Req() req: any) {
    this.subscriberService.emit(
      {
        cmd: 'add-subscriber',
      },
      req.user,
    );
    return true;
  }

  @Post('rmq')
  @UseGuards(AuthGuard('jwt'))
  async createPost(@Req() req: any) {
    return this.subscriberService.send(
      {
        cmd: 'add-subscriber',
      },
      req.user,
    );
  }
}
