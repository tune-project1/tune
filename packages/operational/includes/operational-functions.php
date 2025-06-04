<?php
/**
 * Global functions for Tune plugin
 *
 * @package    Tune
 * @subpackage Tune/includes
 */

namespace Tune;

// Add a test function to verify namespace
if (!function_exists('Tune\test')) {
    function test() {
        return "Tune namespace is working!";
    }
}

if (!function_exists('Tune\ops')) {
    /**
     * Main tune function that can be called from anywhere
     *
     * @param string $key Optional parameter to get specific setting
     * @return mixed Returns setting value or all settings
     */
    function ops($data = null) {
        // Add debugging
        
        // Get the API key from WordPress options
        $token = get_option('tune_api_key', '');

        $baseurl = get_option('tune_baseurl', 'https://api.tune');

        if(!$baseurl) {
            $baseurl = 'https://api.tune';
        }

        $url = $baseurl . "/api/v1/ingest";
        
        if (empty($token)) {
            return "Error: API key not set";
        }

        $url = $baseurl . "/api/v1/ingest";
        
        $args = array(
            'body' => json_encode(array_merge(['notify' => true], $data)),
            'headers' => array(
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json'
            ),
            'method' => 'POST',
        );

        
        
        $response = wp_remote_post($url, $args);
        
        if (is_wp_error($response)) {
            $error_message = "Error sending event: " . $response->get_error_message();
        } else {
            $response_body = wp_remote_retrieve_body($response);
        }
        
        if (isset($error_message)) {
            return $error_message;
        } else {
            return $response_body;
        }
    }
} 