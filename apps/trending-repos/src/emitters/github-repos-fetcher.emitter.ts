import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  GITHUB_REPOS_FETCHER_CLIENT_TOKEN,
  FETCH_TRENDING_REPOS_PATTERN_TOKEN,
  FetchQueryParamsType,
  GithubRepo,
  FETCH_TRENDING_REPOS_PATTERN_STATS_TOKEN,
} from '@app/shared';

@Controller()
export class GithubReposFetcherEmitter {
  constructor(
    @Inject(GITHUB_REPOS_FETCHER_CLIENT_TOKEN)
    private readonly clientProxy: ClientProxy,
  ) {}

  @Get('/trending-repos')
  fetchTrendingRepos(@Query() params: FetchQueryParamsType) {
    return new Promise((resolve, reject) => {
      this.clientProxy
        .send<GithubRepo[]>(FETCH_TRENDING_REPOS_PATTERN_TOKEN, params)
        .subscribe((data) => {
          resolve(data);
        }, reject);
    });
  }

  @Get('/trending-repos-stats')
  fetchTrendingReposStats(@Query() params: FetchQueryParamsType) {
    return new Promise((resolve, reject) => {
      this.clientProxy
        .send<{ key: string; value: { count: number; repos: GithubRepo[] } }>(
          FETCH_TRENDING_REPOS_PATTERN_STATS_TOKEN,
          params,
        )
        .subscribe((data) => {
          resolve(data);
        }, reject);
    });
  }
}
