import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ControlfelLimiteService } from './controlfel-limite.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('controlfel-limite')
@ApiTags('Controlfel-limite')
export class ControlfelLimiteController {
  constructor(
    private readonly controlFelLimiteService: ControlfelLimiteService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Permite obtener una lista de clientes' })
  @ApiOkResponse({ status: 200, description: 'Cliente Ok' })
  findAll() {
    return this.controlFelLimiteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Permite obtener la información de un cliente' })
  @ApiOkResponse({ status: 200, description: 'Cliente Ok' })
  findOne(@Param('id') id: string) {
    return this.controlFelLimiteService.findOne(+id);
  }
}
