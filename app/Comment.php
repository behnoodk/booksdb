<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'book_id',
        'name',
        'comment',
    ];
    public function book()
    {
        return $this->hasOne('App\Book');
    }
}
