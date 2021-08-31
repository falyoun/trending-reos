import { Injectable } from '@nestjs/common';
import { FetchQueryParamsType } from '@app/shared';
import axios from 'axios';
@Injectable()
export class ReposFetcherService {
  async fetchTrendingRepos(query: FetchQueryParamsType) {
    return await axios
      .get('https://api.github.com/search/repositories', {
        params: { ...query },
      })
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
