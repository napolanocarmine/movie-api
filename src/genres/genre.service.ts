// Import necessary modules from the NestJS framework
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Import entities and repositories related to genres and movies
import { GenreEntity } from './genre.entity';
import { MovieEntity } from '../movies/movie.entity';
import { MovieRepository } from '../movies/movie.repository';

// Injectable service for handling operations related to genres
@Injectable()
export class GenreService {
  // Inject the GenreEntity and MovieRepository instances into the service
  constructor(
    @InjectRepository(GenreEntity)
    private readonly genreRepository: Repository<GenreEntity>,
    @InjectRepository(MovieEntity)
    private readonly movieRepository: MovieRepository,
  ) {}

  // Retrieve all genres from the database
  async findAll(): Promise<GenreEntity[]> {
    return this.genreRepository.find();
  }

  // Retrieve a specific genre by ID from the database
  async findOne(id: number): Promise<GenreEntity | undefined> {
    return this.genreRepository.findOne({ where: { id: id } });
  }

  // Create a new genre and save it to the database
  async create(name: string): Promise<GenreEntity> {
    const genre = this.genreRepository.create({ name });
    return this.genreRepository.save(genre);
  }

  // Remove a genre by ID, including removing it from associated movies
  async remove(id: number): Promise<void> {
    // Find the genre to be removed
    const genreToRemove = await this.genreRepository.findOne({
      where: { id: id },
    });

    if (!genreToRemove) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    // Remove the genre from all associated movies
    await this.removeGenreFromMovies(genreToRemove.name);

    // Remove the genre from the genres table
    await this.genreRepository.remove(genreToRemove);
  }

  // Remove a specific genre from all movies that contain it
  async removeGenreFromMovies(genreName: string): Promise<void> {
    // Find all movies that contain the specified genre
    const movies = await this.movieRepository
      .createQueryBuilder('movies')
      .where(`:genres = ANY(movies.genres)`, { genres: genreName })
      .getMany();

    // Remove the genre from each movie
    await Promise.all(
      movies.map((movie) => this.removeGenreFromMovie(movie, genreName)),
    );
  }

  // Remove a specific genre from a movie's list of genres
  async removeGenreFromMovie(
    movie: MovieEntity,
    genreName: string,
  ): Promise<void> {
    // Remove the genre from the movie's array of genres
    movie.genres = movie.genres.filter((genre) => genre !== genreName);

    // Save the updated movie to the database
    await this.movieRepository.save(movie);
  }

  // Find or create a genre based on its name
  async findOrCreate(name: string): Promise<GenreEntity> {
    // Search for the genre in the database
    let genre = await this.genreRepository.findOne({ where: { name } });

    // If the genre does not exist, create it
    if (!genre) {
      genre = this.genreRepository.create({ name });
      genre = await this.genreRepository.save(genre);
    }

    return genre;
  }

  // Find a genre by its name, throwing an exception if not found
  async findGenreByName(name: string): Promise<GenreEntity | undefined> {
    const genre = await this.genreRepository.findOne({ where: { name } });

    if (!genre) {
      throw new NotFoundException(`Genre with name ${name} not found`);
    }

    return genre;
  }
}
