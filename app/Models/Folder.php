<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Baum\NestedSet\Node as WorksAsNestedSet;

class Folder extends Model
{
    use WorksAsNestedSet;

    protected $fillable = [
        'active',
        'parent_id',
        'name',
        'slug',
        'description',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public function insertAtPosition(int $position): bool|int
    {
        return $this->insertAt($position);
    }
}
