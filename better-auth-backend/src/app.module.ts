import { Module } from '@nestjs/common';
import { auth } from './auth';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { TestController } from './test.controller';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    AuthModule.forRoot({
      auth,
      bodyParser: {
        json: { limit: '2mb' },
        urlencoded: { limit: '2mb', extended: true },
        rawBody: true,
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req }) => ({ req }),
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UserModule,
    PrismaModule,
    StudentModule,
  ],
  providers: [AppService],
  controllers: [TestController],
})
export class AppModule {}
