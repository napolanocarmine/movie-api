import { EntityRepository, Repository } from 'typeorm';
import { GenreEntity } from './genre.entity';

@EntityRepository(GenreEntity)
export class GenreRepository extends Repository<GenreEntity> {}
