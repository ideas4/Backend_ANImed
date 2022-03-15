import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConfigMedDto } from './dto/create-config-med.dto';
import { ConfigMed } from './entities/config-med.entity';

@Injectable()
export class ConfigMedService {
  constructor(
    @InjectRepository(ConfigMed) private repository: Repository<ConfigMed>,
  ) {}

  async findOne() {
    return this.repository.findOne(1);
  }

  async create(createConfigMedDto: CreateConfigMedDto) {
    return this.repository.save(createConfigMedDto);
  }
}
