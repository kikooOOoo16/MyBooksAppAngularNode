import {Book} from '../../books/models/book.model';

export class User {

  constructor(
    public email: string,
    public id: string,
    public token: string,
    public tokenExpirationDate: Date,
    public booksList: Book[] = []
  ) {}

  // get token(): string {
  //   if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
  //     return null;
  //   }
  //   return this._token;
  // }
}
