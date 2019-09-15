Partners: Amber Meritt Campbell & James Scherer

Live URL: https://xananite.github.io/api-hack-gastroflix/

# Gastroflix

Users will be able to search in a location to get a list of “Now Playing” movies and nearby restaurants for the perfect outing.

## Screenshots
### Ipad
Cinema results on an iPad:
<img src="./img/README_img/iPad_theater_results.png"
     alt="iPad cinema results"
     style="float: left; margin-right: 10px;" />
Movie results on an iPad:
<img src="./img/README_img/iPad_movie_results.png"
     alt="iPad movie results"
     style="float: left; margin-right: 10px;" />
Restaurant results on an iPad:
<img src="./img/README_img/iPad_restaurant_results.png"
     alt="iPad restaurant results"
     style="float: left; margin-right: 10px;" />

### 1200px+ Screen
Movie and Restaurant results on a screen 1200px or higher:
<img src="./img/README_img/pc_movie_restaurant_results.png"
     alt="1200 pixels plus screen movie and restaurant results"
     style="float: left; margin-right: 10px;" />

## APIs
Zip code Lat/Long API: https://public.opendatasoft.com/explore/dataset/us-zip-code-latitude-and-longitude/api/  <br />
MovieGlu  API: https://developer.movieglu.com/v2/api-index/quick-start-guide/  <br />
Zomato API (to get restaurants): https://developers.zomato.com/documentation#!/restaurant/search  <br />

## User stories

| Role	| Task | Importance|
|-------|------|-----------|
| As a user | *I want to view movies by location* | High |
| As a user	| *I want to view restaurants by location* | High |
| As a user	| *I want to view movie showtimes* | High |
| As a user	| *I want to view movie theaters* | High |
| As a user	| *I want to view movie theater addresses* | High |
| As a new user	| *I want to sign up for an account* | Medium |
| As a returning  user | *I want to save movies I am interested in* | Medium |
| As a returning  user | *I want to purchase tickets* | Low |
| As a returning  user | *I want to share purchased movies* | Low |
| As a returning  user | *I want to view past purchases* | Low |
| As an administrator |	*I want to view all user accounts* | Medium |
| As an administrator |	*I want to unlock accounts* | Low |
| As an administrator |	*I want to usage reports automatically generated* | Low |

## Screen Inventory
Search form  <br />
List of “Now Playing” movies based on entered location including:  <br />
	* Theaters  
	* Showtimes  
	* Theater address  
List of restaurants based on entered location including:  <br />
	* Ratings and reviews
Refresh list when new location is entered  <br />

## User Flow
| Search form |
|-------------|
| User enters a valid location ------------- provides a list of Now Playing movies including theater, showtimes, and location plus a list of nearby restaurants including location |
| User enters a non-valid location ------------- provides an error |
| User enters a valid location but issue with api request ------------- provides error |

| Movie list |
|------------|
| User selects theater link  ------------- takes to site to purchase tickets, also minimizes restaurant list to 5 miles radius from theater |
| User selects movie  ------------- shows a trailer of the movie |

| Restaurant list |
|-----------------|
| User selects movie link ------------- takes to site to view menu |

## Users feedback
### Kayla
	* NICE!! The app worked as intended for me!
	* Super small, doesn’t need to change, but the CTA for ‘Movies and Restaurants’ don’t show me movies but theaters! If you feel up for it, something along the lines of Theater and nearby restaurants would drive it home. (*this is because cors error)
	* Also, I saw an error when I entered my zipcode and chose a theater + restaurants button.
### Crystal
	* Do you think the app is interesting or valuable?
		* Yeah, I like the idea of finding a movie and a place to eat all in one app. Perfect date night app
	* Did you use the app as intended?
		* Yep, put in a zipcode and got back a list of theaters, selected movie and restaurants and got back a list of restaurants
	* Did you encounter any bugs or broken features?
		* looks like a cores error appears when fetching the movies.
	* Did you understand how to use the app?
		* Could use some description on the homepage about what this app does, I wasn’t sure what was going to happen after I put in a zipcode.
### TJ
	* Cinema Results is not bad, but I would maybe squash that image, it takes up about 25-30% of the screen, and on smaller screens, could be 50%. I think a headline with maybe an icon of a cinema reel would suffice. The text is very hard to read on top of that image and that's going to hurt a11y.
	* List of theatres are fine, but they are missing the state. I know that doesn't matter too much since I should know the state I live in when i use a Zip Code, but I think it should be there regardless
	* I like the side by side for Movies & Restuarants, but same issue with the image and text.
	* Also, I'm hoping that down the line, I would be able to click on a showtime to go book that time
	* Menu on restaurants does not open in a new tab, and instead takes you away from your app.

## Changes made based on user feedback
	* need to add catch for error with movies
		* displaying movies results in cors depending on time accessed
	* description about about on homepage
	* Header
		* make image smaller
		* headline with icon
		* text hard to read
	* Theaters
		* add states (API doesn't provide the state)
	* menu to open in new tab