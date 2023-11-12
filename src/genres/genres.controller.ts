// Import necessary modules from the NestJS framework
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

// Import the GenreService for handling genre-related operations
import { GenreService } from './genre.service';

// Import the GenreEntity for defining the structure of genre data
import { GenreEntity } from './genre.entity';

// Controller responsible for handling requests related to genres
@Controller('genres')
export class GenresController {
  // Inject the GenreService instance into the controller
  constructor(private readonly genreService: GenreService) {}

  // Endpoint to retrieve all genres
  @Get()
  findAll(): Promise<GenreEntity[]> {
    return this.genreService.findAll();
  }

  // Endpoint to retrieve a specific genre by ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<GenreEntity> {
    return this.genreService.findOne(+id);
  }

  // Endpoint to create a new genre
  @Post()
  create(@Body('name') name: string): Promise<GenreEntity> {
    return this.genreService.create(name);
  }

  // Endpoint to remove a genre by ID
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.genreService.remove(+id);
  }
}
