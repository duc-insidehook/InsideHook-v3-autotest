#
# Variables
# -------------------------------------------------------------------------
FLAGS = --growl --colors
OPT = --template=home --browser=chrome --server=local


#
# Available Test Modules
# -------------------------------------------------------------------------
global-nav:
	mocha ./global-nav/global-nav-test.js $(OPT) $(FLAGS)
subscribe:
	mocha ./subscribe-form/subscribe-form-test.js $(OPT) $(FLAGS)
large-carousel:
	mocha ./large-carousel/large-carousel-test.js $(OPT) $(FLAGS)
featured-grid:
	mocha ./featured-grid/featured-grid-test.js $(OPT) $(FLAGS)
content-feed:
	mocha ./content-feed/content-feed-test.js $(OPT) $(FLAGS)
social-carousel:
	mocha ./social-carousel/social-carousel-test.js $(OPT) $(FLAGS)
web-ads:
	mocha ./web-ads/web-ads-test.js $(OPT) $(FLAGS)
trending-tags:
	mocha ./trending-tags/trending-tags-test.js $(OPT) $(FLAGS)
main-content:
	mocha ./main-content/main-content-test.js $(OPT) $(FLAGS)
sub-content:
	mocha ./sub-content/sub-content-test.js $(OPT) $(FLAGS)
subcat-header:
	mocha ./subcat-header/subcat-header-test.js $(OPT) $(FLAGS)


#
# Available Test Template
# -------------------------------------------------------------------------
HOME_TESTS = global-nav subscribe large-carousel featured-grid \
	content-feed social-carousel web-ads trending-tags
home:
	for target in $(HOME_TESTS); do \
		make $$target; \
	done

MAIN_CATEGORY_TESTS = global-nav subscribe large-carousel featured-grid \
	content-feed social-carousel web-ads trending-tags subcat-header
main-category:
	for target in $(MAIN_CATEGORY_TESTS); do \
		make $$target; \
	done

SUB_CATEGORY_TESTS = global-nav subscribe content-feed web-ads trending-tags
sub-category:
	for target in $(SUB_CATEGORY_TESTS); do \
		make $$target; \
	done

FEATURED_TESTS = global-nav subscribe trending-tags main-content sub-content \
	web-ads 
featured:
	for target in $(FEATURED_TESTS); do \
		make $$target; \
	done


#
# PHONY
# -------------------------------------------------------------------------
.PHONY: global-nav subscribe large-carousel featured-grid content-feed \
	social-carousel web-ads trending-tags main-content sub-content \
	subcat-header


