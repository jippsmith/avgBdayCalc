/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "avgbdaycalc",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws"
    };
  },
  async run() {
    const api = new sst.aws.ApiGatewayV2("avgBdayCalcAPI");
    api.route("ANY /{proxy+}", { handler: "backend/api.handler" });

    new sst.aws.StaticSite("avgBdayCalc", {
      build: {
        command: "npm run build",
        output: "dist"
      },
      environment: { VITE_API_URL: api.url }
    });
    // new sst.aws.Function("SSRSite", {
    //   handler: "ssr/index.handler"        <-- check out this file
    // });
    // const api = new sst.aws.ApiGatewayV2("ssrSite"); <-- this is an example Service Side Renderer
    // api.route("GET /", "ssr/index.handler");         ^ Tanner add this in here as an example for learning
  }
});
