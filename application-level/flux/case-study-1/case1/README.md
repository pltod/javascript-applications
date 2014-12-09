#### How to Run It

* Open static/index.html in your browser.

* Use ```webpack``` command in the root folder to rebuild on changes.


#### Notes

* there is no server version so the code is only inside app/client

* index.jsx is the entry point

* build with webpack


#### Analyses

* Fluxxor offers container called Flux with addons for the original Flux: 'Fluxxor.Flux is the main **container** object for a Flux application. **It provides access to the stores and the actions, and is responsible for managing the dispatcher internally.** 

* Fluxxor offers and two mixins one for the main application component and one for the child component. With their help we can access actions and stores

* Stores must be referenced via container only inside the main component

* Actions could be accessible in the child components as well

* Fluxxor.StoreWatchMixin helps in providing some store related functionality that is common for all components like bind/ubind to events when component mount/unmount etc.

* StoreWatchMixin is attached to main component and used to get/set the app state.

* Provides internal dispatching

* Provides functionality in the form of mixins

* Flow

> 1. Flux by Fluxxor instance created with stores and actions and attached to window

> 2. The store saves the state and bind all system actions (which could be called events) to handlers

> 3. Component has handler to UI event and call the corresponding system action

> 4. This is invisible covered by Fluxxor itslef - the dispatcher takes the action and informs the stores that they can react on it. 

> 5. The stores change the global data and triger event to notify that view can be updated...but only those that care about this change


