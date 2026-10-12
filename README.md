# React Database Designer

A visual database designer built with React.
Create databases and tables, define fields, connect fields with drag and drop to build relations, and export the SQL code of the whole schema.

**Live demo:** <https://database-designer.davidebalice.dev/>

![Screenshot](https://www.aroundweb.it/screenshot/database-designer.jpg)

Backend repository: <https://github.com/davidebalice/node-database-designer-api>

## Features

- Login and registration (password recovery with Google reCAPTCHA)
- Databases: list, add, edit, delete
- Visual designer canvas with draggable tables
- Table editor: field name, type (`int`, `tinyint`, `bigint`, `float`, `boolean`, `double`, `varchar`, `text`, `datetime`, `date`), length, default value, primary key, auto increment, nullable and index
- Relations between fields created with drag and drop, drawn as lines that follow the tables when they move
- Manage and delete relations
- SQL export: `CREATE TABLE`, indexes and foreign keys, with an optional table prefix and copy to clipboard
- Desktop only (a message is shown on mobile devices)

The connection lines and their positioning are custom-made (no diagram library): drag and drop is handled with React DnD and the lines are drawn with SVG.

## Tech stack

- [React 18](https://react.dev/)
- [Create React App](https://create-react-app.dev/) (`react-scripts`)
- [React DnD](https://react-dnd.github.io/react-dnd/) with the HTML5 backend
- [React Router 6](https://reactrouter.com/)
- [React Bootstrap](https://react-bootstrap.github.io/) / [Bootstrap 5](https://getbootstrap.com/)
- [Axios](https://axios-http.com/)
- [SweetAlert2](https://sweetalert2.github.io/), [React Tooltip](https://react-tooltip.com/), [React Icons](https://react-icons.github.io/react-icons/), Font Awesome

## Getting started

### Requirements

- Node.js 18 or later
- npm
- A running instance of [node-database-designer-api](https://github.com/davidebalice/node-database-designer-api)

### Installation

```bash
git clone https://github.com/davidebalice/react-database-designer.git
cd react-database-designer
npm install
```

### Configuration

Settings are read from `.env` (development) and `.env.production` (production build):

| Variable                 | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `REACT_APP_API_BASE_URL` | Base URL of the API, with trailing `/api/`               |
| `REACT_APP_SITE_KEY`     | Google reCAPTCHA site key                                |

### Available scripts

| Command         | Description                                   |
| --------------- | --------------------------------------------- |
| `npm start`     | Start the development server on port 3000     |
| `npm run build` | Create a production build in `build/`         |
| `npm test`      | Run the test runner                           |

## Project structure

```
src/
├── pages/
│   ├── designer/   # Canvas, tables, fields, relation lines and modals
│   ├── sql/        # SQL export
│   ├── databases/  # Database list and forms
│   └── Auth/       # Login, register, forgot password
├── components/     # Shared UI components
├── layouts/        # Layout and footer
├── context/        # Logged-in user context
└── route/          # Application routes
```

## Author

**Davide Balice** – [davidebalice.dev](https://www.davidebalice.dev)
