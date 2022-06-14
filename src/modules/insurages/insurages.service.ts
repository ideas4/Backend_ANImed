import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInsurageDto } from './dto/create-insurage.dto';
import { UpdateInsurageDto } from './dto/update-insurage.dto';
import { Insurage } from './entities/insurage.entity';

@Injectable()
export class InsuragesService {
  constructor(
    @InjectRepository(Insurage) private repository: Repository<Insurage>,
  ) {}

  async create(createInsurage: CreateInsurageDto) {
    if (
      !(await this.repository.findOne({
        nombre: createInsurage.nombre,
      }))
    ) {
      return this.repository.save(createInsurage);
    } else {
      throw new HttpException('El seguro ya existe', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  async update(id: number, updateInsurageDto: UpdateInsurageDto) {
    const inst = await this.repository.findOne({
      nombre: updateInsurageDto.nombre,
    });
    if (!inst || inst.id == id) {
      return (await this.repository.update(id, updateInsurageDto)).affected;
    } else {
      throw new HttpException('El seguro ya existe', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async remove(id: number) {
    return (await this.repository.delete(id)).affected;
  }
}
