export class CreateBookDto {
  title: string
  author: string
  state?: string
  categoryTitle?: string
  isbn?: string
  description?: string
  userId?: string
  shelfId?: string
}
