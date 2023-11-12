import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreEntity } from './genre.entity';
import { GenresController } from './genres.controller';
import { GenreService } from './genre.service';
import { GenreRepository } from './genre.repository'; // Assicurati di avere l'importazione corretta

@Module({
  imports: [TypeOrmModule.forFeature([GenreEntity, GenreRepository])],
  controllers: [GenresController],
  providers: [GenreService],
})
export class GenreModule {}
