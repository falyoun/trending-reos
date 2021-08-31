import { Injectable } from '@nestjs/common';
import { FetchQueryParamsType } from '@app/shared';
import axios from 'axios';
import { GithubRepo } from '@app/shared';
@Injectable()
export class ReposFetcherService {
  async fetchTrendingRepos(query: FetchQueryParamsType): Promise<GithubRepo[]> {
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
}
