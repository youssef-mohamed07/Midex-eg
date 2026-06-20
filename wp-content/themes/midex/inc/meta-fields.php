<?php
/**
 * Post meta for products and solutions.
 *
 * @package Midex
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register REST-visible meta fields.
 */
function midex_register_meta_fields() {
	$object_schemas = array(
		'type'       => 'array',
		'items'      => array(
			'type'       => 'object',
			'properties' => array(
				'label' => array( 'type' => 'string' ),
				'value' => array( 'type' => 'string' ),
			),
		),
		'show_in_rest' => array(
			'schema' => array(
				'type'  => 'array',
				'items' => array(
					'type'       => 'object',
					'properties' => array(
						'label' => array( 'type' => 'string' ),
						'value' => array( 'type' => 'string' ),
					),
				),
			),
		),
	);

	register_post_meta(
		'solution',
		'_midex_specs',
		array_merge(
			$object_schemas,
			array(
				'single'            => true,
				'default'           => array(),
				'sanitize_callback' => 'midex_sanitize_key_value_rows',
				'auth_callback'     => 'midex_meta_auth_callback',
			)
		)
	);

	register_post_meta(
		'solution',
		'_midex_featured_in',
		array_merge(
			$object_schemas,
			array(
				'single'            => true,
				'default'           => array(),
				'sanitize_callback' => 'midex_sanitize_key_value_rows',
				'auth_callback'     => 'midex_meta_auth_callback',
			)
		)
	);

	register_post_meta(
		'solution',
		'_midex_faq',
		array(
			'type'              => 'array',
			'single'            => true,
			'default'           => array(),
			'show_in_rest'      => array(
				'schema' => array(
					'type'  => 'array',
					'items' => array(
						'type'       => 'object',
						'properties' => array(
							'question' => array( 'type' => 'string' ),
							'answer'   => array( 'type' => 'string' ),
						),
					),
				),
			),
			'sanitize_callback' => 'midex_sanitize_faq_rows',
			'auth_callback'     => 'midex_meta_auth_callback',
		)
	);

	register_post_meta(
		'solution',
		'_midex_intro',
		array(
			'type'              => 'string',
			'single'            => true,
			'default'           => '',
			'show_in_rest'      => true,
			'sanitize_callback' => 'sanitize_textarea_field',
			'auth_callback'     => 'midex_meta_auth_callback',
		)
	);

	register_post_meta(
		'product',
		'_midex_highlights',
		array_merge(
			$object_schemas,
			array(
				'single'            => true,
				'default'           => array(),
				'sanitize_callback' => 'midex_sanitize_key_value_rows',
				'auth_callback'     => 'midex_meta_auth_callback',
			)
		)
	);
}
add_action( 'init', 'midex_register_meta_fields' );

/**
 * @param mixed  $meta_value Meta value.
 * @param string $meta_key   Meta key.
 * @param string $object_type Object type.
 * @return bool
 */
function midex_meta_auth_callback( $meta_value, $meta_key, $object_type ) {
	return current_user_can( 'edit_posts' );
}

/**
 * @param mixed $value Raw value.
 * @return array<int, array{label:string,value:string}>
 */
function midex_sanitize_key_value_rows( $value ) {
	if ( ! is_array( $value ) ) {
		return array();
	}

	$rows = array();

	foreach ( $value as $row ) {
		if ( ! is_array( $row ) ) {
			continue;
		}

		$label = isset( $row['label'] ) ? sanitize_text_field( $row['label'] ) : '';
		$text  = isset( $row['value'] ) ? sanitize_text_field( $row['value'] ) : '';

		if ( '' === $label && '' === $text ) {
			continue;
		}

		$rows[] = array(
			'label' => $label,
			'value' => $text,
		);
	}

	return $rows;
}

/**
 * @param mixed $value Raw value.
 * @return array<int, array{question:string,answer:string}>
 */
function midex_sanitize_faq_rows( $value ) {
	if ( ! is_array( $value ) ) {
		return array();
	}

	$rows = array();

	foreach ( $value as $row ) {
		if ( ! is_array( $row ) ) {
			continue;
		}

		$question = isset( $row['question'] ) ? sanitize_text_field( $row['question'] ) : '';
		$answer   = isset( $row['answer'] ) ? wp_kses_post( $row['answer'] ) : '';

		if ( '' === $question && '' === $answer ) {
			continue;
		}

		$rows[] = array(
			'question' => $question,
			'answer'   => $answer,
		);
	}

	return $rows;
}

/**
 * @param int    $post_id Post ID.
 * @param string $key     Meta key.
 * @return array<int, array<string, string>>
 */
function midex_get_meta_rows( $post_id, $key ) {
	$value = get_post_meta( $post_id, $key, true );
	return is_array( $value ) ? $value : array();
}

/**
 * Build a contact URL with optional product/solution context.
 *
 * @param int|null $post_id Post ID.
 * @return string
 */
function midex_get_quote_url( $post_id = null ) {
	$url = home_url( '/contact/' );

	if ( ! $post_id ) {
		return $url;
	}

	$post = get_post( $post_id );

	if ( ! $post ) {
		return $url;
	}

	return add_query_arg(
		array(
			'item' => rawurlencode( get_the_title( $post_id ) ),
			'type' => $post->post_type,
		),
		$url
	);
}
