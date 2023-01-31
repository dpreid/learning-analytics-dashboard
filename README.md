# Learning analytics dashboard

This is a Vue.js web app for displaying student learning analytics data for remote labs.

## Background logging

The LA dashboard will request data from the analytics client using the logging websocket. These requests use the ```{..., type: "analytics", ...}``` format. We also want to be able to quantify the level of interaction with the LA dashboard, therefore some background logging is also done for post-hoc analysis (i.e. this information is not used in the analytics client).

This logging is performed when:

- on pageshow event which is added as a listener in the App.vue component
- @mouseenter for each of the analytics dashboard components individually
- when data is saved by the student using the Save button in the NavigationBar.vue component
- when any request for data is sent (excluding request_all as pageshow will cover this scenario) in the logging.js data store.
- when feedback is submitted in the logging.js store.