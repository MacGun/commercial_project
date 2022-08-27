// ./data-source.ts
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';


export default new DataSource({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [path.join(__dirname, 'entities/*.entity{.ts,.js}')],
    synchronize: false,
    logging: true,
    cache: false,
});
