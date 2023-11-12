// Import necessary modules from the TypeORM library
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

// Import the GenreEntity for establishing a many-to-one relationship
import { GenreEntity } from '../genres/genre.entity';

// Define the MovieEntity as an entity for the 'movies' table in the database
@Entity('movies')
export class MovieEntity {
  // Define primary key column that auto-generates values
  @PrimaryGeneratedColumn()
  id: number;

  // Define a column for the movie title, allowing null values
  @Column({ type: 'varchar', nullable: true })
  title: string;

  // Define a column for the movie description, allowing null values
  @Column({ type: 'varchar', nullable: true })
  description: string;

  // Define a column for the movie release date, allowing null values
  @Column({ nullable: true })
  release_date: Date;

  // Define a column for movie genres as an array of strings, allowing null values
  @Column('varchar', { array: true, nullable: true })
  genres: string[];
}
