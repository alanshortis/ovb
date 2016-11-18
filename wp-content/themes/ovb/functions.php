<?php

class WordPressBoilerplate extends TimberSite {

	function __construct() {
		add_theme_support('menus');
		add_filter('timber_context', array($this, 'add_to_context'));
    add_filter('upload_mimes', array($this, 'custom_mtypes'));
		add_action('init', array($this, 'register_post_types'));
		add_action('init', array($this, 'register_taxonomies'));
    add_action('init', array($this, 'register_my_menus'));
    add_action('admin_menu', array($this, 'remove_menu_items'));

    // Remove junk from head.
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'rel_canonical');
    remove_action('wp_head', 'feed_links', 2);
    remove_action('wp_head', 'index_rel_link');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'feed_links_extra', 3);
    remove_action('wp_head', 'start_post_rel_link', 10, 0);
    remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);
    remove_action('wp_head', 'parent_post_rel_link', 10, 0);
    remove_action('wp_print_styles', 'print_emoji_styles' );
    remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0);
    remove_action('wp_head', 'print_emoji_detection_script', 7 );

		parent::__construct();
	}

	function register_post_types() {
  	register_post_type(
      'people',
      array(
    		'labels' => array(
      		'name' => _x('People', 'post type general name'),
      		'singular_name' => _x('Person', 'post type singular name'),
      		'add_new' => _x('Add New', 'Person'),
      		'add_new_item' => __('Add New Person'),
      		'edit_item' => __('Edit Person'),
      		'new_item' => __('New Person'),
      		'view_item' => __('View People'),
      		'search_items' => __('Search People'),
      		'not_found' =>  __('Nothing found'),
      		'not_found_in_trash' => __('Nothing found in Bin'),
      		'parent_item_colon' => ''
      	),
        'has_archive' => true,
    		'public' => true,
    		'publicly_queryable' => true,
    		'show_ui' => true,
    		'query_var' => true,
    		'menu_icon' => 'dashicons-admin-users',
    		'rewrite' => true,
    		'capability_type' => 'page',
    		'hierarchical' => false,
    		'rewrite' => array(
    			'slug' => 'people',
    		 	'with_front' => false
    		),
    		'menu_position' => null,
    		'supports' => array('title', 'editor', 'page-attributes')
    	)
    );
	}

	function register_taxonomies() {
    register_taxonomy(
      'person_type', 'people', array(
    		'labels' => array(
      		'name' => _x('Person Type', 'taxonomy general name'),
      		'singular_name' => _x('Person Type', 'taxonomy singular name'),
      		'search_items' => __('Search Person Types'),
      		'all_items' => __('All Person Types'),
      		'edit_item' => __('Edit Person Type'),
      		'update_item' => __('Update Person Type'),
      		'add_new_item' => __('Add New Person Type'),
      		'new_item_name' => __('New Person Type'),
      		'menu_name' => __('Person Type')
      	),
    		'hierarchical' => true,
    		'rewrite' => array('slug' => 'work')
    	)
    );
	}

  function register_my_menus() {
  	register_nav_menus(
  		array(
  			'main-menu' => __('Main Menu'),
        'social-menu' => __('Social Menu')
  		)
  	);
  }

  function custom_mtypes($m){
    $m['svg'] = 'image/svg+xml';
    return $m;
  }

  function remove_menu_items(){
    remove_menu_page('edit-comments.php'); // Hide comment menu item.
  }

	function add_to_context( $context ) {
		$context['menu'] = new TimberMenu();
		$context['site'] = $this;
    $context['main_menu'] = new TimberMenu('main-menu');
    $context['social_menu'] = new TimberMenu('social-menu');
		return $context;
	}
}

new WordPressBoilerplate();
