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
			console.log('feeds are defined');
		});
		it('and are not empty', () => {
			expect(allFeeds.length).not.toBe(0);
			console.log('feeds are not empty');
		});

		// Checks the allFeeds variable has urls and they are not empty.
		it('urls are defined', () => {
			for(var i = 0; i < allFeeds.length; i++){
				expect(allFeeds[i].url).toBeDefined();
				console.log('urls are defined');
			}
		});
		it('and are not empty', () => {
			for(var i = 0; i < allFeeds.length; i++){
				expect(allFeeds[i].url).not.toBe(0);
				console.log('urls are not empty');
			}
		});

		// Checks the allFeeds variable has names defined and that is not empty.
		it('names are defined', () => {
			for(var i = 0; i < allFeeds.length; i++){
				expect(allFeeds[i].name).toBeDefined();
				console.log('feed names are defined');
			}
		});
		it('and are not empty', () => {
			for(var i = 0; i < allFeeds.length; i++){
				expect(allFeeds[i].name).not.toBe(0);
				console.log('feed names are not empty');
			}
		});
	});


	/*
	 * @description: new test suite named "The menu"
	 */
	describe('The menu', () => {
		let visibility = $('body').hasClass('menu-hidden');
		// the menu element is hidden by default.
		it('is hidden by default', () => {
			console.log('menu is hidden');
			expect(visibility).toBe(true);
		});

		/* @description: the menu changes visibility when the menu icon is clicked.
		 * it does the menu display when clicked and
		 * does it hide when clicked again.
    */
		it('toggle works', () => {
			// listens for click in the menuIcon
			$('.menu-icon-link').trigger('click');
			expect(visibility).toBe(true);
			$('.menu-icon-link').trigger('click');
			expect(visibility).toBe(true);
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
			expect($('.entry').length).toBeGreaterThan(0);
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
