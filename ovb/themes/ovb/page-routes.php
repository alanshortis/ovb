<?php
/**
* Template Name: Routes
* Description: Routes page
*/

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
Timber::render('routes.twig', $context);
