import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';
import { BlockService } from './block.service';
import { CreateBlockDto } from './dtos/create-block.dto';

@Controller('block')
export class BlockController {
    constructor(private readonly blockService: BlockService) {}

    @Post()
    create(@Body() dto: CreateBlockDto) {
    return this.blockService.create(dto);
    }

    @Get()
    findAll() {
    return this.blockService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
    return this.blockService.findOne(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
    return this.blockService.remove(+id);
    }
}
