#!/usr/bin/env bash
# Sync homepage images from https://www.midex-eg.org/de into the Midex theme.
set -euo pipefail

BASE_URL="https://www.midex-eg.org"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IMG="$ROOT/wp-content/themes/midex/assets/images"

mkdir -p "$IMG"/{hero,events,services,products,partners,exclusive,clients,news,blog}

download() {
	local remote="$1"
	local dest="$2"
	local url="${BASE_URL}/photos/${remote}"
	echo "→ ${dest##*/}"
	curl -fsSL "$url" -o "$dest"
	if file -b "$dest" | grep -qiE 'HTML|text'; then
		echo "ERROR: ${remote} returned HTML, not an image" >&2
		rm -f "$dest"
		return 1
	fi
}

# Hero slider
download "1756200635.png" "$IMG/hero/slide-1.png"
download "1756282724.png" "$IMG/hero/slide-2.png"
download "1756287818.png" "$IMG/hero/slide-3.png"

# Events gallery
download "1755506196.jpg" "$IMG/events/event-1755506196.jpg"
download "1755506209.jpg" "$IMG/events/event-1755506209.jpg"
download "1755506225.jpg" "$IMG/events/event-1755506225.jpg"
download "1755506266.JPG" "$IMG/events/event-1755506266.jpg"
download "1755506276.JPG" "$IMG/events/event-1755506276.jpg"
download "1755759833.JPG" "$IMG/events/event-1755759833.jpg"
download "1756814991.jpg" "$IMG/events/event-1756814991.jpg"
download "1756820572.png" "$IMG/events/event-1756820572.png"

# Services (descriptive local names)
download "1756722653.png" "$IMG/services/mechanical-polishing.png"
download "1756197164.png" "$IMG/services/mirror-finish.png"
download "1756197177.png" "$IMG/services/pickling-passivation.png"
download "1756293390.png" "$IMG/services/bore-scoping.png"
download "1756299396.png" "$IMG/services/orbital-welding.png"
download "1756293549.png" "$IMG/services/roughness-test.png"
download "1756197395.png" "$IMG/services/spray-ball.png"
download "1756301359.png" "$IMG/services/passivation-test.png"
download "1756197116.png" "$IMG/services/welding-docs.png"

# New products
download "1724113383.jpg"   "$IMG/products/product-1724113383.jpg"
download "1725277641.webp"  "$IMG/products/product-1725277641.webp"
download "1725277634.jpg"   "$IMG/products/product-1725277634.jpg"
download "1725239313.jpeg"  "$IMG/products/product-1725239313.jpeg"
download "1725239365.jpg"   "$IMG/products/product-1725239365.jpg"
download "1725277406.webp"  "$IMG/products/product-1725277406.webp"
download "1725277497.webp"  "$IMG/products/product-1725277497.webp"
download "1725238681.webp"  "$IMG/products/product-1725238681.webp"

# Trademark partners
download "1755761833.png"  "$IMG/partners/partner-1755761833.png"
download "1755701549.png"  "$IMG/partners/partner-1755701549.png"
download "1755771798.png"  "$IMG/partners/partner-1755771798.png"
download "1756043795.png"  "$IMG/partners/partner-1756043795.png"
download "1756043967.png"  "$IMG/partners/partner-1756043967.png"
download "1756044128.jpeg" "$IMG/partners/partner-1756044128.jpeg"

# Exclusive trademark
download "1755700607.png" "$IMG/exclusive/sing-tao.png"
download "1755704733.png" "$IMG/exclusive/truvia.png"
download "1756044830.png" "$IMG/exclusive/eternal-water.png"

# Latest news
download "1725286541.webp" "$IMG/news/news-1725286541.webp"
download "1725287028.webp" "$IMG/news/news-1725287028.webp"
download "1725287019.webp" "$IMG/news/news-1725287019.webp"
download "1755767513.png"  "$IMG/news/news-1755767513.png"
download "1755770920.jpeg" "$IMG/news/news-1755770920.jpeg"
download "1756042052.png"  "$IMG/news/news-1756042052.png"
download "1756120693.png"  "$IMG/news/news-1756120693.png"
download "1756207804.png"  "$IMG/news/news-1756207804.png"
download "1756371761.png"  "$IMG/news/news-1756371761.png"
download "1756383611.png"  "$IMG/news/news-1756383611.png"
download "1756730723.png"  "$IMG/news/news-1756730723.png"
download "1776871937.png"  "$IMG/news/news-1776871937.png"

# Blog thumbnails
download "1725325779.jpg"  "$IMG/blog/blog-1725325779.jpg"
download "1755440720.jpeg" "$IMG/blog/blog-1755440720.jpeg"
download "1755680105.jpeg" "$IMG/blog/blog-1755680105.jpeg"
download "1756048296.jpeg" "$IMG/blog/blog-1756048296.jpeg"
download "1756302842.jpeg" "$IMG/blog/blog-1756302842.jpeg"
download "1756631510.jpeg" "$IMG/blog/blog-1756631510.jpeg"
download "1776352479.jpg"  "$IMG/blog/blog-1776352479.jpg"
download "1776958775.png"  "$IMG/blog/blog-1776958775.png"

# Client logos
CLIENTS=(
	1755511118.png 1756049725.png 1755511147.png 1755511156.png 1755511167.png
	1755511180.png 1756119223.png 1755511200.png 1756118643.png 1756049392.png
	1755511232.png 1755511246.png 1756118448.png 1755511268.png 1755511293.png
	1755511306.png 1755511317.png 1756118962.png 1755511351.png 1755511375.png
	1756732187.png 1755511396.png 1756049157.png 1756118072.png 1755511438.png
	1755511452.png 1755511458.png 1755511465.png 1755511472.png 1756732411.png
	1755511497.png 1755511503.png 1755511508.png
)
for id in "${CLIENTS[@]}"; do
	download "$id" "$IMG/clients/client-${id}"
done

# Remove stale misnamed / broken files from old imports
rm -f \
	"$IMG/events/event-1756197164.jpg" \
	"$IMG/events/event-1756197177.jpg" \
	"$IMG/events/event-1756722653.jpg" \
	"$IMG/events/event-1756820572.jpg" \
	"$IMG/products/product-1756044128.png" \
	"$IMG/exclusive/sing-tao.webp" \
	"$IMG/exclusive/truvia.jpg" \
	"$IMG/exclusive/eternal-water.jpg" \
	"$IMG/partners/partner-valex.png" \
	"$IMG/partners/partner-sentec.png" \
	"$IMG/partners/partner-1755767513.png" \
	"$IMG/partners/partner-1755770920.jpeg" \
	"$IMG/partners/partner-1756042052.png" \
	"$IMG/partners/partner-1756120693.png" \
	"$IMG/partners/partner-1756207804.png" \
	"$IMG/partners/partner-1756371761.png" \
	2>/dev/null || true

# Old product files that were trademark logos
rm -f "$IMG/products"/product-17557*.png "$IMG/products"/product-175604*.png "$IMG/products"/product-175570*.png "$IMG/products/product-ro-station.jpg" "$IMG/products/product-1756044128.jpeg" 2>/dev/null || true

echo "Done — $(find "$IMG" -type f \( -name '*.jpg' -o -name '*.jpeg' -o -name '*.png' -o -name '*.webp' \) | wc -l | tr -d ' ') images synced."
