<?php

/**
 * Fired during plugin deactivation
 *
 * @link       https://tune
 * @since      1.0.0
 *
 * @package    Tune
 * @subpackage Tune/includes
 */

/**
 * Fired during plugin deactivation.
 *
 * This class defines all code necessary to run during the plugin's deactivation.
 *
 * @since      1.0.0
 * @package    Tune
 * @subpackage Tune/includes
 * @author     Shash <shash@tune>
 */
class Tune_Deactivator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function deactivate() {
		delete_option('tune_log_activity');
		delete_option('tune_api_key');
	}

}
