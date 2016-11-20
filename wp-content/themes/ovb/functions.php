<?php

class OvbCycling extends TimberSite {

	function __construct() {
		add_theme_support('menus');
		add_filter('timber_context', array($this, 'add_to_context'));
    add_filter('upload_mimes', array($this, 'custom_mtypes'));
		add_action('init', array($this, 'register_post_types'));
    add_action('init', array($this, 'register_my_menus'));
    add_action('admin_menu', array($this, 'remove_menu_items'));

		parent::__construct();
	}

	function register_post_types() {
  	register_post_type(
      'routes',
      array(
    		'labels' => array(
      		'name' => _x('Routes', 'post type general name'),
      		'singular_name' => _x('Route', 'post type singular name'),
      		'add_new' => _x('Add New', 'Route'),
      		'add_new_item' => __('Add New Route'),
      		'edit_item' => __('Edit Route'),
      		'new_item' => __('New Route'),
      		'view_item' => __('View Route'),
      		'search_items' => __('Search Routes'),
      		'not_found' =>  __('No routes found'),
      		'not_found_in_trash' => __('No routes found in Bin'),
      		'parent_item_colon' => ''
      	),
        'has_archive' => false,
    		'public' => true,
    		'publicly_queryable' => true,
    		'show_ui' => true,
    		'query_var' => true,
    		'menu_icon' => 'dashicons-location-alt',
    		'rewrite' => true,
    		'capability_type' => 'page',
    		'hierarchical' => false,
    		'rewrite' => array(
    			'slug' => 'route',
    		 	'with_front' => false
    		),
    		'menu_position' => null,
    		'supports' => array('title', 'editor')
    	)
    );
	}

  function register_my_menus() {
  	register_nav_menus(
  		array(
  			'main-menu' => __('Main Menu')
  		)
  	);
  }

  function custom_mtypes($m){
    $m['svg'] = 'image/svg+xml';
    return $m;
  }

  function remove_menu_items(){
    remove_menu_page('edit-comments.php'); // Hide comment menu item.
    remove_menu_page('edit.php'); // Hide posts menu item.
  }

	function add_to_context( $context ) {
		$context['menu'] = new TimberMenu();
		$context['site'] = $this;
    $context['main_menu'] = new TimberMenu('main-menu');
    $context['social_menu'] = new TimberMenu('social-menu');
		return $context;
	}
}

new OvbCycling();
