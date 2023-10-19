// import { ConnectionStates } from "mongoose";

const basicQuiz = {
  "name": "Career Compass Quiz",
  "questions": [
    {
      "question": ("What is the most important skill that you have learned from playing sports?"),
      "questionNumber": 1,
      "questionImg": "imageQ1",
      "answers": [
        {
          "answer": "Leadership",
          "answerCluster": ["Business", "Education", "Government", "Human Services","Public Safety", "STEM"]
        },
        {
          "answer": "Communication",
          "answerCluster": ["Arts", "Education", "Public Safety", "Marketing", "Transportation"]
        },
        {
          "answer": "Strategy",
          "answerCluster": ["Architecture", "Finance", "Human Services", "IT", "STEM"]
        },
        {
          "answer": "Hard-Work",
          "answerCluster": ["Agriculture", "Health", "Public Safety", "Manufacturing"]
        },
        {
          "answer": "Team-Work",
          "answerCluster": ["Arts", "Business", "Government", "Hospitality", "Human Services", "Public Safety", "Manufacturing", "Transportation"]
        },
      ]
    },
    {
      "question": ("What skill do you excel in the most on your team?"),
      "questionNumber": 2,
      "questionImg": "imageQ2",
      "answers": [
        {
          "answer": "Leadership",
          "answerCluster": ["Business", "Education", "Government", "Human Services", "Public Safety", "STEM"]
        },
        {
          "answer": "Communication",
          "answerCluster": ["Arts", "Education", "Public Safety", "Marketing", "Transportation"]
        },
        {
          "answer": "Strategy",
          "answerCluster": ["Architecture", "Finance", "Human Services", "IT", "Manufacturing", "STEM"]
        },
        {
          "answer": "Hard-Work",
          "answerCluster": ["Agriculture", "Health", "Public Safety"]
        },
        {
          "answer": "Team-Work",
          "answerCluster": ["Arts", "Business", "Government", "Hospitality", "Human Services", "Public Safety", "Manufacturing", "Transportation"]
        },
      ]
    },
    {
      "question": ("What skill do you need to improve the most?"),
      "questionNumber": 3,
      "questionImg": "imageQ3",
      "answers": [
        {
          "answer": "Leadership",
          "answerCluster": ["Business", "Education", "Government", "Human Services", "Public Safety", "STEM"]
        },
        {
          "answer": "Communication",
          "answerCluster": ["Arts", "Education", "Public Safety", "Manufacturing", "Marketing", "Transportation"]
        },
        {
          "answer": "Strategy",
          "answerCluster": ["Architecture", "Finance", "Human Services", "IT", "Manufacturing", "STEM", "Transportation"]
        },
        {
          "answer": "Hard-Work",
          "answerCluster": ["Agriculture", "Architecture", "Health", "Public Safety", "Manufacturing"]
        },
        {
          "answer": "Team-Work",
          "answerCluster": ["Arts", "Business", "Government", "Hospitality", "Human Services", "Public Safety", "Manufacturing", "Transportation"]
        },
      ]
    },
    {
      "question": ("What skill do you like the most?"),
      "questionNumber": 4,
      "questionImg": "imageQ4",
      "answers": [
        {
          "answer": "Leadership",
          "answerCluster": ["Business", "Education", "Government", "Human Services", "Public Safety", "STEM"]
        },
        {
          "answer": "Communication",
          "answerCluster": ["Arts", "Education", "Public Safety", "Manufacturing", "Marketing", "Transportation"]
        },
        {
          "answer": "Strategy",
          "answerCluster": ["Architecture", "Finance", "Human Services", "IT", "Manufacturing", "STEM", "Transportation"]
        },
        {
          "answer": "Hard-Work",
          "answerCluster": ["Agriculture", "Architecture", "Health", "Public Safety", "Manufacturing"]
        },
        {
          "answer": "Team-Work",
          "answerCluster": ["Arts", "Business", "Government", "Hospitality", "Human Services", "Public Safety", "Manufacturing", "Transportation"]
        },
      ]
    },
    {
      "question": ("Which skill do you find yourself using in other areas of your life the most?"),
      "questionNumber": 5,
      "questionImg": "imageQ5",
      "answers": [
        {
          "answer": "Leadership",
          "answerCluster": ["Business", "Education", "Government", "Human Services", "Public Safety", "STEM"]
        },
        {
          "answer": "Communication",
          "answerCluster": ["Arts", "Education", "Public Safety", "Manufacturing", "Marketing", "Transportation"]
        },
        {
          "answer": "Strategy",
          "answerCluster": ["Architecture", "Finance", "Human Services", "IT", "Manufacturing", "STEM", "Transportation"]
        },
        {
          "answer": "Hard-Work",
          "answerCluster": ["Agriculture", "Health", "Public Safety", "Manufacturing"]
        },
        {
          "answer": "Team-Work",
          "answerCluster": ["Arts", "Business", "Government", "Hospitality", "Human Services", "Public Safety", "Manufacturing", "Transportation"]
        },
      ]
    },
    {
      "question": ("Do you prefer reading or math?"),
      "questionNumber": 6,
      "questionImg": "imageQ6",
      "answers": [
        {
          "answer": "Reading",
          "answerCluster": ["Agriculture", "Arts", "Education", "Government", "Public Safety", "Marketing", "Transportation"]
        },
        {
          "answer": "Math",
          "answerCluster": ["Architecture", "Business", "Finance", "IT", "Manufacturing", "STEM"]
        },
      ]
    },
    {
      "question": ("Do you prefer science or history?"),
      "questionNumber": 7,
      "questionImg": "imageQ7",
      "answers": [
        {
          "answer": "Science",
          "answerCluster": ["Health", "IT", "STEM"]
        },
        {
          "answer": "History",
          "answerCluster": ["Agriculture", "Government", "Human Services"]
        },
      ]
    },
    {
      "question": ("On a scale of 1 to 5, how much do you like making things with your hands?"),
      "questionNumber": 8,
      "questionImg": "imageQ8",
      "answers": [
        {
          "answer": "1",
          "answerCluster": ["Business", "Finance"]
        },
        {
          "answer": "2",
          "answerCluster": ["Business", "Finance"]
        },
        {
          "answer": "3",
          "answerCluster": ["Agriculture", "Architecture", "Public Safety", "Manufacturing"]
        },
        {
          "answer": "4",
          "answerCluster": ["Agriculture", "Architecture", "Public Safety", "Manufacturing"]
        },
        {
          "answer": "5",
          "answerCluster": ["Agriculture", "Architecture", "Public Safety", "Manufacturing"]
        }
      ]
    },
    {
      "question": ("Would you rather work inside or outside?"),
      "questionNumber": 9,
      "questionImg": "imageQ9",
      "answers": [
        {
          "answer": "Inside",
          "answerCluster": ["Business"]
        },
        {
          "answer": "Outside",
          "answerCluster": ["Agriculture", "Architecture", "Transportation"]
        }
      ]
    },
    {
      "question": ("Would you rather play a math, word or strategy game?"),
      "questionNumber": 10,
      "questionImg": "imageQ10",
      "answers": [
        {
          "answer": "Math",
          "answerCluster": ["Business", "Finance", "Information", "STEM"]
        },
        {
          "answer": "Word",
        "answerCluster": ["Arts"]
        },
        {
          "answer": "Strategy",
          "answerCluster": ["Architecture", "IT", "Marketing"]
        }
      ]
    },
    {
      "question": ("Do you like working with people or working alone?"),
      "questionNumber": 11,
      "questionImg": "imageQ11",
      "answers": [
        {
          "answer": "With people",
          "answerCluster": ["Arts", "Hospitality", "Human Services"]
        },
        {
          "answer": "Alone",
          "answerCluster": ["STEM"]
        }
      ]
    },
    {
      "question": ("Would rather build the plan or execute the plan?"),
      "questionNumber": 12,
      "questionImg": "imageQ12",
      "answers": [
        {
          "answer": "Build",
          "answerCluster": ["Architecture", "Manufacturing", "Transportation,"]
        },
        {
          "answer": "Execute",
          "answerCluster": ["Manufacturing"]
        }
      ]
    },
    {
      "question": ("On a scale of 1 to 5, how much do you like public speaking?"),
      "questionNumber": 13,
      "questionImg": "imageQ13",
      "answers": [
        {
          "answer": "1",
          "answerCluster": ["Manufacturing"]
        },
        {
          "answer": "2",
          "answerCluster": ["Manufacturing"]
        },
        {
          "answer": "3",
          "answerCluster": ["Arts", "Public Safety"]
        },
        {
          "answer": "4",
          "answerCluster": ["Arts", "Public Safety"]
        },
        {
          "answer": "5",
          "answerCluster": ["Arts", "Public Safety"]
        }
      ]
    },
    {
      "question": ("Do you like to plan or go with the flow?"),
      "questionNumber": 14,
      "questionImg": "imageQ14",
      "answers": [
        {
          "answer": "Plan",
          "answerCluster": ["Architecture", "Education", "Transportation"]
        },
        {
          "answer": "Go with the flow",
          "answerCluster": ["Marketing"]
        }
      ]
    },
    {
      "question": ("On a scale of 1 to 5, how likely are you to take the lead role in a team setting?"),
      "questionNumber": 15,
      "questionImg": "imageQ15",
      "answers": [
        {
          "answer": "1",
          "answerCluster": ["Human Services", "Health"]
        },
        {
          "answer": "2",
          "answerCluster": ["Human Services", "Health"]
        },
        {
          "answer": "3",
          "answerCluster": ["Business", "Government", "Marketing"]
        },
        {
          "answer": "4",
          "answerCluster": ["Business", "Government", "Marketing"]
        },
        {
          "answer": "5",
          "answerCluster": ["Business", "Government", "Marketing"]
        }
      ]
    },
    {
      "question": ("On a scale of 1 to 5, how much do you like to teach others?"),
      "questionNumber": 16,
      "questionImg": "imageQ16",
      "answers": [
        {
          "answer": "1",
          "answerCluster": ["Transportation"]
        },
        {
          "answer": "2",
          "answerCluster": ["Transportation"]
        },
        {
          "answer": "3",
          "answerCluster": ["Education"]
        },
        {
          "answer": "4",
          "answerCluster": ["Education"]
        },
        {
          "answer": "5",
          "answerCluster": ["Education"]
        }
      ]
    },
    {
      "question": ("Do you like to have a physical challenge or a mental challenge?"),
      "questionNumber": 17,
      "questionImg": "imageQ17",
      "answers": [
        {
          "answer": "Physical",
          "answerCluster": ["Agriculture", "Architecture", "Manufacturing", "Transportation"]
        },
        {
          "answer": "Mental",
          "answerCluster": ["IT", "STEM", "Transportation"]
        }
      ]
    },
    {
      "question": ("Do you like to follow instructions or follow your gut/intuition?"),
      "questionNumber": 18,
      "questionImg": "imageQ18",
      "answers": [
        {
          "answer": "Follow Instructions",
          "answerCluster": ["Architecture", "Manufacturing", "STEM", "Transportation"]
        },
        {
          "answer": "Follow gut/intuition",
          "answerCluster": ["Finance", "Hospitality", "Health"]
        }
      ]
    },
    {
      "question": ("If something takes you a long time to figure out, will you keep trying or will you try something else?"),
      "questionNumber": 19,
      "questionImg": "imageQ19",
      "answers": [
        {
          "answer": "Keep trying",
          "answerCluster": ["Architecture", "Finance", "STEM"]
        },
        {
          "answer": "Try something else",
          "answerCluster": ["Agriculture", "Marketing"]
        }
      ]
    },
    {
      "question": ("How competitive are you?"),
      "questionNumber": 20,
      "questionImg": "imageQ20",
      "answers": [
        {
          "answer": "I want to win at any cost",
          "answerCluster": ["Business", "Finance", "Marketing"]
        },
        {
          "answer": "It doesn't matter as long as we are having fun",
          "answerCluster": ["Agriculture", "Human Services", "Health"]
        }
      ]
    },
    {
      "question": ("On a scale of 1 to 5, how much do you like writing?"),
      "questionNumber": 21,
      "questionImg": "imageQ21",
      "answers": [
        {
          "answer": "1",
          "answerCluster": ["Human Services"]
        },
        {
          "answer": "2",
          "answerCluster": ["Human Services"]
        },
        {
          "answer": "3",
          "answerCluster": ["Government", "Education"]
        },
        {
          "answer": "4",
          "answerCluster": ["Government", "Education"]
        },
        {
          "answer": "5",
          "answerCluster": ["Government", "Education"]
        }
      ]
    },
    {
      "question": ("On a scale of 1 to 5, how much do you like to be in the spot light?"),
      "questionNumber": 22,
      "questionImg": "imageQ22",
      "answers": [
        {
          "answer": "1",
          "answerCluster": []
        },
        {
          "answer": "2",
          "answerCluster": []
        },
        {
          "answer": "3",
          "answerCluster": ["Arts", "Human Services"]
        },
        {
          "answer": "4",
          "answerCluster": ["Arts", "Human Services"]
        },
        {
          "answer": "5",
          "answerCluster": ["Arts", "Human Services"]
        }
      ]
    },
    {
      "question": ("On a scale of 1 to 5, how creative do you consider yourself?"),
      "questionNumber": 23,
      "questionImg": "imageQ23",
      "answers": [
        {
          "answer": "1",
          "answerCluster": []
        },
        {
          "answer": "2",
          "answerCluster": []
        },
        {
          "answer": "3",
          "answerCluster": ["Arts", "Business", "STEM"]
        },
        {
          "answer": "4",
          "answerCluster": ["Arts", "Business", "STEM"]
        },
        {
          "answer": "5",
          "answerCluster": ["Arts", "Business", "STEM"]
        }
      ]
    }
  ]
};

export default basicQuiz;