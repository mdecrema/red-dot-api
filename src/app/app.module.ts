import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from 'src/chat/chat.gateway';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [typeorm]
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'manager-home-app-bo',
      // entities: ["dist/**/*.entity{.ts,.js}"],
      // autoLoadEntities: true,
      synchronize: true,
      // migrations: ["dist/migrations/*{.ts,.js}"],
      // migrations: ['src/migrations/*{.ts,.js}'],
      // migrationsRun: false,
      // migrationsTableName: 'typeorm_migrations',
    }),
    UserModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
