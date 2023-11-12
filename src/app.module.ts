// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesController } from './movies/movies.controllers';
import { MovieService } from './movies/movie.service';
import { GenresController } from './genres/genres.controller';
import { GenreService } from './genres/genre.service';
import { MovieEntity } from './movies/movie.entity';
import { GenreEntity } from './genres/genre.entity';

const dbConfig = require('../ormconfig.json'); // Sostituisci con il percorso corretto

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig,
      entities: [MovieEntity, GenreEntity],
      synchronize: true, // Da usare solo in ambiente di sviluppo
    }),
    TypeOrmModule.forFeature([MovieEntity]),
    TypeOrmModule.forFeature([GenreEntity]),
  ],
  controllers: [MoviesController, GenresController],
  providers: [MovieService, GenreService],
})
export class AppModule {}
