import imageQ1 from "./quizImages/q1_mainsport.jpg";
import imageQ2 from "./quizImages/q2_football.jpg";
import imageQ3 from "./quizImages/q3_improve.jpg";
import imageQ4 from "./quizImages/q4_football.jpg";
import imageQ5 from "./quizImages/q5_excel.jpg";
import imageQ6 from "./quizImages/q6_readMath.jpg";
import imageQ7 from "./quizImages/q7_sciencehist.jpg";
import imageQ8 from "./quizImages/q8_hands.jpg";
import imageQ9 from "./quizImages/q9_workOutside.jpg";
import imageQ10 from "./quizImages/q10_stratGame.jpg";
import imageQ11 from "./quizImages/q11_workPeople.jpg";
import imageQ12 from "./quizImages/q12_buildPlan.jpg";
import imageQ13 from "./quizImages/q13_speakUp.jpg";
import imageQ14 from "./quizImages/q14_planFlow.jpg";
import imageQ15 from "./quizImages/q15_footballhelp.webp";
import imageQ16 from "./quizImages/q16_footballteach.jpg";
import imageQ17 from "./quizImages/q17_mentalvsphysical.jpg";
import imageQ18 from "./quizImages/q18_list.jpg";
import imageQ19 from "./quizImages/q19_determination.jpg";
import imageQ20 from "./quizImages/q20_competitive.jpg";
import imageQ21 from "./quizImages/q21_write.jpg";
import imageQ22 from "./quizImages/q22_spotlight.jpg";
import imageQ23 from "./quizImages/q23_creativity.jpg";

const questions = {
  0: {
    Question:
      "What is the most important skill that you have learned from playing sports?",
    Type: "Mult",
    options: [
      {id: 0, text: "Leadership"},
      {id: 1, text: "Communication"},
      {id: 2, text: "Hard-Work"},
      {id: 3, text: "Team-Work"},
    ],
    picture: imageQ1,
  },

  1: {
    Question:
      "What skill do you excel in the most on your team?",
    Type: "Mult",
    options: [
      {id: 0, text: "Leadership"},
      {id: 1, text: "Communication"},
      {id: 2, text: "Strategy"},
      {id: 3, text: "Hard-Work"},
      {id: 4, text: "Team-Work"}
    ],
    picture: imageQ2,
  },

  2: {
    Question: "What skill do you need to improve the most?",
    Type: "Mult",
    options: [
      {id: 0, text: "Leadership"},
      {id: 1, text: "Communication"},
      {id: 2, text: "Strategy"},
      {id: 3, text: "Hard-Work"},
      {id: 4, text: "Team-Work"}
    ],
    picture: imageQ3,
  },

  3: {
    Question: "What skill do you like the most?",
    Type: "Mult",
    options: [
      {id: 0, text: "Leadership"},
      {id: 1, text: "Communication"},
      {id: 2, text: "Strategy"},
      {id: 3, text: "Hard-Work"},
      {id: 4, text: "Team-Work"}
    ],
    picture: imageQ4,
  },

  4: {
    Question: "Which skill do you find yourself using in other areas of your life?",
    Type: "Mult",
    options: [
      {id: 0, text: "Leadership"},
      {id: 1, text: "Communication"},
      {id: 2, text: "Strategy"},
      {id: 3, text: "Hard-Work"},
      {id: 4, text: "Team-Work"}
    ],
    picture: imageQ5,
  },

  5: {
    Question: "Do you prefer reading or math?",
    Type: "Mult",
    options: [
      {id: 0, text: "Reading"},
      {id: 1, text: "Math"},
    ],
    picture: imageQ6,
  },

  6: {
    Question: "Do you prefer science or history?",
    Type: "Mult",
    options: [
      {id: 0, text: "Science"},
      {id: 1, text: "History"},
    ],
    picture: imageQ7,
  },

  7: {
    Question: "Do you like making things with your hands?",
    Type: "Mult",
    options: [
      {id: 0, text: "Yes"},
      {id: 1, text: "No"},
    ],
    picture: imageQ8,
  },

  8: {
    Question: "Would you rather work inside or outside?",
    Type: "Mult",
    options: [
      {id: 0, text: "Inside"},
      {id: 1, text: "Outside"},
    ],
    picture: imageQ9,
  },

  9: {
    Question: "Would you rather play a math, word, or strategy game?",
    Type: "Mult",
    options: [
      {id: 0, text: "Math"},
      {id: 1, text: "Word"},
      {id: 2, text: "Strategy"},
    ],
    picture: imageQ10,
  },

  10: {
    Question: "Do you like working with people or working alone?",
    Type: "Mult",
    options: [
      {id: 0, text: "With people"},
      {id: 1, text: "Alone"},
    ],
    picture: imageQ11,
  },

  11: {
    Question: "Would rather build the plan or execute the plan?",
    Type: "Mult",
    options: [
      {id: 0, text: "Build"},
      {id: 1, text: "Execute"},
    ],
    picture: imageQ12,
  },

  12: {
    Question: "Do you like public speaking?",
    Type: "Mult",
    options: [
      {id: 0, text: "Yes"},
      {id: 1, text: "No"},
    ],
    picture: imageQ13,
  },

  13: {
    Question: "Do you like to plan things or go with the flow?",
    Type: "Mult",
    options: [
      {id: 0, text: "Plan"},
      {id: 1, text: "Go with the flow"},
    ],
    picture: imageQ14,
  },

  14: {
    Question: "In a team setting are you one to take the lead role?",
    Type: "Mult",
    options: [
      {id: 0, text: "Yes"},
      {id: 1, text: "No"},
    ],
    picture: imageQ15,
  },

  15: {
    Question: "Do you like to teach others?",
    Type: "Mult",
    options: [
      {id: 0, text: "Yes"},
      {id: 1, text: "No"},
    ],
    picture: imageQ16,
  },

  16: {
    Question: "Do you like to have a physical challenge or a mental challenge?",
    Type: "Mult",
    options: [
      {id: 0, text: "Physical"},
      {id: 1, text: "Mental"},
    ],
    picture: imageQ17,
  },

  17: {
    Question: "Do you like to follow instructions or follow your gut/intuition?",
    Type: "Mult",
    options: [
      {id: 0, text: "Follow Instructions"},
      {id: 1, text: "Follow gut/intuition"},
    ],
    picture: imageQ18,
  },

  18: {
    Question: "If something takes you a long time to figure out, will you keep trying or will you try something else?",
    Type: "Mult",
    options: [
      {id: 0, text: "Keep trying"},
      {id: 1, text: "Try something else"},
    ],
    picture: imageQ19,
  },

  19: {
    Question: "How competitive are you?",
    Type: "Mult",
    options: [
      {id: 0, text: "I want to win at any cost"},
      {id: 1, text: "It doesn't matter as long as we are having fun"},
    ],
    picture: imageQ20,
  },

  20: {
    Question: "Do you like writing?",
    Type: "Mult",
    options: [
      {id: 0, text: "Yes"},
      {id: 1, text: "No"},
    ],
    picture: imageQ21,
  },

  21: {
    Question: "Do you like to be in the spot light?",
    Type: "Mult",
    options: [
      {id: 0, text: "Yes"},
      {id: 1, text: "No"},
    ],
    picture: imageQ22,
  },

  22: {
    Question: "Do you consider yourself a creative person?",
    Type: "Mult",
    options: [
      {id: 0, text: "Yes"},
      {id: 1, text: "No"},
    ],
    picture: imageQ23,
  }

};
export default questions;