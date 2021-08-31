import { Module } from '@nestjs/common';
import { ReposFetcherController } from "./controllers/repos-fetcher.controller";
import { ReposFetcherService } from "./services/repos-fetcher.service";

@Module({
  imports: [],
  controllers: [
    ReposFetcherController
  ],
  providers: [
    ReposFetcherService
  ],
})
export class GithubReposFetcherModule {}
