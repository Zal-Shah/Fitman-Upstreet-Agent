# Fitman: The Relentless Fitness Coach

## Project Description

Fitman is an AI-powered fitness assistant designed to help users achieve their fitness goals with personalized workout plans, injury-specific adjustments, and real-time progress tracking. Fitman uses **Upstreet** and integrates robust APIs to deliver a tailored fitness experience that ensures safety, motivation, and progress.

Fitman doesn't take shortcuts and ensures that every workout is optimized to help users achieve their goals while considering their injury history. Whether you're looking to lose weight, build muscle, or recover from an injury, Fitman is the ideal relentless coach who will guide you toward your fitness aspirations.

---

## Features

- **Personalized Workout Plans**: Generates workout plans tailored to the user's fitness goals, level, and injuries.
- **Injury-Specific Adjustments**: Filters exercises to exclude movements that could harm injured body parts.
- **Dynamic Intensity Scaling**: Modifies workouts based on user progress (e.g., weight loss, muscle gain).
- **Nutrition Recommendations**: Provides calorie and macro split suggestions based on fitness goals (bulk/cut).
- **Daily Reminders**: Keeps users on track with friendly nudges and reminders.
- **Progress Tracking**: Logs completed workouts and tracks improvements over time.

---

## Technologies Used

- **React**: Frontend framework for building user interactions.
- **Upstreet Framework**: Powers the AI Agent's features and actions.
- **APIs**: Fitness data is generated and filtered using robust APIs such as:
  - **WGER Exercise Database**: For categorized exercise information.
  - **ElevenLabs Text-to-Speech**: For voice guidance and motivational cues.
- **Zod**: Schema validation for user inputs.
- **Node.js & Express.js** (optional for backend extensions).

---

## APIs Used

### **WGER API**
- **/muscle/**: Fetches muscle groups for targeting specific areas.
- **/exercisecategory/**: Retrieves exercise categories.
- **/exerciseinfo/**: Gets detailed exercise information, including muscles worked and equipment needed.

### **ElevenLabs TTS API**
- Enables voice guidance to provide users with motivational cues and workout instructions.

> **Note**: Exercises and injuries are currently hard-coded due to API restrictions and errors.

---

## Getting Started

### Prerequisites
- Node.js and npm installed
- Git installed on your machine
- Access to the WGER API and ElevenLabs API keys

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Zal-Shah/Fitman-Upstreet-Agent.git
   cd Fitman-Upstreet-Agent
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add your API keys in a `.env` file or directly in the code:
   ```
   WGER_API_KEY=your_wger_api_key
   ELEVENLABS_API_KEY=your_elevenlabs_api_key
   ```

4. Start the application:
   ```bash
   npm start
   ```

---

## Usage

### Running the Agent:
- Run the following command to initiate the chatbot:
  ```bash
  usdk chat /path/to/your/agent/directory
  ```
- Start interacting with Fitman to plan your workouts!

### Main Features:
1. **Create Your Profile**: Share your fitness goals, level, and any injuries with Fitman.
2. **Generate a Plan**: Request a workout plan (daily/weekly/monthly) tailored to your preferences and injury history.
3. **Track Progress**: Log completed workouts to adjust the plan dynamically.
4. **Voice Assistance**: Use motivational voice guidance during workouts.

---

## Demonstration Video

[Watch the Project Demo](https://drive.google.com/file/d/1wL-Nt1KEpX6E2ifooJsjm2cavfevp5sK/view?usp=sharing)

---

## Future Enhancements

- Integration with wearable fitness devices.
- Advanced nutrition tracking and meal suggestions.
- Community leaderboard for friendly competition.

---

## Collaborators

The following collaborators were added to the GitHub repository:
- [@avaer](https://github.com/avaer)
- [@saadbazaz](https://github.com/saadbazaz)

---

Thank you for exploring Fitman! Your fitness goals are just a conversation away. 💪
```
