import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, Like, Not, Any } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { GenreService } from '../genres/genre.service';
import { GenreEntity } from '../genres/genre.entity';
import { GenreRepository } from '../genres/genre.repository';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    private readonly genreService: GenreService,
    @InjectRepository(GenreEntity)
    private readonly genreRepository: GenreRepository,
  ) {}

  // Fetch all movies
  async findAll(): Promise<MovieEntity[]> {
    return this.movieRepository.find();
  }

  // Fetch a movie by ID
  async findOne(id: number | FindOneOptions<MovieEntity>): Promise<MovieEntity> {
    const options: FindOneOptions<MovieEntity> =
      typeof id === 'number' ? { where: { id } } : id;

    try {
      return await this.movieRepository.findOneOrFail(options);
    } catch (error) {
      // Handle the case when the movie with the provided ID is not found
      throw new NotFoundException(
        `Invalid Movie ID provided. Movie does not exist.`,
      );
    }
  }

  // Create a new movie
  async create(
    title: string,
    description: string,
    release_date: Date,
    genreNames: string[],
  ): Promise<MovieEntity> {
    // Find or create instances of GenreEntity for the specified genres
    const genres = await Promise.all(
      genreNames.map((name) => this.genreService.findOrCreate(name)),
    );

    // Build a new MovieEntity object
    const newMovie = new MovieEntity();
    newMovie.title = title;
    newMovie.description = description;
    newMovie.release_date = release_date;
    newMovie.genres = genres.map((genre) => genre.name);

    // Save the new movie to the database
    return this.movieRepository.save(newMovie);
  }


  // Update an existing movie by ID
async update(id: number, updatedMovie: MovieEntity): Promise<MovieEntity> {
  // Fetch the existing movie by ID
  const existingMovie = await this.findOne(id);

  // Check for new genres to create and associate with the movie
  const newGenres = updatedMovie.genres.filter(
    (genreName) => !existingMovie.genres.includes(genreName),
  );

  // Create and associate new genres with the movie
  const createdGenres = await Promise.all(
    newGenres.map((genreName) => this.genreService.findOrCreate(genreName)),
  );

  // Update the movie with existing and newly created genres
  existingMovie.title = updatedMovie.title || existingMovie.title;
  existingMovie.description = updatedMovie.description || existingMovie.description;
  existingMovie.release_date = updatedMovie.release_date || existingMovie.release_date;
  existingMovie.genres = [
    ...existingMovie.genres,
    ...createdGenres.map((genre) => genre.name),
  ];

  // Save the changes to the database
  await this.movieRepository.save(existingMovie);

  return existingMovie;
}

// Remove a movie by ID
async remove(id: number): Promise<void> {
  // Fetch the movie by ID
  const movie = await this.findOne({ where: { id: id } });

  if (!movie) {
    // Throw an exception if the movie is not found
    throw new HttpException(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Movie with ID ${id} not found`,
        error: 'Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  // Remove the movie from the movies table
  await this.movieRepository.remove(movie);

  // Check if there are other movies sharing at least one genre
  const moviesWithSameGenre = await this.movieRepository
    .createQueryBuilder('movies')
    .where(':genres = ANY(movies.genres)', { genres: movie.genres[0] })
    .andWhere('movies.id != :id', { id: movie.id })
    .getMany();

  // If there are no other movies with the same genre, remove the genre from the genres table
  if (moviesWithSameGenre.length === 0) {
    const genreNames = Array.isArray(movie.genres) ? movie.genres : [movie.genres];

    // For each genre in the movie
    for (const genreName of genreNames) {
      // Find the genre in the genres table
      const genre = await this.genreService.findGenreByName(genreName);

      // If the genre exists, remove it
      if (genre) {
        await this.genreService.remove(genre.id);
      }
    }
  }
}

// Search movies based on title and genres
async searchMovies(
  title?: string,
  genres?: string[],
): Promise<MovieEntity[]> {
  // Create a query builder for the movies table
  const queryBuilder = this.movieRepository.createQueryBuilder('movies');

  // Add the title condition if provided
  if (title) {
    queryBuilder.andWhere('movies.title ILIKE :title', {
      title: `%${title}%`,
    });
  }

  // Add the genres condition if provided and it is an array
  if (genres && Array.isArray(genres) && genres.length > 0) {
    queryBuilder.andWhere('movies.genres @> ARRAY[:...genres]', { genres });
  }

  // Execute the query and return the result
  const movies = await queryBuilder.getMany();
  return movies;
}
}
