<?php

namespace App\Controller;

use App\Service\FixturesProvider;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class ApiController
{
    public function index(string $resourceType, string $resourceId, Request $request, FixturesProvider $fixturesProvider): JsonResponse
    {
        $isValidRequest = $request->headers->has('Authorization');

        if (!$isValidRequest) {
            $data = array(
                "code" => Response::HTTP_FORBIDDEN,
                "message" => "Penser à ajouter le header Authorization",
            );
    
            return new JsonResponse($data, Response::HTTP_FORBIDDEN);
        }

        // simule une référence qui n'existe pas (référence préfixée par le symbole '-')
        $invalidResourceId = preg_match('/^-/', $resourceId);
        if ($invalidResourceId) {    
            return new JsonResponse([], Response::HTTP_BAD_REQUEST);
        }

        if ($resourceType === "users") {
            $fixtures = $fixturesProvider->getUsers();

            $data = array(
                "code" => Response::HTTP_OK,
                "response" => $fixtures,
            );
    
            return new JsonResponse($data, Response::HTTP_OK);
        }

        if ($resourceType === "comments") {
            $fixtures = $fixturesProvider->getComments();

            $data = array(
                "code" => Response::HTTP_OK,
                "response" => $fixtures,
            );
    
            return new JsonResponse($data, Response::HTTP_OK);
        }

        $data = array(
            "code" => Response::HTTP_BAD_REQUEST,
            "message" => "Pas de type de formulaire correspondant",
        );

        return new JsonResponse($data, Response::HTTP_BAD_REQUEST);
    }
}
