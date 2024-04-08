import { Controller, Get, Delete, Post, Put, Body, Param } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler/dist/throttler.decorator';
import { BookService } from './book.service';
import { Book } from './data/book.dto';

//@SkipThrottle() /* if we want skip the rate limit */
@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {

    }
    @Get("/findAll")
    getAllBooks(): Book[] {
        return this.bookService.findAllBookService();
    }

    @Get(":id")
    getBookById(@Param("id") bookId: string): Book[] {
        return this.bookService.findBookByIdBookService(bookId);
    }

    @Put("/update")
    updateBook(@Body() book: Book): string {
        return this.bookService.updateBookService(book);
    }

    @Post("add")
    addBook(@Body() book: Book): string {
        return this.bookService.addBookService(book);
    }

    @Delete("delete/:id")
    deleteBook(@Param("id") bookId: string): string {
        return this.bookService.deleteBookService(bookId);
    }
}
