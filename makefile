#
# Variables
# -------------------------------------------------------------------------
FLAGS = --growl --colors
DEFAULT_OPT = --template=home --browser=chrome --server=local


#
# Available Test Modules
# -------------------------------------------------------------------------
global-nav:
	mocha ./global-nav/global-nav-test.js $(OPT) $(DEFAULT_OPT) $(FLAGS)
subscribe-form:
	mocha ./subscribe-form/subscribe-form-test.js $(OPT) $(DEFAULT_OPT) $(FLAGS)
large-carousel:
	mocha ./large-carousel/large-carousel-test.js $(OPT) $(DEFAULT_OPT) $(FLAGS)
featured-grid:
	mocha ./featured-grid/featured-grid-test.js $(OPT) $(DEFAULT_OPT) $(FLAGS)
content-feed:
	mocha ./content-feed/content-feed-test.js $(OPT) $(DEFAULT_OPT) $(FLAGS)
social-carousel:
	mocha ./social-carousel/social-carousel-test.js $(OPT) $(DEFAULT_OPT) $(FLAGS)
web-ads:
	mocha ./web-ads/web-ads-test.js $(OPT) $(DEFAULT_OPT) $(FLAGS)
trending-tags:
	mocha ./trending-tags/trending-tags-test.js $(OPT) $(DEFAULT_OPT) $(FLAGS)
main-content:
	mocha ./main-content/main-content-test.js $(OPT) $(DEFAULT_OPT) $(FLAGS)
sub-content:
	mocha ./sub-content/sub-content-test.js $(OPT) $(DEFAULT_OPT) $(FLAGS)
subcat-header:
	mocha ./subcat-header/subcat-header-test.js $(OPT) $(DEFAULT_OPT) $(FLAGS)
content-good:
	mocha ./content-good/content-good-test.js $(OPT) $(DEFAULT_OPT) $(FLAGS)
global-foot:
	mocha ./global-foot/global-foot-test.js $(OPT) $(DEFAULT_OPT) $(FLAGS)


#
# Available Test Template
# -------------------------------------------------------------------------
HOME_TESTS = global-nav subscribe-form large-carousel featured-grid \
	content-feed social-carousel web-ads trending-tags global-foot
home:
	for target in $(HOME_TESTS); do \
		make $$target; \
	done

MAIN_CATEGORY_TESTS = global-nav subscribe-form large-carousel featured-grid \
	content-feed social-carousel web-ads trending-tags subcat-header global-foot
main-category:
	for target in $(MAIN_CATEGORY_TESTS); do \
		make $$target; \
	done

SUB_CATEGORY_TESTS = global-nav subscribe-form content-feed web-ads trending-tags \
	global-foot
sub-category:
	for target in $(SUB_CATEGORY_TESTS); do \
		make $$target; \
	done

GOODS_TESTS = global-nav subscribe-form content-good web-ads trending-tags \
	global-foot
goods:
	for target in $(GOODS_TESTS); do \
		make $$target; \
	done

FEATURED_TESTS = global-nav subscribe-form trending-tags main-content sub-content \
	web-ads global-foot
featured:
	for target in $(FEATURED_TESTS); do \
		make $$target; \
	done


#
# PHONY
# -------------------------------------------------------------------------
.PHONY: global-nav subscribe-form large-carousel featured-grid content-feed \
	social-carousel web-ads trending-tags main-content sub-content \
	subcat-header content-good global-foot


