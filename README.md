# Gemini Image Editor

A web application that allows users to edit images using text prompts powered by the Google Gemini 2.5 Flash Image model. Upload an image, describe your desired changes, and let AI bring your vision to life.

---

## ✨ Features

-   **Intuitive Image Upload:** Supports both drag-and-drop and file selection for a seamless user experience.
-   **Powerful AI Editing:** Leverages the multimodal capabilities of the `gemini-2.5-flash-image` model to perform complex image edits with simple text commands.
-   **Side-by-Side Comparison:** Instantly compare the original image with the newly generated version.
-   **Responsive Design:** A clean and modern UI that works perfectly on both desktop and mobile devices.
-   **Clear User Feedback:** Includes loading states and error messages to keep the user informed during the generation process.

---

## 🛠️ Technology Stack

-   **Frontend:** [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **AI Model:** [Google Gemini API](https://ai.google.dev/) (`@google/genai`)

---

## 🚀 How It Works

The application provides a user-friendly interface to interact with the Gemini API for image editing:

1.  The user uploads an image. The browser's `FileReader` API converts the image into a Base64 encoded data URL.
2.  The user writes a text prompt describing the edit (e.g., "make the background a starry night," "add a retro filter").
3.  When the "Generate Image" button is clicked, the application sends the Base64 image data and the text prompt to the Gemini API.
4.  The `gemini-2.5-flash-image` model processes both the image and text inputs and generates a new, edited image.
5.  The API returns the edited image as a Base64 string.
6.  The application displays the new image alongside the original, allowing the user to see the result of their prompt.

---

## 🏁 Getting Started

To run this project locally, you will need a Google Gemini API key.

### Prerequisites

-   A modern web browser.
-   A Google Gemini API key. You can get one from [Google AI Studio](https://aistudio.google.com/).

### Running the Application

This application is designed to run in an environment where the Gemini API key is securely managed and provided as an environment variable (`process.env.API_KEY`).

1.  **Clone the repository (optional):**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```
2.  **Set up the API Key:**
    Ensure that the environment where you are running the application has the `API_KEY` variable set to your Google Gemini API key.
3.  **Serve the files:**
    Serve the `index.html` and its associated TypeScript/JavaScript files using a local web server.

---

## 📂 Project Structure

```
.
├── index.html                # Main HTML entry point
├── metadata.json             # Application metadata
├── src
│   ├── components
│   │   ├── ImageDisplay.tsx  # Component to display original/edited images
│   │   ├── ImageUpload.tsx   # Component for file upload (drag-drop/click)
│   │   └── LoadingSpinner.tsx# Simple loading animation
│   ├── services
│   │   └── geminiService.ts  # Logic for interacting with the Gemini API
│   ├── types.ts              # TypeScript type definitions
│   ├── App.tsx               # Main application component and layout
│   └── index.tsx             # React root renderer
└── ...
```
