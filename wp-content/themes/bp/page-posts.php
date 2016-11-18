<?php
/**
 * Template Name: Posts
 * Description: All posts as excerpts
 */

 $context = Timber::get_context();
 $context['posts'] = Timber::get_posts();
 Timber::render('posts.twig', $context);
