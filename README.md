# SWAPI app
Demo at  https://swapi-28e2a.firebaseapp.com

## Approach
The app is build with create-react-app
Styles are managed with scss, mainly because I can import material components web scss.

## Offline
The app uses redux and syncs the redux store with localStorage. This means that the app has to get the data on the first load, but after that can start up with offline data. Combining this with service workers means that the app can load entirely offline and subsequent loads load in 0.1s to 0.2s.

## Getting data
I chose to get all people and planets data. To do this I loop through the pagination of each until they're all received.
This means that I can match the planet names to the people.

### Table
The table columns are filterable by text. This allows you to filter just 'Skywalkers', for example.

### Popup
The popup also links to a planets page

### Data structure
I chose to structure planets data as an indexed object because there are many lookups for planet names and this makes thos lookups much faster.

## Title SVG
The logo is an svg that is imported as a react component. This allows svg manipulation. In this case I just apply a cheesy 'chalk' effect which dissapears and slowly changes colour on mouse over. It's just to demonstrate svg manipulation in react.
