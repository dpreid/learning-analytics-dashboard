# Learning Analytics Dashboard

![Learning Analytics Dashboard](./img/learning_analytics_dashboard_icon.png)

This repo is under active development and is not yet in a release state.

This Learning Analytics Dashboard (LAD) currently works with the [spinner](https://github.com/practable/spinner-amax) and [pendulum](https://github.com/practable/penduino) practable.io remote labs. The UI versions for those labs need to have analytics enabled, so choose the `analytics` directory in `ui/`.

The LAD requires the learning analytics server to be running as well. See details of that setup and code [here](https://github.com/practable/analytics).

The core of the dashboard is the display of a user graph representing the procedure followed by a student during remote lab work.

![LA UI Upper](./img/LA_UI_upper.png)

The dashboard also displays other learning indicators calculated by the learning analytics server.

![LA UI Lower](./img/LA_UI_lower.png)

# Development TODO

## Setup

Basics:
- Clone this repo to your local machine.
- `cd dashboard`
- `npm install`
- `npm run build`
- Use the generated build directory to serve wherever and however you host webpages.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

