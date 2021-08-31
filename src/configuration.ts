export interface SwaggerDocsInterface {
  title: string;
  description: string;
  version: string;
  tag?: string;
}

export interface EnvironmentVariables {
  port: number;
  swaggerDocs: SwaggerDocsInterface;
}

export default (): EnvironmentVariables => ({
  port: +process.env.PORT,
  swaggerDocs: {
    title: process.env.SWAGGER_TITLE,
    description: process.env.SWAGGER_DESCRIPTION,
    version: process.env.SWAGGER_VERSION,
    tag: process.env.SWAGGER_TAG,
  },
});
