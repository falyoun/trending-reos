import { Injectable } from '@nestjs/common';
import { FetchQueryParamsType } from '@app/shared';
import axios from 'axios';
@Injectable()
export class ReposFetcherService {
  async fetchTrendingRepos(query: FetchQueryParamsType) {
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
