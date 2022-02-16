import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Book, BookDocument } from './Schema/book.schema'
import { Model, UpdateWriteOpResult } from 'mongoose'
import { BookDto } from './dto/book.dto'

@Injectable()
export class BooksService {
  @InjectModel(Book.name) private BookModel: Model<BookDocument>

  async create(createBookDto: BookDto): Promise<Book> {
    return new this.BookModel(createBookDto).save()
  }

  async update(
    id: string,
    updateBookDto: BookDto,
  ): Promise<UpdateWriteOpResult> {
    return this.BookModel.updateOne({ id }, { $set: { ...updateBookDto } })
  }

  findAll() {
    return this.BookModel.find()
  }

  findOne(id: string) {
    // return `id is : ${id}`
    return this.BookModel.findOne({ id })
  }

  remove(id: string) {
    return this.BookModel.deleteOne({ id })
  }
}
