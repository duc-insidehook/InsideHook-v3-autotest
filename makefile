FLAGS = --growl --colors
OPT = --template=home --browser=chrome


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
home-ads:
	mocha ./home-ads/home-ads-test.js $(OPT) $(FLAGS)
trending-tags:
	mocha ./trending-tags/trending-tags-test.js $(OPT) $(FLAGS)
main-content:
	mocha ./main-content/main-content-test.js $(OPT) $(FLAGS)
sub-content:
	mocha ./sub-content/sub-content-test.js $(OPT) $(FLAGS)
subcat-header:
	mocha ./subcat-header/subcat-header-test.js $(OPT) $(FLAGS)



HOME_TESTS = global-nav subcat-header subscribe large-carousel featured-grid \
	content-feed social-carousel home-ads trending-tags
home:
	for target in $(HOME_TESTS); do \
		$(MAKE) $$target; \
	done

MAIN_CATEGORY_TESTS = global-nav subscribe large-carousel featured-grid \
	content-feed social-carousel home-ads trending-tags
main-category:
	for target in $(MAIN_CATEGORY_TESTS); do \
		$(MAKE) $$target; \
	done

SUB_CATEGORY_TESTS = global-nav subscribe content-feed home-ads trending-tags
sub-category:
	for target in $(SUB_CATEGORY_TESTS); do \
		$(MAKE) $$target; \
	done

FEATURED_TESTS = global-nav subscribe trending-tags main-content sub-content \
	home-ads 
featured:
	for target in $(FEATURED_TESTS); do \
		$(MAKE) $$target; \
	done

.PHONY: global-nav subscribe large-carousel featured-grid content-feed \
	social-carousel home-ads trending-tags main-content sub-content \
	subcat-header


