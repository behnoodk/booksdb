<?php

namespace App\Http\Controllers;

use App\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index()
    {
        return response()->json(Comment::all()->toArray());
    }

    public function store(Request $request)
    {
        $comment = new Comment([
            'book_id' => $request->get('book_id'),
            'name' => $request->get('name'),
            'comment' => $request->get('comment'),
        ]);
        $comment->save();

        return response()->json([
                'status' => (bool) $comment,
                'message'=> $comment ? 'Comment Created' : 'Error Creating Comment'
            ]);
    }

    public function show(Comment $comment)
    {
        return response()->json($comment);
    }

    public function update(Request $request, Comment $comment)
    {
        $status = $comment->update($request);

        return response()->json([
                'status' => $status,
                'message' => $status ? 'Comment Updated!' : 'Error Updating Comment'
            ]);
    }

    public function destroy(Comment $comment)
    {
        $status = $comment->delete();

        return response()->json([
                'status' => $status,
                'message' => $status ? 'Comment Deleted' : 'Error Deleting Comment'
            ]);
    }
}
