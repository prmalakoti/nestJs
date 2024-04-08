import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
uuidv4()
import { Book } from './data/book.dto';

@Injectable()
export class BookService {
    public books: Book[] = []

    addBookService(book: Book) {
        book.id = uuidv4();
        this.books.push(book);
        return "Book added successfully";
    }

    updateBookService(book: Book) {
        let index = this.books.findIndex((currentbook) => {
            return currentbook.id == book.id;
        })
        this.books[index] = book
        return "Book has been updated successfully";
    }

    deleteBookService(bookId: string): string {
        this.books = this.books.filter((currentbook) => {
            return currentbook.id != bookId;
        })
        return "Book has been deleted successfully";
    }

    findAllBookService(): Book[] {
        return this.books;
    }

    findBookByIdBookService(bookId: string): Book[] {
        return this.books.filter((currentbook) => {
            return currentbook.id == bookId;
        })
    }
}
