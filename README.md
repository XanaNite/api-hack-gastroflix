Partners: Amber Meritt Campbell & James Scherer

Scope:
App Name: Gastroflix

Description: Users will be able to search in a location to get a list of “Now Playing” movies and nearby restaurants for the perfect outing.

APIs:
MX REFERENCE DATA API: https://apidocs.moviexchange.com/docs/apis
	Get Cinema Chains (to get movie chains)
	Get Sites for Cinema Chain (to get address)
	Get Films for a Cinema Chain (to get movies showing)
	Get Showtimes for a Site (to get showtimes)
Yelp Fusion API (to get restaurants): https://www.yelp.com/developers/documentation/v3/category

User stories:
Role					Task											Importance
As a user				I want to view movies by location				High
As a user				I want to view restaurants by location			High
As a user				I want to view movie showtimes					High
As a user				I want to view movie theaters					High
As a user				I want to view movie theater addresses			High
As a new user			I want to sign up for an account				Medium
As a returning  user	I want to save movies I am interested in		Medium
As a returning  user	I want to purchase tickets						Low
As a returning  user	I want to share purchased movies				Low
As a returning  user	I want to view past purchases					Low
As an administrator		I want to view all user accounts				Medium
As an administrator		I want to unlock accounts						Low
As an administrator		I want to usage reports automatically generated	Low

Screen Inventory:
Search form
List of “Now Playing” movies based on entered location including:
	Theaters
	Showtimes
	Theater address
List of restaurants based on entered location including:
	Ratings and reviews
Refresh list when new location is entered

User Flow:
Search form
__________
User enters a valid location ------------- provides a list of Now Playing movies including theater, showtimes, and location plus a list of nearby restaurants including location.
~~~~~~~~~~~~~~~~~~~~~
User enters a non-valid location ------------- provides an error
~~~~~~~~~~~~~~~~~~~~~
User enters a valid location but issue with api request ------------- provides error

Movie list
__________
User selects theater link  ------------- takes to site to purchase tickets, also minimizes restaurant list to 5 miles radius from theater
~~~~~~~~~~~~~~~~~~~~~
User selects movie  ------------- shows a trailer of the movie

Restaurant list
__________
User selects movie link ------------- takes to site to view menu
