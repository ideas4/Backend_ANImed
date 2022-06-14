import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateInsurageDto } from './dto/create-insurage.dto';
import { UpdateInsurageDto } from './dto/update-insurage.dto';
import { InsuragesService } from './insurages.service';

@Controller('insurages')
export class InsuragesController {
  constructor(private readonly insurageService: InsuragesService) {}

  @Post()
  @ApiOperation({ summary: 'Permite crear un seguro' })
  @ApiOkResponse({ status: 200, description: 'Seguro Ok' })
  @ApiNotAcceptableResponse({ description: 'El seguro ya existe' })
  create(@Body() createInsurageDto: CreateInsurageDto) {
    return this.insurageService.create(createInsurageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Permite obtener una lista de seguros' })
  @ApiOkResponse({ status: 200, description: 'Seguro Ok' })
  findAll() {
    return this.insurageService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Permite obtener la información de un seguro en especifico',
  })
  @ApiOkResponse({ status: 200, description: 'Seguro Ok' })
  findOne(@Param('id') id: string) {
    return this.insurageService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Permite editar un seguro' })
  @ApiOkResponse({ status: 200, description: 'Seguro Ok' })
  @ApiNotAcceptableResponse({ description: 'El seguro ya existe.' })
  update(
    @Param('id') id: string,
    @Body() UpdateInsurageDto: UpdateInsurageDto,
  ) {
    return this.insurageService.update(+id, UpdateInsurageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Permite eliminar un seguro' })
  @ApiOkResponse({ status: 200, description: 'Seguro Ok' })
  remove(@Param('id') id: string) {
    return this.insurageService.remove(+id);
  }
}
