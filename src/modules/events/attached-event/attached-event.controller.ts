import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AttachedEventService } from './attached-event.service';
import { CreateAttachedEventDto } from './dto/create-attached-event.dto';
import { UpdateAttachedEventDto } from './dto/update-attached-evetn.dto';

@Controller('attached-event')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Attached-Events')
export class AttachedEventController {
  constructor(private readonly attachedEventService: AttachedEventService) {}

  @Post()
  @ApiOperation({
    summary: 'Permite crear un registro de los archivos adjuntos en un evento.',
  })
  @ApiOkResponse({ status: 200, description: 'Evento Adjunto Ok' })
  create(@Body() createAttachedEventDto: CreateAttachedEventDto) {
    return this.attachedEventService.create(createAttachedEventDto);
  }

  @Get('event/:id')
  @ApiOperation({
    summary:
      'Permite obtener la información de los archivos adjuntos de un evento especifico.',
  })
  @ApiOkResponse({ status: 200, description: 'Evento Adjunto Ok' })
  findForEvent(@Param('id') id: string) {
    return this.attachedEventService.findForEvent(+id);
  }

  @Get()
  @ApiOperation({
    summary:
      'Permite obtener una lista de archivos adjuntos de todos los eventos.',
  })
  @ApiOkResponse({ status: 200, description: 'Evento Adjunto Ok' })
  findAll() {
    return this.attachedEventService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary:
      'Permite obtener la información de los de un archivo adjunto por su id.',
  })
  @ApiOkResponse({ status: 200, description: 'Evento Adjunto Ok' })
  findOne(@Param('id') id: string) {
    return this.attachedEventService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Permite editar los archivos adjuntos de un evento.',
  })
  @ApiOkResponse({ status: 200, description: 'Evento Adjunto Ok' })
  update(
    @Param('id') id: string,
    @Body() updateAttachedEventDto: UpdateAttachedEventDto,
  ) {
    return this.attachedEventService.update(+id, updateAttachedEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Permite eliminar un archivo adjunto de un evento' })
  @ApiOkResponse({ status: 200, description: 'Evento Adjunto Ok' })
  remove(@Param('id') id: string) {
    return this.attachedEventService.remove(+id);
  }
}
