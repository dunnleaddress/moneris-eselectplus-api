<?php
require '../lib/Moneris.php';

$errors = array();

if (! empty($_POST)) {
	// use the testing server for the demo:
    // https://developer.moneris.com/Documentation/NA/E-Commerce%20Solutions/API/Card%20Verification?lang=php
	$moneris = Moneris::create(
		array(
			'api_key' => 'yesguy', // Under Admin / Store Settings
			'store_id' => 'store1',
			'environment' => Moneris::ENV_STAGING
		)
	);

	try {

		// try to make the purchase:
		$result = $moneris->purchase($_POST);

		if ($result->was_successful()) {

			// hooray!
			exit("No diggity tokenization!");

		} else {

			exit($result->error_message());

		}

	} catch (Moneris_Exception $e) {
		$errors[] = $e->getMessage();
	}
}

include('../client/tokenization.html');