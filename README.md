# ØVB Website

WordPress powered site for ØVB.

## Dependencies
* [Composer](https://getcomposer.org/download/).
* [Yarn](https://yarnpkg.com/en/docs/install/).

### Usage
* From the project root, run `composer install` to get WordPress and required plugins. Plugins are placed in `mu-plugins` so do not need to be installed and will not appear in the plugin list.
* From the 'ovb' theme folder, run `yarn install` to get required node modules.
* Run `gulp` or `yarn build` to build theme, `gulp watch` or `yarn watch` to watch for changes and start live reload.

Because this uses Composer, `wp-config.php` is different to that supplied with WordPress - a sample can be found in [wordpress-boilerplate](https://github.com/alanshortis/wordpress-boilerplate).
