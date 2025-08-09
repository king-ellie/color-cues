# Color Cues

Color Cues is a frontend-only web application built with React, TypeScript, and Vite. It allows users to configure and display a rotating background of colors with customizable settings.

## Features

- **Color Configuration**:

  - Select 2–8 colors for the rotation.
  - Use a color picker to choose colors dynamically.
  - Preview the selected color as the background while configuring.
  - Option to randomize the order of colors or use the selected order.

- **Animation Settings**:

  - Set the time interval (in minutes) between color transitions.
  - Choose between gradual fade or instant switch transitions.

- **Animation View**:

  - Full-screen background animation with the selected colors.
  - Pause/Resume functionality.
  - Return to the configuration form at any time.

- **Persistence**:
  - Settings are saved in `localStorage` and restored on reload.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type safety and better developer experience.
- **Vite**: For fast development and build tooling.
- **react-colorful**: For the color picker component.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd color-wheel
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the app in your browser:
   - Navigate to [http://localhost:5173](http://localhost:5173).

## License

This project is licensed under the MIT License.
