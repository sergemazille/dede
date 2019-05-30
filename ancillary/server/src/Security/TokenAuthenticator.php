<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

// used with each api request
class TokenAuthenticator extends AbstractGuardAuthenticator
{
    private $params;

    public function __construct(
        ParameterBagInterface $params
    ) {
        $this->params = $params;
    }

    public function supports(Request $request)
    {
        return $request->headers->has('Authorization');
    }

    public function getCredentials(Request $request)
    {
        return array(
            'token' => $request->headers->get('Authorization'),
        );
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        if ($credentials['token'] !== "Bearer " . $this->params->get('token')) {
            return;
        }

        return new User();
    }

    public function checkCredentials($credentials, UserInterface $user)
    {
        return true;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): JsonResponse
    {
        $data = [
            "message" => "La session a expiré, veuillez vous reconnecter",
            "code" => Response::HTTP_FORBIDDEN,
        ];

        return new JsonResponse($data, Response::HTTP_FORBIDDEN);
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        return null; // continue request
    }

    public function start(Request $request, AuthenticationException $authException = null)
    {
        // no need
    }

    public function supportsRememberMe()
    {
        // nope
    }
}
