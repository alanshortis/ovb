<?php
/**
* Template Name: Racing
* Description: Racing page
*/

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
Timber::render('racing.twig', $context);
