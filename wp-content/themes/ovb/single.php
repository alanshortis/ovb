<?php

$context = Timber::get_context();
$post = Timber::query_post();
$context['post'] = $post;

Timber::render( array('single-' . $post->post_type . '.twig', 'single.twig'), $context);
