import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AdminJS from 'adminjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { entities } from './entities';
import { PostsModule } from './posts/posts.module';
import { UserModule } from './users/users.module';
import { root } from './utils/path';
import { Resource, Database } from '@adminjs/typeorm';
import { Posts } from './posts/posts.entity';
import { User } from './users/users.entity';
import { AdminModule } from '@adminjs/nestjs';
import { Comments } from './comments/comments.entity';
import { PostsService } from './posts/posts.service';

AdminJS.registerAdapter({ Resource, Database });

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities,
      logging: true,
      type: 'sqlite',
      synchronize: true,
      database: `${root}/db/db.db`,
    }),
    TypeOrmModule.forFeature([Comments, Posts]),
    AuthModule,
    PostsModule,
    CommentsModule,
    UserModule,
    AdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [User, Posts, Comments],
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret',
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PostsService],
})
export class AppModule {}
