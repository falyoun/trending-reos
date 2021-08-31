import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { GithubReposFetcherEmitter } from './emitters';
import {
  GITHUB_REPOS_FETCHER_CLIENT_TOKEN,
  githubReposFetcherClient,
} from '@app/shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  controllers: [GithubReposFetcherEmitter],
  providers: [
    {
      provide: GITHUB_REPOS_FETCHER_CLIENT_TOKEN,
      useValue: githubReposFetcherClient,
    },
  ],
})
export class AppModule {}
