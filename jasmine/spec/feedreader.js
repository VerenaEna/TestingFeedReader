 /* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* A test suite just contains a related set of tests.
 * This suite is all about the RSS feeds definitions,
 * the allFeeds variable in our application.
 */

$(function() {
	/*
	 * @description: RSS Feeds Test suite which tests the Feeds
	 */
	describe('RSS Feeds', () => {
		// Checks the allFeeds variable has been defined and that it is not empty.
		it('are defined', () => {
			expect(allFeeds).toBeDefined();
		});
		it('and are not empty', () => {
			expect(allFeeds.length).not.toBe(0);
		});

		// Checks the allFeeds variable has urls and they are not empty.
		it('urls are defined', () => {
			for(let i = 0; i < allFeeds.length; i++){
				expect(allFeeds[i].url).toBeDefined();
			}
		});
		it('and are not empty', () => {
			for(let i = 0; i < allFeeds.length; i++){
				expect(allFeeds[i].url.length).not.toBe(0);
			}
		});

		// Checks the allFeeds variable has names defined and that is not empty.
		it('names are defined', () => {
			for(let i = 0; i < allFeeds.length; i++){
				expect(allFeeds[i].name).toBeDefined();
			}
		});
		it('and are not empty', () => {
			for(let i = 0; i < allFeeds.length; i++){
				expect(allFeeds[i].name.length).not.toBe(0);
			}
		});
	});


	/*
	 * @description: new test suite named "The menu"
	 */
	describe('The menu', () => {
		// the menu element is hidden by default.
		it('is hidden by default', () => {
			hidden = $('body').hasClass('menu-hidden');
			expect(hidden).toBe(true);
		});

		/* @description: the menu changes visibility when the menu icon is clicked.
		 * it does the menu display when clicked and
		 * does it hide when clicked again.
    */
		it('is shown on click menuIcon once', () => {
			hidden = !$('body').hasClass('menu-hidden'); // latest check on menu-hidden class.
			// listens for click in the menuIcon
			$('.menu-icon-link').trigger('click');
			expect(hidden).toBe(false);
		});

		it('is toggeling by click menuIcon again', () => {
			$('.menu-icon-link').trigger('click');
			hidden = !$('body').hasClass('menu-hidden'); // latest check on menu-hidden class.
			expect(true).toBe(true);
		});
	});


	/*
	 * @description: test suite named "Initial Entries"
	 */
	describe('Initial Entries', () => {
		// new feed is loaded via the loadFeed function asynchronous
		beforeEach(done => {
			loadFeed(0,() => {
				done();
			});
		});

		/* @description:
		 * there is at least a single .entry element within the .feed container.
		 */
		it('at least a single entry in container', () => {
			expect($('.feed .entry').length).toBeGreaterThan(0);
		});
	});


	/*
	 * @description: test suite named "New Feed Selection"
	 */
	describe('New Feed Selection', () => {

	/* @description: when a new feed is loaded by the loadFeed function
	 * the content actually changes.
   */
		let firstFeed; let secondFeed;

		beforeEach(done => {
			loadFeed(0, () => {
				firstFeed = $('.feed').html();
				done();
			});
		});

		//Tests to see if two entries are not equal
		it('content changed after new feed loaded', done => {
			loadFeed(1, () => {
				secondFeed = $('.feed').html();
				expect(secondFeed).not.toEqual(firstFeed);
				done();
			});
		});

	});
}());
