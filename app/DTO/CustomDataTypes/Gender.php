<?php

namespace App\DTO\CustomDataTypes;

class Gender extends CustomData {

    public string $type = "select";

    public string $title = "Gender";

    public array $options = [
        ['value' => 'male', 'title' => 'Male'],
        ['value' => 'female', 'title' => 'Female'],
    ];

    public string $component = "Gender";

}
