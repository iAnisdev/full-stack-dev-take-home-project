# Anis Take-Home Project Submission

## Objective
Implemented an interactive D3.js heatmap graph to display the number of unique visitors by country and hour of the day, with a selectable date range. the project is developed using SvelteKit, tRPC, TypeScript, and TailwindCSS. A live demo can be found [here](https://bilbyai-anis-full-stack-6puw1xi3z-anis-projects-4a406acf.vercel.app/)

## Project Overview

This project extends the provided starter project by adding an interactive heatmap graph. The heatmap visualizes the number of unique visitors by country and hour, with the functionality to filter data based on a selectable date range.

## Local Project Setup

1. **Clone and Fork the Starter Project**:
   - Fork the repository to your GitHub account.
   - Clone the provided repository to your local development environment.

2.  **Running the Project**:
     - After cloning or forking the project, navigate to the project directory.
     - Install dependencies with `npm install` (or `pnpm install` or `yarn`).
     - Rename `.env.example` to `.env` and add the env information from this [link](https://share.1password.com/s#S2aCrzRYgtW1PfFUXBGYSMqT_af1lFe4r8mujK0eRSw)
     - Start a development server:

       ```bash
       npm run dev

       # or start the server and open the app in a new browser tab
       npm run dev -- --open
       ```

## Features

 - Interactive Heatmap: Created using D3.js and integrated into the SvelteKit framework.
 - Axes: Countries on the Y-axis and hours of the day (1-24) on the X-axis.
 - Cells: Represent the number of unique visitors, with color gradients indicating different visitor counts.
 - Tooltips: Displayed detailed information on hover.
 - Date Range Selector: Dropdown menu to filter data by predefined date ranges (Last week, Last two weeks, Last month, Last quarter, Last year).
 - Dynamic Updates: Heatmap updates dynamically when the date range is changed.

## Implementation Details

### Frontend
 - Developed using SvelteKit.
 - Styled according to the provided Figma design.
 - Utilized D3.js for creating the heatmap.
 - Added a dropdown for date range selection, updating the heatmap dynamically.
 - Implemented tooltips for interactivity features.
 - Responsive design for optimal viewing on different devices using Tailwind CSS.

### Backend
- API endpoints were created using tRPC.
- Endpoints to fetch and aggregate unique visitor data by country and hour from ElasticSearch.
- Implemented filtering based on the selected date range.
- Connected to ElasticSearch using the provided Kibana credentials.

### Data Handling

- Optimized queries for efficient aggregation of data.
- Aggregated data to count unique visitors by country and hour.
- Implemented logic to handle predefined date ranges for fetching data from ElasticSearch.
- Formatted data into the desired structure for visualization on the server side.
- For the initial load the data has been fetched on the server side and pass it to the page.

## Conclusion
This project demonstrates the implementation of an interactive heatmap graph using SvelteKit and D3.js, with a backend powered by tRPC and ElasticSearch as per the requirements provided. The heatmap visualizes the number of unique visitors by country and hour, with a selectable date range for filtering data. The project meets the evaluation criteria by providing clean, readable, and maintainable code, correct implementation of the heatmap and date range selector, smooth user interactions, optimal data fetching and processing, and clear documentation.

Thank you for reviewing my submission. If you have any questions or need further information, please feel free to contact me.