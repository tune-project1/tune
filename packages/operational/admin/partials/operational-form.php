<?php
/**
 * Admin form template for Tune plugin
 *
 * @package    Tune
 * @subpackage Tune/admin/partials
 */

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die;
}
?>

<div class="wrap">

    <h1><?php echo esc_html(get_admin_page_title()); ?></h1>

    <div class="notice notice-info">
        <p><strong>This plugin requires an Tune API key.</strong></p>
        <p>Get yours from <a href="https://tune" target="_blank">Tune</a>.</p>
        <p>Once you have the key, enter it below and set <strong>'Log User Activity'</strong> to <code>Yes</code>.</p>
    </div>
    
    <form method="post" action="options.php">
        <?php 
            // Add nonce field
            wp_nonce_field('tune_settings_nonce', 'tune_nonce');
            
            settings_fields('tune_options');
            do_settings_sections('tune_options');
        ?>
        
        
        <?php submit_button('Save Settings'); ?>
    </form>

    <h2>
      How to use inside your theme?
    </h2>

    <p>
      Import the Tune\ops function inside your theme and track events specific to your usecase.
    </p>
    <p>
      Read Tune's <a href="https://tune/api" target="_blank">API Docs</a> for more info.
    </p>


    <pre><code>// Run this inside your functions.php
use function Tune\ops;

$response = ops([
    'name' => 'test_event',
    'avatar' => '😃',
    'notify' => true // Optional, sends a push notification
]);</code></pre>

</div>