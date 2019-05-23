<?php

namespace App\Http\Controllers;

use App\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index()
    {
        return response()->json(Author::all()->toArray());
    }

    public function store(Request $request)
    {
        $author = new Author([
            'name' => $request->get('name')
        ]);
        $author->save();

        return response()->json([
                'status' => (bool) $author,
                'message'=> $author ? 'Author Created' : 'Error Creating Author'
            ]);
    }

    public function show(Author $author)
    {
        return response()->json($author);
    }

    public function update(Request $request, Author $author)
    {
        $status = $author->update([
            'name' => $request->get('name')
        ]);

        return response()->json([
                'status' => $status,
                'message' => $status ? 'Author Updated!' : 'Error Updating Author'
            ]);
    }

    public function destroy(Author $author)
    {
        $status = $author->delete();

        return response()->json([
                'status' => $status,
                'message' => $status ? 'Author Deleted' : 'Error Deleting Author'
            ]);
    }
}
