import { Injectable } from '@nestjs/common';
import { WeatherDto } from './dto/weatherDto';
import { readdirSync } from 'fs';

require('@tensorflow/tfjs-node');
const weatherCategory = require('../weatherData/weatherCategory');

const TIMEOUT_BETWEEN_EPOCHS_MS = 500;
const testSample2 = [ -15, -17, 70, 1, 70, 17, 610 ];
const testSample5 = [ 6, 6, 40, 4, 50, 12, 802 ];
const testSample7 = [ 18, 21, 40, 4, 30, 1, 801 ];
const testSample10 = [ 36, 38, 20, 8, 5, 0, 800 ];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

@Injectable()
export class TrainService {
    async train(): Promise<boolean> {
        try {
            if (readdirSync('/home/somi/szakdolgozat/backend/src/weatherData/model/').length === 0) {
                let numTrainingIterations = 50;
                for (let i = 0; i < numTrainingIterations; i++) {
                    console.log(`Training iteration : ${i + 1} / ${numTrainingIterations}`);
                    await weatherCategory.model.fitDataset(weatherCategory.trainingData, { epochs: 5 });
                    console.log('accuracyPerClass', await weatherCategory.evaluate(true));
                    await sleep(TIMEOUT_BETWEEN_EPOCHS_MS);
                }

                await weatherCategory.saveModel('file:///home/somi/szakdolgozat/backend/src/weatherData/model/');
            } else {
                await weatherCategory.loadModel('file:///home/somi/szakdolgozat/backend/src/weatherData/model/model.json');
            }

            return true;
        } catch (err) {
            return false;
        }
    }

    async testSamples(): Promise<Object[]> {
        let result2 = await weatherCategory.predictSample(testSample2);
        let result5 = await weatherCategory.predictSample(testSample5);
        let result7 = await weatherCategory.predictSample(testSample7);
        let result10 = await weatherCategory.predictSample(testSample10);

        return [
            {
                category: 2,
                prediction: result2
            },
            {
                category: 5,
                prediction: result5
            },
            {
                category: 7,
                prediction: result7
            },
            {
                category: 10,
                prediction: result10
            }
        ];
    }

    async predict(weatherDto: WeatherDto): Promise<number> {
        let sample = [
            weatherDto.temp,
            weatherDto.feelsLike,
            weatherDto.humidity,
            weatherDto.uvi,
            weatherDto.clouds,
            weatherDto.windSpeed,
            weatherDto.weatherId
        ];

        return await weatherCategory.predictSample(sample);
    }
}
