<?php

class OvbCycling extends TimberSite {

	function __construct() {
    acf_add_options_page(array('page_title' => 'Theme Options', 'position' => 20, 'icon_url' => 'dashicons-admin-settings'));
		add_theme_support('menus');
		add_filter('timber_context', array($this, 'add_to_context'));
    add_action('admin_menu', array($this, 'remove_menu_items'));
    add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
    add_action('wp_enqueue_scripts', array($this, 'enqueue_styles'));

    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'rel_canonical');
    remove_action('wp_head', 'feed_links');
    remove_action('wp_head', 'index_rel_link');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'feed_links_extra');
    remove_action('wp_head', 'start_post_rel_link');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    remove_action('wp_head', 'parent_post_rel_link');
    remove_action('wp_head', 'rest_output_link_wp_head');
    remove_action('wp_head', 'adjacent_posts_rel_link');
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles' );
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
    remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');
    remove_action('wp_head', 'wp_resource_hints', 2);

		parent::__construct();
	}


  function remove_menu_items(){
    remove_menu_page('edit-comments.php'); // Hide comment menu item.
    remove_menu_page('edit.php'); // Hide posts menu item.
  }


  function enqueue_styles() {
    $file_name = (WP_DEBUG) ? 'style.css' : 'style.min.css';
    wp_enqueue_style('ovb-style',
      get_template_directory_uri() . '/' . $file_name,
      null,
      wp_get_theme('ovb')->get('Version')
    );
  }


  function enqueue_scripts() {
    wp_deregister_script('wp-embed');

    $file_name = (WP_DEBUG) ? 'ovb.js' : 'ovb.min.js';
    wp_enqueue_script(
      'ovb',
      get_template_directory_uri() . '/js/' . $file_name,
      array(),
      wp_get_theme('ovb')->get('Version'),
      true
    );
  }


	function add_to_context( $context ) {
		$context['menu'] = new TimberMenu();
		$context['site'] = $this;
		return $context;
	}
}

new OvbCycling();
