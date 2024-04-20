export class UpdateBookDTO {
  id: string;
  categoryTitle?: string | null;
  author?: string | null;
  owner: number;
  isbn: string;
  title: string;
  state: string;
  description?: string | null;
  imageId?: string;
  favourite?: any;
}