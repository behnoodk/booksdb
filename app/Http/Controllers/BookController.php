<?php

namespace App\Http\Controllers;

use App\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        return response()->json(Book::all()->toArray());
    }

    public function store(Request $request)
    {
        $book = Book::create($request);

        return response()->json([
                'status' => (bool) $book,
                'message'=> $book ? 'Book Created' : 'Error Creating Book'
            ]);
    }

    public function show(Book $book)
    {
        return response()->json($book);
    }

    public function comments(Book $book)
    {
        return response()->json($book->comments()->orderBy('id')->get());
    }

    public function update(Request $request, Book $book)
    {
        $status = $book->update($request);

        return response()->json([
                'status' => $status,
                'message' => $status ? 'Book Updated!' : 'Error Updating Book'
            ]);
    }

    public function destroy(Book $book)
    {
        $status = $book->delete();

        return response()->json([
                'status' => $status,
                'message' => $status ? 'Book Deleted' : 'Error Deleting Book'
            ]);
    }
}
