export class CreateBookDto {
  bookTitle: string
  bookAuthor: string
  bookQuality?: string
  bookCategory?: string
  bookIsbn: string
  bookDesr?: string
  shelfId: string
  user: string
}
