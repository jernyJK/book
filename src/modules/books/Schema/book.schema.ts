import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { nanoid } from 'nanoid'

export type BookDocument = Book & Document

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'books',
})
export class Book {
  @Prop({
    unique: true,
    type: String,
    index: true,
    default: () => nanoid(),
  })
  id: string

  @Prop({
    index: true,
    type: String,
    required: true,
  })
  name: string

  @Prop({
    type: String,
    required: true,
  })
  categories: string

  @Prop({
    type: Number,
    default: 10,
    index: true,
  })
  amount: number
}

export const BookSchema = SchemaFactory.createForClass(Book)
