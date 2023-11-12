// Import necessary modules from NestJS
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';

// Import MovieService and MovieEntity for controller usage
import { MovieService } from './movie.service';
import { MovieEntity } from './movie.entity';

// Define the controller for handling movie-related endpoints
@Controller('movies')
export class MoviesController {
  // Inject the MovieService into the controller
  constructor(private readonly movieService: MovieService) {}

  // Endpoint to get all movies
  @Get()
  async findAll(): Promise<MovieEntity[]> {
    return this.movieService.findAll();
  }

  // Endpoint to get a specific movie by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MovieEntity> {
    return this.movieService.findOne(+id);
  }

  // Endpoint to create a new movie
  @Post()
  async create(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('release_date') release_date: Date,
    @Body('genres') genres: string[],
  ): Promise<MovieEntity> {
    return this.movieService.create(title, description, release_date, genres);
  }

  // Endpoint to update a movie by ID
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() movie: MovieEntity,
  ): Promise<MovieEntity> {
    return this.movieService.update(+id, movie);
  }

  // Endpoint to remove a movie by ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.movieService.remove(+id);
  }

  // Endpoint to search for movies by title or genre
  @Get('search')
  searchMovies(
    @Query('title') title?: string,
    @Query('genres') genres?: string[],
  ): Promise<MovieEntity[]> {
    return this.movieService.searchMovies(title, genres);
  }
}
