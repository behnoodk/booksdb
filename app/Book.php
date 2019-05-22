<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title',
        'isbn',
        'author_id',
        'cover',
        'year',
        'description',
    ];
    public function author()
    {
        return $this->hasOne('App\Author');
    }

    public function comments()
    {
        return $this->hasMany('App\Comment');
    }
}
