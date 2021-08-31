import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const GITHUB_REPOS_FETCHER_CLIENT_TOKEN =
  'GITHUB_REPOS_FETCHER_CLIENT_TOKEN';
export const githubReposFetcherClient = ClientProxyFactory.create({
  transport: Transport.REDIS,
  options: {
    auth_pass: process.env.REDIS_PASSWORD,
    url: process.env.REDIS_URL,
  },
});
