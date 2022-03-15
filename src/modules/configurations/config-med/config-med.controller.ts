import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ConfigMedService } from './config-med.service';
import { CreateConfigMedDto } from './dto/create-config-med.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('config-med')
@ApiTags('Config-Med')
export class ConfigMedController {
  constructor(private readonly configMedService: ConfigMedService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene las configuraciones del medico' })
  @ApiOkResponse({ status: 200, description: 'Config Med Ok' })
  findAll() {
    return this.configMedService.findOne();
  }

  @Post()
  @ApiOperation({ summary: 'Agregar las configuraciones del medico.' })
  @ApiOkResponse({ status: 200, description: 'Config Med Ok' })
  create(@Body() CreateConfigMedDto: CreateConfigMedDto) {
    return this.configMedService.create(CreateConfigMedDto);
  }
}
