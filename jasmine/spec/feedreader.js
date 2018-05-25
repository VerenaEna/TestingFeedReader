
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {
	/* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
	describe('RSS Feeds', () => {
		/* This is our first test - it tests to make sure that the
   * allFeeds variable has been defined and that it is not
   * empty. Experiment with this before you get started on
   * the rest of this project. What happens when you change
   * allFeeds in app.js to be an empty array and refresh the
   * page?
   */
		it('feeds are defined', () => {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		/* @description: loop through each feed in the allFeeds object
		 * and ensures it has a URL defined
     * and that the URL is not empty.
     */
		it('urls are defined', () => {
			for(var i = 0; i < allFeeds.length; i++){
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url).not.toBe(0);
			}
		});


		/* @description: loop through each feed in the allFeeds object +
		 * and ensures it has a name defined
     * and that the name is not empty.
     */

		it('name are defined', () => {
			for(var i = 0; i < allFeeds.length; i++){
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name).not.toBe(0);
			}
		});
	});


	/* @description: new test suite named "The menu" */
	describe('The menu', () => {

	/* @description: the menu element is hidden by default. */
		it('hidden by default', () => {
			expect($('body').hasClass('menu-hidden')).toEqual(true);
		});

		/* @description: the menu changes visibility when the menu icon is clicked.
		 * does the menu display when clicked and
		 * does it hide when clicked again.
    */
		it('toggle menu', () => {
			// listens for click in the menuIcon
			$('.menu-icon-link').trigger('click');
			expect($('body').hasClass('menu-hidden')).toBe(false);
			$('.menu-icon-link').trigger('click');
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});

	/* @description: test suite named "Initial Entries" */
	describe('Initial Entries', () => {

		beforeEach(done => {
			loadFeed(0,() => {
				done();
			});
		});

		/* @description: when the loadFeed function is called and completes its work,
		 * there is at least a single .entry element within the .feed container.
		 */

		it('at least a single entry in container', () => {
			expect($('.entry').length).toBeGreaterThan(0);
		});
	});
	/* TODO: Write a new test suite named "New Feed Selection" */
	describe('New Feed Selection', () => {

	/* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
		let firstFeed; secondFeed;

		beforeEach(done => {
			loadFeed(0, () => {
				firstFeed = $('.feed').html();
				done();
			});
		});

		it('content changed after new feed loaded', done => {
			loadFeed(1, () => {
				secondFeed = $('.feed').html();
				expect(secondFeed).not.toBe(firstFeed);
				done();
			});
		});
	});
}());
