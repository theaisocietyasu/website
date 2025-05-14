import type { TeamMember, Workshop, AIProject } from "./types"

// Core team members data
export const CORE_TEAM: TeamMember[] = [
  {
    name: "Poojah Ganesan",
    position: "Co-President & AI MakerSpace Mentor",
    imageSrc: "/Officers/Poojah_AIS.jpg",
    email: "pganesa4@asu.edu",
  },
  {
    name: "Siddhesh Badani",
    position: "Co-President",
    imageSrc: "/Officers/SiddheshBadani.png",
    email: "sid13@asu.edu",
  },
  {
    name: "Darsh Chaurasia",
    position: "Vice President of Operations",
    imageSrc: "/Officers/DarshChaurasia.png",
    email: "dchauras@asu.edu",
  },
  {
    name: "Rajat Aayush Jha",
    position: "Vice President & AI MakerSpace Mentor",
    imageSrc: "/Officers/Rajat_AIS.jpg",
    email: "rjha16@asu.edu",
  },
]

// Technical team members data
export const TECHNICAL_TEAM: TeamMember[] = [
  {
    name: "Aishwarya Srivastava",
    position: "Technical Director & AI MakerSpace Mentor",
    imageSrc: "/Officers/ash.webp",
    email: "asriv132@asu.edu",
  },
  {
    name: "Gunika Dhingra",
    position: "Technical Director & AI MakerSpace Mentor",
    imageSrc: "/Officers/gunika.webp",
    email: "gdhingr1@asu.edu",
  },
  {
    name: "Kaustubh Harapanahalli",
    position: "Technical Director & AI MakerSpace Mentor",
    imageSrc: "/Officers/kaustubh.webp",
    email: "kharapan@asu.edu",
  },
]

// Operations team members data
export const OPERATIONS_TEAM: TeamMember[] = [
  {
    name: "Venkata Gunji",
    position: "Operations Director",
    imageSrc: "/Officers/venkata.webp",
    email: "vgunji1@asu.edu",
  },
  {
    name: "Prabakaran Annadurai",
    position: "Operations Director",
    imageSrc: "/Officers/Prabakaran_Annadurai.png",
    email: "pannadur@asu.edu",
  },
]

// ML Lab workshops data
export const ML_WORKSHOPS: Workshop[] = [
  {
    id: 1,
    title: "F24 Week 1: Data Cleaning",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    files: [
      {
        name: "ML_Lab_Week_#1_Slide_Deck.pdf",
        link: "https://github.com/theaisocietyasu/technical-ml-workshops-f24/blob/main/Week%201/ML%20Lab%20_%20Week%20%231%20_%204%20Sept%20_24.pdf",
      },
      {
        name: "Week_1_DataCLeaning.ipynb",
        link: "https://github.com/theaisocietyasu/technical-ml-workshops-f24/blob/main/Week%201/Week_1_DataCLeaning.ipynb",
      },
      {
        name: "cleaned_group_seperate.xlsx",
        link: "https://github.com/theaisocietyasu/technical-ml-workshops-f24/blob/main/Week%201/cleaned_group_seperate.xlsx",
      },
    ],
    procedures:
      "Go over the theory in the slide deck. Detailed Explanations are Implementations are shown in the video. You can practice it using the notebook. If you have any Questions, hit us up on our ML discord channel (https://discord.gg/dCWm6xBGtM). Practice Questions can be found at the end of the slide deck by scanning the QR code. See ya at our next workshop!",
  },
  {
    id: 2,
    title: "F24 Week 2: Exploratory Data Analysis",
    videoUrl: "https://www.youtube.com/embed/WfdE-QKQyJI?si=c9ZsRvnM7phbvHV5",
    files: [
      {
        name: "ML_Lab_Week_#2_Slide_Deck.pdf",
        link: "https://github.com/theaisocietyasu/technical-ml-workshops-f24/blob/main/Week%202/Week%202%20DataCleaning.pdf",
      },
      {
        name: "Week_2_DataPreprocessingCode.ipynb",
        link: "https://github.com/theaisocietyasu/technical-ml-workshops-f24/blob/main/Week%202/Week_2_DataPreprocessingCode.ipynb",
      },
    ],
    procedures:
      "Go over the theory in the slide deck. Detailed Explanations are Implementations are shown in the video. You can practice it using the notebook. If you have any Questions, hit us up on our ML discord channel (https://discord.gg/dCWm6xBGtM). Practice Questions can be found at the end of the slide deck by scanning the QR code. See ya at our next workshop!",
  },
  {
    id: 3,
    title: "F24 Week 3: Feature Generation from Text Data",
    videoUrl: "https://www.youtube.com/embed/b9tXNxdVDCg?si=UBG-e3-cGcFtvCU7",
    files: [
      {
        name: "ML_Lab_Week_#3_Slide_Deck.pdf",
        link: "https://github.com/theaisocietyasu/technical-ml-workshops-f24/blob/main/Week%203/Week%203%20%2CML_Workshop.pdf",
      },
      {
        name: "Week_3_FeatureGeneration.ipynb",
        link: "https://github.com/theaisocietyasu/technical-ml-workshops-f24/blob/main/Week%203/Week_3_FeatureGeneration.ipynb",
      },
      {
        name: "Week3_data.csv",
        link: "https://github.com/theaisocietyasu/technical-ml-workshops-f24/blob/main/Week%203/Week3_data.csv",
      },
    ],
    procedures:
      "Go over the theory in the slide deck. Detailed Explanations are Implementations are shown in the video. You can practice it using the notebook. If you have any Questions, hit us up on our ML discord channel (https://discord.gg/dCWm6xBGtM). Practice Questions can be found at the end of the slide deck by scanning the QR code. See ya at our next workshop!",
  },
  {
    id: 4,
    title: "F24 Week 4: Classification",
    videoUrl: "https://www.youtube.com/embed/jxXGpwwFlek?si=zsga1CzsR4EwM3Bd",
    files: [
      {
        name: "ML_Lab_Week_#4_Slide_Deck.pdf",
        link: "https://github.com/theaisocietyasu/technical-ml-workshops-f24/blob/main/Week%204/Week%204%20ML_AIS.pdf",
      },
      {
        name: "Week_4_Classification.ipynb",
        link: "https://github.com/theaisocietyasu/technical-ml-workshops-f24/blob/main/Week%204/Week_4_Classification.ipynb",
      },
      {
        name: "data_week4.csv",
        link: "https://github.com/theaisocietyasu/technical-ml-workshops-f24/blob/main/Week%204/data_week4.csv",
      },
      {
        name: "tfidf_week4.csv",
        link: "https://github.com/theaisocietyasu/technical-ml-workshops-f24/blob/main/Week%204/tfidf_week4.csv",
      },
    ],
    procedures:
      "Go over the theory in the slide deck. Detailed Explanations are Implementations are shown in the video. You can practice it using the notebook. If you have any Questions, hit us up on our ML discord channel (https://discord.gg/dCWm6xBGtM). Practice Questions can be found at the end of the slide deck by scanning the QR code. See ya at our next workshop!",
  },
]

// NLP Lab workshops data
export const NLP_WORKSHOPS: Workshop[] = [
  {
    id: 1,
    title: "F24 Week 1: Intro to NLP",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    files: [
      {
        name: "NLP_Lab_Week_#1_Slide_Deck.pdf",
        link: "https://github.com/theaisocietyasu/technical-nlp-workshops-f24/blob/main/Week%201/NLP%20Lab%20_%20Week%20%231%20_%204%20Sept%20_24.pdf",
      },
      {
        name: "Phase1.ipynb",
        link: "https://github.com/theaisocietyasu/technical-nlp-workshops-f24/blob/main/Week%201/Phase_1_BoW.ipynb",
      },
      {
        name: "Archive.zip",
        link: "https://github.com/theaisocietyasu/technical-nlp-workshops-f24/blob/main/Week%201/archive.zip",
      },
    ],
    procedures:
      "Go over the theory in the slide deck. Detailed Explanations are Implementations are shown in the video. You can practice it using the notebook. If you have any Questions, hit us up on our NLP discord channel (https://discord.gg/dCWm6xBGtM). Practice Questions can be found at the end of the slide deck by scanning the QR code. See ya at our next workshop!",
  },
  {
    id: 2,
    title: "F24 Week 2: Exploring Text Representations",
    videoUrl: "https://www.youtube.com/embed/NfHyJ2j8gZo?si=f7WvILXykt9h9L7V",
    files: [
      {
        name: "NLP_Lab_Week_#2_Slide_Deck.pdf",
        link: "https://github.com/theaisocietyasu/technical-nlp-workshops-f24/blob/main/Week%202/NLP%20Lab%20_%20Week%20%232%20_%2018%20Sept%20_24.pdf",
      },
      {
        name: "Template for Phase_2_N-grams_and_TF-IDF.ipynb",
        link: "https://github.com/theaisocietyasu/technical-nlp-workshops-f24/blob/main/Week%202/Template%20for%20Phase_2_N-grams_and_TF-IDF.ipynb",
      },
      {
        name: "Phase_2_N_grams_and_TF_IDF.ipynb",
        link: "https://github.com/theaisocietyasu/technical-nlp-workshops-f24/blob/main/Week%202/Phase_2_N_grams_and_TF_IDF.ipynb",
      },
    ],
    procedures:
      "Go over the theory in the slide deck. Detailed Explanations are Implementations are shown in the video. You can practice it using the notebook. If you have any Questions, hit us up on our NLP discord channel (https://discord.gg/dCWm6xBGtM). Practice Questions can be found at the end of the slide deck by scanning the QR code. See ya at our next workshop!",
  },
  {
    id: 3,
    title: "F24 Week 3: Word2Vec & Fasttext",
    videoUrl: "https://www.youtube.com/embed/6Q_64gG_3XI?si=mW4aS4SwVnybEOEs",
    files: [
      {
        name: "NLP_Lab_Week_#3_Slide_Deck.pdf",
        link: "https://github.com/theaisocietyasu/technical-nlp-workshops-f24/blob/main/Week%203/NLP%20Lab%20_%20Week%20%233%20_%2025%20Sept%20_24.pdf",
      },
      {
        name: "Phase3.ipynb",
        link: "https://github.com/theaisocietyasu/technical-nlp-workshops-f24/blob/main/Week%203/Phase3.ipynb",
      },
    ],
    procedures:
      "Go over the theory in the slide deck. Detailed Explanations are Implementations are shown in the video. You can practice it using the notebook. If you have any Questions, hit us up on our NLP discord channel (https://discord.gg/dCWm6xBGtM). Practice Questions can be found at the end of the slide deck by scanning the QR code. See ya at our next workshop!",
  },
  {
    id: 4,
    title: "F24 Week 4: RNNs and LSTMs Theory",
    videoUrl: "https://www.youtube.com/embed/7a10s-hyKhw?si=JoLG_vXuZwfKbqsK",
    files: [
      {
        name: "NLP_Lab_Week_#4_Slide_Deck.pdf",
        link: "https://github.com/theaisocietyasu/technical-nlp-workshops-f24/blob/main/Week%204/NLP%20Lab%20_%20Week%20%234%20_%202%20Oct%20_24.pdf",
      },
      {
        name: "Phase_4_RNNs_and_Attention_Mechanisms.ipynb",
        link: "https://github.com/theaisocietyasu/technical-nlp-workshops-f24/blob/main/Week%204/Phase_4_RNNs_and_Attention_Mechanisms.ipynb",
      },
    ],
    procedures:
      "Go over the theory in the slide deck. Detailed Explanations are Implementations are shown in the video. You can practice it using the notebook. If you have any Questions, hit us up on our NLP discord channel (https://discord.gg/dCWm6xBGtM). Practice Questions can be found at the end of the slide deck by scanning the QR code. See ya at our next workshop!",
  },
  {
    id: 5,
    title: "F24 Week 5: RNNs, LSTMs & Attention Mechanism Code Implementation",
    videoUrl: "https://www.youtube.com/embed/R4fcg_iufd4?si=dfjIFVg_icx-_Grg",
    files: [
      {
        name: "NLP_Lab_Week_#5_Slide_Deck.pdf",
        link: "https://github.com/theaisocietyasu/technical-nlp-workshops-f24/blob/main/Week%205/NLP%20Lab%20%7C%20Week%20%235%20%7C%2017%20Oct%20'24.pdf",
      },
      {
        name: "Transformers.ipynb",
        link: "https://github.com/theaisocietyasu/technical-nlp-workshops-f24/blob/main/Week%205/Transformers.ipynb",
      },
    ],
    procedures:
      "Go over the theory in the slide deck. Detailed Explanations are Implementations are shown in the video. You can practice it using the notebook. If you have any Questions, hit us up on our NLP discord channel (https://discord.gg/dCWm6xBGtM). Practice Questions can be found at the end of the slide deck by scanning the QR code. See ya at our next workshop!",
  },
]

// AI Makerspace Projects data - Updated with actual project names and team members
export const AI_MAKERSPACE_PROJECTS: AIProject[] = [
  {
    id: 1,
    title: "Scholarship Finder",
    team: "Ishita Upadhyay, Suma Mallu, Nagasiri Poluri",
    description:
      "An AI-powered scholarship matching system that helps students find scholarships based on their profile. The system collects data like GPA, major, financial need, and personal background to match students with relevant opportunities using RAG technology.",
    pdfUrl: "https://drive.google.com/file/d/1Udu-UioJYPwuCzWsMaYKO0kHej1x24bs/preview",
    thumbnailUrl: "/ai_makerspace/scholarship_finder_5.png",
  },
  {
    id: 2,
    title: "dAIgrammatic",
    team: "Aakash Khepar, Taskeen Jafri",
    description:
      "A tool that empowers users to create flowcharts and diagrams effortlessly using AI. dAIgrammatic simplifies complex ideas, saves time, and improves diagram quality through AI-powered automation, making diagramming accessible to users of all skill levels.",
    pdfUrl: "https://drive.google.com/file/d/1n1VwMdCOBIntj6vrhJBkt_TmdnES6PRI/preview",
    thumbnailUrl: "/ai_makerspace/daigrammatic_1.png",
  },
  {
    id: 3,
    title: "Intelligent Refrigerator",
    team: "Byte Me (Bhavya Minesh Shah, Karan Patel, Reshma Panibhate)",
    description:
      "An intelligent refrigerator system that monitors and manages food inventory in real-time. Using internal cameras and AI object recognition, it tracks food items, sends expiry alerts, and helps with grocery planning to reduce waste and improve efficiency.",
    pdfUrl: "https://drive.google.com/file/d/1har_TaXBSOSlKlmYskh9h3B9wycb8OrJ/preview",
    thumbnailUrl: "/ai_makerspace/agentic_refrigerator_1.png",
  },
  {
    id: 4,
    title: "SparkyAI 2.0",
    team: "Efaz Arian, Carlos Quihuis, Aniket Garg",
    description:
      "An AI assistant specifically designed for ASU students to help with campus navigation, course selection, and academic resources. SparkyAI integrates with ASU systems to provide personalized guidance and support throughout the student journey.",
    pdfUrl: "https://drive.google.com/file/d/1yf8Qbe-cBbRKlNYL54pH-3ttVUrYdhiz/preview",
    thumbnailUrl: "/ai_makerspace/sparkyai_1.png",
  },
]

// Sponsors data
export const SPONSORS = [
  { id: 1, logo: "/sponsors/Alani_Logo.png", name: "Alani Nu" },
  // Add more sponsors as needed
]
