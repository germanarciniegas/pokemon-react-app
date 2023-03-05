# UPDATES
### Main Feedback to be corrected
> "Probably the tests don't have a good coverage" Totally agree, I corrected that, i am keeping the last tests in a file called `Atomic.test.js` i created a new file that test almost everything probably we are close to the 95% of coverage in this file `App.test.js`, i mocked the Poke API and i did test for almost every part on the App, feel free to run `npm test -- --verbose`, also test now has its own folder `/__tests__`. 😀

> This is a list of all tets: 
Pokemon App Behaviur
- App should display everything correctly before interaction
    -  √ should display pokemon logo (461 ms)
    -  √ should display search input id/name poke (63 ms)
    -  √ should display selector abilities (58 ms)
    -  √ should display total number of pokes (219 ms)
    -  √ should display page size selector (59 ms)
    -  √ should display page change selector (51 ms)
    -  √ should display container list pokes (55 ms)
    -  √ should display Loading  when no loading (58 ms)
    -  √ should display previus button paggination  (94 ms)
    -  √ should display container next button paggination  (88 ms)
    -  √ should display labels paggination below  (79 ms)
    App should show all Pokes fisrt view
    -  √ should all pokes in the first view/sized (80 ms)
    -  √ should show the correct size of pokes by page (83 ms)
    -  √ should show the fisrt page number (77 ms)
    - √ should show the correct total number of pokes (80 ms)
    -  √ should show image by pokemon (73 ms)
    -  √ should show id by pokemon (76 ms)
    -  √ should show name by pokemon (70 ms)
    -  √ should show a button to click for detailing (74 ms)
- Paggination
    -  √ should show Page 1 of  (76 ms)
    -  √ should show correct number of pages   (76 ms)
    -  √ when click next should go to next page   (149 ms)
    -  √ when click previus should go to previus page   (210 ms)
    -  √ when select size page pokes need to change according that (128 ms)
    -  √ previus button should be disable in fisrt page (82 ms)
    -  √ When select last page should go to loading and not show error (134 ms)
    should Filter changing input text
    -  √ when search change filter by id (672 ms)
    -  √ when search change filter by name (481 ms)
    -  √ when search change filter and this fit some pokes (82 ms)
- when error api
    -  √ When API hit an error (37 ms)
- should show detailed pokemon when click
    -  √ when select a pokemon should see the detail (94 ms)
    -  √ when select a pokemon should display Height, Weight, Experience and Type (96 ms)
    -  √ when select a pokemon should display the correct pokemon (86 ms)

> "Better to put outside the styles" Totally agree, i created a new folder for styled componets, and now the App.js file looks pretty clean, go to `/components/styledComponents` to check, also `PokeSmallCard` component was created as you asked.😀

> "We can improve the git history" Nothing to discuss here, i did not image to use a repository in this project and made a deployment, it was my bad sorry, for the future i am going to take that advice. 😀

> Probably many things that we can improve here feel free to ping me and i will try to make this better.🤓
## Reference
Please go to the references folder to see all the images that shows the App.
## Deployed Version

https://pokemon-react-app-theta.vercel.app/

# Getting Started with Pokemon Test Frontend App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 
This is a project for handeling a Pokemon api.
In this project you will be able to:
● As a user You will be able to list all the pokemons available in the store, in fact the first view show the fisrt 20 Pokemos.
● As a user You will be able to filter the pokemons by id and by name, in the Input element you will be able to filter by id or
 by name or by part of them.
● As a user You will be able to choose the size of the pokemon page that I am viewing
(pokemon pagination), yeap in fact you are able to chosse 10, 20, 50, and 100 pokemos per pages, also you can jump to the next page 
or the previus page, with the next and previus buttons also there is a selector that allows you to change between pages.
● As a user You will be able to apply a filter by pokemon abilities. This filter can have
multiple values. Yeap also you can filter by abilities you can select multiple or just one ability to filter the pokemos in the page.
● As a user, once You click on a pokemon in the pokemon list You will be able to view the
selected pokemon. You are going to see most of the importand detailed data of the pokemon as Id, name, Height, Weight, Experience, 
Type, Abilities.

## Important Notes

When errors on API, you are going to see the error in the screen.
If the filters do not have filtered information, you are going to see a message that hep you with that.
Mostly all project is based in simple React app, but we used material Ui components to some selectors and inputs. 
An also some styled components library to style our project.
We have a folder called references in the base of this project to show some images that are going to help us undertand 
the interface of the project.

# Getting Started
Please clone the project, go to the pokemon-app folder, and install the packages `npm intall`, remember we use npm instead of yarn in this project. After that run`npm start`, and enjoy.
## Available Scripts

In the project directory, you can run:
### `npm intall`

We have some packages that we need.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
