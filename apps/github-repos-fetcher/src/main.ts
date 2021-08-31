import { NestFactory } from '@nestjs/core';
import { GithubReposFetcherModule } from './github-repos-fetcher.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GithubReposFetcherModule,
    {
      transport: Transport.REDIS,
      options: {
        auth_pass: process.env.REDIS_PASSWORD,
        url: process.env.REDIS_URL,
      },
    },
  );
  await app.listen().then(() => {
    console.log(`Github repos fetcher service is running`);
  });
}

(async () => {
  try {
    await bootstrap();
  } catch (e) {
    console.error('Error while bootstrapping github repos fetcher service', e);
  }
})();
