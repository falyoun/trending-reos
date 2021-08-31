import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FETCH_TRENDING_REPOS_PATTERN_TOKEN } from '@app/shared';
import { FetchQueryParamsType } from '@app/shared';
import { ReposFetcherService } from '../services/repos-fetcher.service';

@Controller()
export class ReposFetcherController {
  constructor(private reposFetcherService: ReposFetcherService) {}
  @MessagePattern(FETCH_TRENDING_REPOS_PATTERN_TOKEN)
  fetchTrendingRepos(@Payload() query: FetchQueryParamsType) {
    return this.reposFetcherService.fetchTrendingRepos(query);
  }
}
