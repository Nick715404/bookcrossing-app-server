export class CreateBookDto {
  title: string
  author: string
  state?: string
  categoryTitle?: string
  isbn: string
  description?: string
  shelfId: string
  user?: string
}
