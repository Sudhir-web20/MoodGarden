# MoodGarden 🌱

MoodGarden is a meditative mood-tracking application where your daily reflections grow a vibrant, personalized virtual garden. Track your emotional journey through nature-inspired visualizations and receive AI-powered insights from the "Garden Spirit."

## ✨ Features

- **Visual Garden Growth**: Watch your moods transform into unique plants (Sunflowers, Bonsais, Willows, etc.). Plants grow through stages (Seedling -> Sprout -> Potted -> Full Bloom) as you consistently log specific emotions.
- **AI Garden Wisdom**: Each entry generates a poetic "Garden Wisdom" reflection using the Gemini API, providing gentle encouragement and nature-based metaphors.
- **Interactive Garden Spirit**: Chat with a poetic AI companion that understands your emotional history and helps you reflect on your "inner seasons."
- **Mood Analytics**: Visualize your emotional landscape with "Mood Landscape" charts and track your planting consistency over time.
- **Persistent Data**: Your garden state is saved locally in your browser, ensuring your progress is never lost between sessions.

## 🛠️ Tech Stack

- **Frontend**: React 19 (ESM based)
- **Styling**: Tailwind CSS
- **State Management**: Zustand (with Persistence middleware)
- **Animations**: Framer Motion
- **Charts**: Recharts
- **AI Integration**: Google Gemini API (@google/genai)
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

This project is built using modern ES modules and requires no complex build step to run locally for development.

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/mood-garden.git
   cd mood-garden
   ```

2. **API Key**:
   The app requires a Google Gemini API Key. Ensure the environment variable `API_KEY` is set in your environment.

3. **Run Locally**:
   You can serve the files using any simple static file server. For example:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node (npx)
   npx serve .
   ```
   Open your browser to `http://localhost:8000`.

## 📂 Project Structure

- `index.html`: Main entry point with import map for dependency management.
- `index.tsx`: Application mounting.
- `App.tsx`: Main layout and routing logic.
- `store.ts`: Global state management with local storage persistence.
- `geminiService.ts`: AI logic for generating wisdom and chat sessions.
- `components/`: Modular UI components (Garden, MoodSelector, etc.).

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Nurture your mind, watch your garden grow.*