import { Controller, Get, Inject, Query } from "@nestjs/common";
import { ClientProxy } from '@nestjs/microservices';
import {
  GITHUB_REPOS_FETCHER_CLIENT_TOKEN,
  FETCH_TRENDING_REPOS_PATTERN_TOKEN,
  FetchQueryParamsType,
} from '@app/shared';

@Controller()
export class GithubReposFetcherEmitter {
  constructor(
    @Inject(GITHUB_REPOS_FETCHER_CLIENT_TOKEN)
    private readonly client: ClientProxy,
  ) {}

  @Get('/trending-repos')
  fetchTrendingRepos(@Query() params: FetchQueryParamsType) {
    this.client.send(FETCH_TRENDING_REPOS_PATTERN_TOKEN, params).toPromise();
  }
}
