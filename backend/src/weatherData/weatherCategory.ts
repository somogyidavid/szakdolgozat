import { loadLayersModel } from "@tensorflow/tfjs-node";
import * as path from "path";

const tf = require("@tensorflow/tfjs");

function normalize(value, min, max) {
  if (min === undefined || max === undefined) {
    return value;
  }
  return (value - min) / (max - min);
}

const TRAIN_DATA_PATH = `file://${path.resolve("./src/weatherData/weather_training_data.csv")}`;
const TEST_DATA_PATH = `file://${path.resolve("./src/weatherData/weather_test_data.csv")}`;

// const TEMP_MIN = -30;
// const TEMP_MAX = 45;
// const FEELS_LIKE_MIN = -30;
// const FEELS_LIKE_MAX = -45;
// const HUMIDITY_MIN = 20;
// const HUMIDITY_MAX = 100;
// const UVI_MIN = 0;
// const UVI_MAX = 10;
// const CLOUDS_MIN = 0;
// const CLOUDS_MAX = 100;
// const WIND_SPEED_MIN = 0;
// const WIND_SPEED_MAX = 40;
// const WEATHER_ID_MIN = 200;
// const WEATHER_ID_MAX = 804;

const NUM_WEATHER_CLASSES = 10;
const TRAINING_DATA_LENGTH = 10000;
const TEST_DATA_LENGTH = 1000;

const csvTransform =
  ({ xs, ys }) => {
    const values = [
      xs.temp,
      xs.feels_like,
      xs.humidity,
      xs.uvi,
      xs.clouds,
      xs.wind_speed,
      xs.weather_id
    ];
    return { xs: values, ys: ys.category };
  };

const trainingData =
  tf.data.csv(TRAIN_DATA_PATH, { columnConfigs: { category: { isLabel: true } } })
    .map(csvTransform)
    .shuffle(TRAINING_DATA_LENGTH)
    .batch(100);

const trainingValidationData =
  tf.data.csv(TRAIN_DATA_PATH, { columnConfigs: { category: { isLabel: true } } })
    .map(csvTransform)
    .batch(TRAINING_DATA_LENGTH);

const testValidationData =
  tf.data.csv(TEST_DATA_PATH, { columnConfigs: { category: { isLabel: true } } })
    .map(csvTransform)
    .batch(TEST_DATA_LENGTH);

let model = tf.sequential();
model.add(tf.layers.dense({ units: 250, activation: "relu", inputShape: [ 7 ] }));
model.add(tf.layers.dense({ units: 175, activation: "relu" }));
model.add(tf.layers.dense({ units: 100, activation: "relu" }));
model.add(tf.layers.dense({ units: 50, activation: "relu" }));
model.add(tf.layers.dense({ units: NUM_WEATHER_CLASSES, activation: "softmax" }));

model.compile({
  optimizer: tf.train.adam(),
  loss: "sparseCategoricalCrossentropy",
  metrics: [ "accuracy" ]
});

async function evaluate(useTestData) {
  let results = {};
  await trainingValidationData.forEachAsync(weatherCategoryBatch => {
    const values = model.predict(weatherCategoryBatch.xs).dataSync();
    const classSize = TRAINING_DATA_LENGTH / NUM_WEATHER_CLASSES;
    for (let i = 0; i < NUM_WEATHER_CLASSES; i++) {
      results[categoryFromClassNum(i)] = {
        training: calcWeatherClassEval(i, classSize, values)
      };
    }
  });

  if (useTestData) {
    await testValidationData.forEachAsync(weatherCategoryBatch => {
      const values = model.predict(weatherCategoryBatch.xs).dataSync();
      const classSize = TEST_DATA_LENGTH / NUM_WEATHER_CLASSES;
      for (let i = 0; i < NUM_WEATHER_CLASSES; i++) {
        results[categoryFromClassNum(i)].validation =
          calcWeatherClassEval(i, classSize, values);
      }
    });
  }
  return results;
}

async function predictSample(sample) {
  let result = model.predict(tf.tensor(sample, [ 1, sample.length ])).arraySync();
  let maxValue = 0;
  let predictedCategory = 10;
  for (let i = 0; i < NUM_WEATHER_CLASSES; i++) {
    if (result[0][i] > maxValue) {
      predictedCategory = i;
      maxValue = result[0][i];
    }
  }
  return categoryFromClassNum(predictedCategory);
}

function calcWeatherClassEval(categoryIndex, classSize, values) {
  let index = (categoryIndex * classSize * NUM_WEATHER_CLASSES) + categoryIndex;
  let total = 0;
  for (let i = 0; i < classSize; i++) {
    total += values[index];
    index += NUM_WEATHER_CLASSES;
  }
  return total / classSize;
}

function categoryFromClassNum(classNum) {
  switch (classNum) {
    case 0:
      return "1";
    case 1:
      return "2";
    case 2:
      return "3";
    case 3:
      return "4";
    case 4:
      return "5";
    case 5:
      return "6";
    case 6:
      return "7";
    case 7:
      return "8";
    case 8:
      return "9";
    case 9:
      return "10";
    default:
      return "Unknown";
  }
}

async function saveModel(path) {
  await model.save(path);
}

async function loadModel(path) {
  model = await loadLayersModel(path);
}

module.exports = {
  evaluate,
  model,
  categoryFromClassNum,
  predictSample,
  testValidationData,
  trainingData,
  saveModel,
  loadModel,
  TEST_DATA_LENGTH
};
