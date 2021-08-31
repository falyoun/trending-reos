import { Injectable } from '@nestjs/common';
import { FetchQueryParamsType } from '@app/shared';
import axios from 'axios';
import { GithubRepo } from '@app/shared';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ReposFetcherService {
  async fetchTrendingRepos(query: FetchQueryParamsType): Promise<GithubRepo[]> {
    if (!(query.sort && query.created && query.order)) {
      throw new RpcException({
        message: `Required fields: (sort, created, order)`,
        error: `Not all required fields are filled`,
      });
    }
    const url = `https://api.github.com/search/repositories?q=created:>${query.created}&sort=${query.sort}&order=${query.order}`;
    return await axios
      .get(url)
      .then((response) => {
        if (response && response.data) {
          return response.data;
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  async getTrendingReposStats(query: FetchQueryParamsType) {
    const repos = await this.fetchTrendingRepos(query).then(
      (r) => r['items'] || [],
    );

    if (repos) {
      const dict = {};
      for (const repo of repos) {
        const currentLanguage = repo?.language || 'No language';
        const alreadyStoredRepo = dict[currentLanguage];
        if (alreadyStoredRepo) {
          dict[currentLanguage] = {
            repos: [...alreadyStoredRepo.repos, repo],
            count: alreadyStoredRepo.count + 1,
          };
        } else {
          dict[currentLanguage] = {
            repos: [repo],
            count: 1,
          };
        }
      }
      return dict;
    }
    return null;
  }
}
