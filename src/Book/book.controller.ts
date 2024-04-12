import { Controller, Get, Delete, Post, Put, Body, Param } from '@nestjs/common';
import { Query, UseInterceptors } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ParseIntPipe, ParseUUIDPipe } from '@nestjs/common/pipes';
import { SkipThrottle } from '@nestjs/throttler/dist/throttler.decorator';
import { NotFoundError } from 'rxjs';
import { LoggingInterceptor } from './book.interceptor';
import { BookService } from './book.service';
import { Book } from './data/book.dto';

@UseInterceptors(LoggingInterceptor) /* Controller level */
//@SkipThrottle() /* if we want skip the rate limit */
@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {

    }
    @UseInterceptors(LoggingInterceptor) /* Route level */
    @Get("/findAll")
    getAllBooks(): Book[] {
        return this.bookService.findAllBookService();
    }
    @Get("/exception")
    async getException(@Query("age") age: number): Promise<any> {
        return this.bookService.getException(age);
    }

    @Get(":id")
    getBookById(@Param("id", ParseUUIDPipe) bookId: string): Book[] {
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
    deleteBook(@Param("id", new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) bookId: string): string {
        return this.bookService.deleteBookService(bookId);
    }
}
