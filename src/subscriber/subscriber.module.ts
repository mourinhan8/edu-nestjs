import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SubscriberController } from './controllers/subscriber.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [ConfigModule],
  controllers: [SubscriberController],
  providers: [
    {
      provide: 'SUBSCRIBER_SERVICE',
      useFactory: (configService: ConfigService) => {
        // return ClientProxyFactory.create({
        //   transport: Transport.TCP,
        //   options: {
        //     host: configService.get('SUBSCRIBER_SERVICE_HOST'),
        //     port: configService.get('SUBSCRIBER_SERVICE_PORT'),
        //   },
        // });
        const user = configService.get('RABBITMQ_USER');
        const password = configService.get('RABBITMQ_PASSWORD');
        const host = configService.get('RABBITMQ_HOST');
        const queueName = configService.get('RABBITMQ_QUEUE_NAME');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue: queueName,
            queueOptions: {
              durable: true,
            },
          },
        });
        // return ClientProxyFactory.create({
        //   transport: Transport.GRPC,
        //   options: {
        //     package: 'subscribers',
        //     protoPath: join(process.cwd(), 'src/subscriber/subscribers.proto'),
        //     url: configService.get('GRPC_CONNECTION_URL'),
        //   },
        // });
      },

      inject: [ConfigService],
    },
  ],
})
export class SubscriberModule {}
