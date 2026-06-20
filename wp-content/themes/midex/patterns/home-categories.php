<?php
/**
 * Title: Home Product Categories
 * Slug: midex/home-categories
 * Categories: midex
 * Inserter: false
 */
return array(
	'slug'       => 'midex/home-categories',
	'title'      => __( 'Home Product Categories', 'midex' ),
	'categories' => array( 'midex' ),
	'content'    => '<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:heading -->
<h2 class="wp-block-heading">Products</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Industrial-grade components with hygienic design. Every listing includes a direct path to request a quote.</p>
<!-- /wp:paragraph -->

<!-- wp:midex/product-categories /-->

<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/products/">Shop all products</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group -->',
);
