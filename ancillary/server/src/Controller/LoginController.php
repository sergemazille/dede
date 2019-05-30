<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class LoginController
{
    public function index(Request $request, ParameterBagInterface $params): Response
    {
        $credentials = json_decode($request->getContent(), true);
        $email = $credentials["email"];
        $password = $credentials["password"];

        if ($email !== $params->get('email') || $password !== $params->get('password')) {
            $data = array(
                "code" => Response::HTTP_FORBIDDEN,
                "message" => "Mauvais identifiants",
            );
    
            return new JsonResponse($data, Response::HTTP_FORBIDDEN);
        }

        $data = array(
            "code" => Response::HTTP_OK,
            "message" => "OK",
            "token" => $params->get('token'),
        );

        return new JsonResponse($data, Response::HTTP_OK);
    }
}
