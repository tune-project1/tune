<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://tune
 * @since             1.0.0
 * @package           Tune
 *
 * @wordpress-plugin
 * Plugin Name:       Tune
 * Plugin URI:        https://tune
 * Description:       Simple activity log and event tracker for Wordpress. Powered by Tune
 * Version:           1.1.0
 * Author:            Shash
 * Author URI:        https://tune/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       tune
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'OPERATIONAL_VERSION', '1.1.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-tune-activator.php
 */
function activate_tune() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-tune-activator.php';
	Tune_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-tune-deactivator.php
 */
function deactivate_tune() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-tune-deactivator.php';
	Tune_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_tune' );
register_deactivation_hook( __FILE__, 'deactivate_tune' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-tune.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_tune() {

	$plugin = new Tune();
	$plugin->run();

}
run_tune();
