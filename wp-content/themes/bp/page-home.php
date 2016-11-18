<?php
/**
 * Template Name: Home
 * Description: Home page
 */

 $context = Timber::get_context();
 $post = new TimberPost();
 $context['post'] = $post;
 Timber::render('home.twig', $context);
