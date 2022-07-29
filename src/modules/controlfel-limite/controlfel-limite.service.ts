import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ControlFelLimite } from './entities/controlfel-limite.entity';

@Injectable()
export class ControlfelLimiteService {
  constructor(
    @InjectRepository(ControlFelLimite)
    private repository: Repository<ControlFelLimite>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }
}
