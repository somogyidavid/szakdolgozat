import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { readdirSync } from "fs";
import * as path from "path";

require("@tensorflow/tfjs-node");
const weatherCategory = require("./weatherData/weatherCategory");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle("Szakdolgozat - Somogyi Dávid - EQDGRJ")
    .setDescription("Szabadidős programajánló alkalmazás Android és iOS mobil eszközökre")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);

  if (readdirSync(path.resolve("./src/weatherData/model/")).length !== 0) {
    await weatherCategory.loadModel(`file://${path.resolve("./src/weatherData/model/model.json")}`);
  }
}

bootstrap();
