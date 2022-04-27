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
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';

@Controller('events')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Permite crear evento' })
  @ApiOkResponse({ status: 200, description: 'Evento Ok' })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Post('mail')
  @ApiOperation({
    summary:
      'Permite enviar por correo el tratamiento del evento seleccionado.',
  })
  @ApiOkResponse({ status: 200, description: 'Evento Ok' })
  sendEmail(@Body() event: any) {
    return this.eventService.sendTratamientoEmail(
      event.correo,
      event.tratamiento,
      event.idEvento,
      event.nombre_paciente,
    );
  }

  @Get('client/:id')
  @ApiOperation({
    summary:
      'Permite obtener la información de un evento por cliente en especifico.',
  })
  @ApiOkResponse({ status: 200, description: 'Evento Ok' })
  findOneOfClient(@Param('id') id: string) {
    return this.eventService.findOneOfClient(+id);
  }

  @Get('lastRegister/:id')
  @ApiOperation({
    summary: 'Permite obtener la información del ultimo evento registrado.',
  })
  @ApiOkResponse({ status: 200, description: 'Evento Ok' })
  findLastRegister(@Param('id') id: string) {
    return this.eventService.findLastRegister(+id);
  }

  @Get('email/:id')
  @ApiOperation({
    summary: 'Permite obtener el email del cliente por medio del evento.',
  })
  @ApiOkResponse({ status: 200, description: 'Evento Ok' })
  findEmailClientEvent(@Param('id') id: string) {
    return this.eventService.getEmailForEvent(+id);
  }

  @Get('emailClient/:id')
  @ApiOperation({
    summary: 'Permite obtener el email del cliente por medio de su id.',
  })
  @ApiOkResponse({ status: 200, description: 'Evento Ok' })
  findEmailClient(@Param('id') id: string) {
    return this.eventService.getEmailForClient(+id);
  }

  @Get('lastEvent/:id')
  @ApiOperation({
    summary: 'Permite obtener el ultimo evento registrado del id cliente.',
  })
  @ApiOkResponse({ status: 200, description: 'Evento Ok' })
  findLastEvento(@Param('id') id: string) {
    return this.eventService.getLastEventClient(+id);
  }

  @Get('filterDate/:startDate/:startEnd/:id')
  @ApiOperation({
    summary:
      'Permite obtener la información de un evento por medio de un rango de fechas.',
  })
  @ApiOkResponse({ status: 200, description: 'Evento Ok' })
  findForDate(
    @Param('startDate') startDate: string,
    @Param('startEnd') startEnd: string,
    @Param('id') id: number,
  ) {
    return this.eventService.filterForDate(startDate, startEnd, id);
  }

  @Get()
  @ApiOperation({ summary: 'Permite obtener una lista de eventos' })
  @ApiOkResponse({ status: 200, description: 'Evento Ok' })
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Permite obtener la información de un evento en especifico.',
  })
  @ApiOkResponse({ status: 200, description: 'Evento Ok' })
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Permite editar un evento.' })
  @ApiOkResponse({ status: 200, description: 'Evento Ok' })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Permite eliminar un evento' })
  @ApiOkResponse({ status: 200, description: 'Evento Ok' })
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
