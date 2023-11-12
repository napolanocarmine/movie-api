// Import necessary modules from the TypeORM library
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Define an entity class for genres to be stored in the 'genres' table
@Entity('genres')
export class GenreEntity {
  // Define the primary key column, auto-generated
  @PrimaryGeneratedColumn()
  id: number;

  // Define a column for the genre name, allowing null values
  @Column({ type: 'varchar', nullable: true })
  name: string;
}
