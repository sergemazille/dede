<?php

namespace App\Service;

class FixturesProvider
{
    public function getUsers(): array
    {
        $fixtures = [
            [
                "username" => "Leanne",
                "name" => "Graham",
                "email" => "leanne.graham@leannegraham.com",
                "website" => "https://www.leannegraham.com",
            ],
            [
                "username" => "Bauch",
                "name" => "Clementine",
                "email" => "bauch@gmail.com",
                "website" => "https://www.bauch.co.uk",
            ],
            [
                "username" => "Schulist",
                "name" => "Leopoldo",
                "email" => "Karley_Dach@jasper.info",
                "website" => "https://ola.org",
            ]
        ];

        $index = rand(0, 2);

        return $fixtures[$index];
    }

    public function getComments(): array
    {
        $fixtures = [
            [
                "name" => "Commentaire #1",
                "email" => "leanne.graham@leannegraham.com",
                "body" => "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet cumque voluptatum laboriosam ex illum enim voluptatem ratione quo. Molestiae ut magnam dolores maiores iure libero!",
            ],
            [
                "name" => "Commentaire #2",
                "email" => "bauch@gmail.com",
                "body" => "Amet cumque voluptatum laboriosam ex illum enim voluptatem ratione quo. Molestiae ut magnam dolores maiores iure libero quis tenetur voluptatem exercitationem velit!",
            ],
            [
                "name" => "Commentaire #3",
                "email" => "Karley_Dach@jasper.info",
                "body" => "doloribus at sed quis culpa deserunt consectetur qui praesentium",
            ]
        ];

        $index = rand(0, 2);

        return $fixtures[$index];
    }
}
