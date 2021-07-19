# Not-The-Guardian Website

## Project summary

A responsive news service website built from scratch with mobile-first approach, using HTML, CSS and create-react-app, in the style inspired by The Guardian Website.

The website accesses and dinamically renders data from [mw-news-api](https://github.com/maria-walker/mw-news-api) - an API data server built with Express.js. Hosted version - [mw-news.herokuapp.com/api/](https://mw-news.herokuapp.com/api/)

## Hosted verion URL

[not-the-guardian.netlify.app](https://not-the-guardian.netlify.app/)

## App features

- Home page (News page)

  - displays available topics dynamically rendered from API, as links to relevant topic pages.
  - displays a list of all articles available on the API, sorted by the latest one. For each article, the topic, article title, publication date and author are taken from the API, while the image is chosen based on the article topic. For the first article on the list, the blurb is also displayed (the first sentence from the article body).
  - a basic login functionality - a user is selected from a drop-down list and once 'login' button is clicked, the user value is passed to all components with useContext - important for comments functionality on the individual article page.

- Topic pages

  - display all articles available for a particular topic, in the same style as the home page.

- Individual article pages

  - display the topic, article title, the blurb (the first sentence from the article body), publication date, author and article body, taken from the API. The image is chosen based on the article topic.
  - Expandable Comments section diplays comments sorted by date (latest first). User must log in to be able to post a comment, otherwise the post button is disabled. Newly posted comment is displayed at the top of the list.
  - Top 10 most popular articles section displays 10 artices with the current highest number of comments.

## Error handling

- error 404 message with link to the homepage for bad URLs;

- error 404 message with link to the homepage for non-existent topic in the URL;

- user warning if empty text area is being submitted as a comment.

## Environment requirements

- Node.js - version v15 and above

## Instructions

1. Clone the repository [github.com/maria-walker/fe-mw-news](https://github.com/maria-walker/fe-mw-news):
   `git clone <https://github.com/maria-walker/fe-mw-news.git>`

2. Navigate to the project directory:
   `cd fe-mw-news`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
