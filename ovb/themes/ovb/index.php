<?php

$ig_feed = json_decode(file_get_contents("https://api.instagram.com/v1/users/1473021812/media/recent/?access_token=" . getenv('IG_API') . "&count=9"));

$context = Timber::get_context();
$context['posts'] = Timber::get_posts();
$context['ig_feed'] = $ig_feed;
Timber::render('home.twig', $context);
