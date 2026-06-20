<?php
/**
 * Title: Contact Page
 * Slug: midex/contact-page
 * Categories: midex
 * Inserter: false
 */
return array(
	'slug'       => 'midex/contact-page',
	'title'      => __( 'Contact Page', 'midex' ),
	'categories' => array( 'midex' ),
	'content'    => '<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading">Contact Us</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Request a quote, ask about a product, or discuss a turnkey solution with our engineering team.</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"className":"midex-contact-grid"} -->
<div class="wp-block-columns midex-contact-grid"><!-- wp:column {"className":"midex-contact-card"} -->
<div class="wp-block-column midex-contact-card"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Sales &amp; Quotes</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Email:</strong> <a href="mailto:sales@midex-eg.com">sales@midex-eg.com</a><br><strong>Phone:</strong> 01026228403 / 01006683803</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"className":"midex-contact-card"} -->
<div class="wp-block-column midex-contact-card"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Office</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>29 Al Mehwar Al Markazi, First 6th of October, 6th of October City (2), Giza Governorate 3225614</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:midex/request-quote /--></div>
<!-- /wp:group -->',
);
