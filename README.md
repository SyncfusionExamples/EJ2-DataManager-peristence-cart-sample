# Syncfusion EJ2 Grid with Persistent State and Wishlist

## Repository Description

This repository demonstrates how to build an interactive product dashboard using Syncfusion EJ2 components, combining Grid, Chart, and DataManager to persist user-specific state such as sorting, filtering, and wishlist selections.

## Project Overview

This project showcases a client-side web application that integrates multiple Syncfusion EJ2 UI components with a single DataManager instance. The application allows users to view product data in a grid, visualize customer reviews in a pie chart, and manage a personalized wishlist. User-specific state is persisted using the Syncfusion DataManager so that preferences are retained across sessions.

The application is built using plain HTML, CSS, and JavaScript and relies on Syncfusion EJ2 CDN packages for UI components and data handling.

## Key Features

- Product listing using **Syncfusion EJ2 Grid**
- Checkbox-based row selection with persistent selection
- User-specific state persistence using **DataManager**
- Sorting products by price (ascending and descending)
- Category-based filtering using MultiSelect
- Wishlist management per user
- Pie chart visualization of customer reviews
- Dynamic UI updates based on user actions

## Prerequisites

- A modern web browser (Chrome, Edge, Firefox)
- Internet connection (to load Syncfusion CDN resources)

## Running the Application

1. Clone or download the repository.
2. Ensure `index.html`, `sample.js`, `datasource.js`, and `index.css` are in the same directory.
3. Open `index.html` directly in a browser.


## Usage

- Select a user from the dropdown to initialize the dashboard.
- Use the sort buttons to order products by price.
- Filter products by category using the filter dropdown.
- Select products and add them to the wishlist.
- View wishlist items and clear persisted data when required.
- Logout to reset the session.

## State Persistence

The application uses Syncfusion DataManager persistence to store user-specific queries such as wishlist filters. Each user maintains an independent state identified by their username.

## License

This project is intended for demonstration and educational purposes using Syncfusion EJ2 components.

## Reference Documentation and Demos

- [Getting started with Grid](https://ej2.syncfusion.com/javascript/documentation/grid/getting-started)
- [Chart Control](https://ej2.syncfusion.com/javascript/documentation/chart/es5-getting-started)
- [Quering in datamanager](https://ej2.syncfusion.com/javascript/documentation/data/querying)
- [Datamanager API](https://ej2.syncfusion.com/javascript/documentation/api/data/overview/)
- [Datamanager StatePersistence](https://ej2.syncfusion.com/javascript/documentation/data/datamanager-persistence)
