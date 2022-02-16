import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { BooksService } from './books.service'
import { BookDto } from './dto/book.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  findAll() {
    return this.booksService.findAll()
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const book = await this.booksService.findOne(id)
    if (book === null) {
      throw new BadRequestException({ message: `Not found Id : ${id}` })
    }
    return book
  }

  @Post('create')
  async createBook(@Body() createBook: BookDto) {
    return this.booksService.create(createBook)
  }

  @Put('/:id')
  async updateBook(@Param('id') id: string, @Body() updateBookDto: BookDto) {
    const book = await this.booksService.findOne(id) //check id
    if (book === null) {
      throw new BadRequestException({ message: `Not found Id : ${id}` })
    }
    const updateBook = await this.booksService.update(id, updateBookDto) //updated
    if (updateBook.modifiedCount === 0) {
      return { update: false }
    }
    return { update: true }
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const book = await this.booksService.findOne(id) //check id
    if (book === null) {
      throw new BadRequestException({ message: `Not found Id : ${id}` })
    }
    const bookDelete = await this.booksService.remove(id) //check id
    if (bookDelete.deletedCount === null) {
      return { delete: false }
    }
    return { delete: true }
  }
}
