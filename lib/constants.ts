import type { TeamMember, Workshop, AIProject } from "./types"

export const EXECUTIVE_BOARD: TeamMember[] = [
  {
    name: "Darsh Chaurasia",
    position: "President",
    imageSrc: "/Officers/DarshChaurasia.png",
    email: "dchaurasia@asu.edu",
    linkedin: "https://www.linkedin.com/in/darshchaurasia/",
  },
  {
    name: "Gunika Dhingra",
    position: "President",
    imageSrc: "/Officers/gunika.webp",
    email: "gdhingra@asu.edu",
    linkedin: "https://www.linkedin.com/in/gunika-dhingra/",
  },
  {
    name: "Aishwarya Srivastava",
    position: "Director of Internal Tools",
    imageSrc: "/Officers/ash.webp",
    email: "asrivast@asu.edu",
    linkedin: "https://www.linkedin.com/in/ashworks",
  },
  {
    name: "Kaustubh Harapanahalli",
    position: "Vice President",
    imageSrc: "/Officers/kaustubh.webp",
    email: "kharapan@asu.edu",
    linkedin: "https://www.linkedin.com/in/kaustubhharapanahalli/",
  },
]

export const TECHNICAL_OFFICERS: TeamMember[] = [
  {
    name: "Joshua Tom",
    position: "Technical Officer",
    imageSrc: "/Officers/joshua.jpg",
    email: "joshuato@asu.edu",
    linkedin: "https://www.linkedin.com/in/joshua-tom-5929b1290/",
  },
  {
    name: "Javier Ramirez",
    position: "Technical Officer",
    imageSrc: "/Officers/javier.jpeg",
    email: "jcrami25@asu.edu",
    linkedin: "https://www.linkedin.com/in/javier-c-ramirez",
  },
  {
    name: "Pruthvi Nandan Janga",
    position: "Technical Officer",
    imageSrc: "/Officers/pruthvi.jpeg",
    email: "pjanga@asu.edu",
    linkedin: "https://www.linkedin.com/in/pruthvijanga/",
  },
  {
    name: "Sahil Panjwani",
    position: "Technical Officer",
    imageSrc: "/Officers/sahil.jpeg",
    email: "spanjwa3@asu.edu",
    linkedin: "https://www.linkedin.com/in/pansahi/",
  },
  {
    name: "Siddharth Mehta",
    position: "Internal Tools Officer",
    imageSrc: "/Officers/siddharth.jpg",
    email: "smehta74@asu.edu",
    linkedin: "https://www.linkedin.com/in/siddharthasu",
  },
  {
    name: "George Badulescu",
    position: "Internal Tools Officer",
    imageSrc: "/Officers/george_headshot.png",
    email: "gbadules@asu.edu",
    linkedin: "https://www.linkedin.com/in/george-badu/",
  },
  {
    name: "Asmit Datta",
    position: "Technical Officer",
    imageSrc: "/Officers/asmit.jpg",
    email: "adatta18@asu.edu",
    linkedin: "https://www.linkedin.com/in/asmitrajeet/",
  },
  {
    name: "Shreyanshi Bhatt",
    position: "Internal Tools Officer",
    imageSrc: "/Officers/shreyanshi.jpg",
    email: "sbhat136@asu.edu",
    linkedin: "https://www.linkedin.com/in/shreyanshi-bhatt-3bab3324b/",
  },
  {
    name: "Bhavya Minesh Shah",
    position: "Technical Officer",
    imageSrc: "/Officers/bhavya_minesh_shah.jpg",
    email: "bshah43@asu.edu",
    linkedin: "https://www.linkedin.com/in/bhavya-minesh-shah/",
  },
  {
    name: "Yahia Alqurnawi",
    position: "Internal Tools Officer",
    imageSrc: "/Officers/yahia.jpg",
    email: "yalqurna@asu.edu",
    linkedin: "https://www.linkedin.com/in/yahia-alqurnawi/",
  },
  {
    name: "Anannya Reddy Gade",
    position: "Technical Officer",
    imageSrc: "/Officers/anannya.jpg",
    email: "agade4@asu.edu",
    linkedin: "https://www.linkedin.com/in/anannyareddy/",
  },
  {
    name: "Aaditya Jindal",
    position: "Internal Tools Officer",
    imageSrc: "/Officers/aaditya.jpg",
    email: "ajinda17@asu.edu",
    linkedin: "https://www.linkedin.com/in/aadityajindal12",
  },
  {
    name: "Diya Shrivastava",
    position: "Technical Officer",
    imageSrc: "/Officers/diya.jpeg",
    email: "dshriva6@asu.edu",
    linkedin: "https://www.linkedin.com/in/diya-shrivastava",
  },
  {
    name: "Gunbir Singh",
    position: "Internal Tools Officer",
    imageSrc: "/Officers/gunbir.png",
    email: "gsing136@gmail.com",
    linkedin: "https://www.linkedin.com/in/gunbir06",
  },
  {
    name: "Harmitkumar Desai",
    position: "Technical Officer",
    imageSrc: "/Officers/harmit.jpg",
    email: "hdesai12@asu.edu",
    linkedin: "https://www.linkedin.com/in/harmitdesai/",
  },
  {
    name: "Aryan Patel",
    position: "Internal Tools Officer",
    imageSrc: "/Officers/aryan.jpg",
    email: "akpate24@asu.edu",
    linkedin: "https://www.linkedin.com/in/aryan-patel-b33a61278/",
  },
]

export const OPERATIONS_OFFICERS: TeamMember[] = [
  {
    name: "Gaurav Najpande",
    position: "Outreach Officer",
    imageSrc: "/Officers/gaurav.jpg",
    email: "gnajpand@asu.edu",
    linkedin: "https://www.linkedin.com/in/gauravnajpande/",
  },
  {
    name: "Arun Louis",
    position: "Event Logistics Officer",
    imageSrc: "/Officers/arun.jpg",
    email: "alouis6@asu.edu",
    linkedin: "https://www.linkedin.com/in/arunlouis17",
  },
  {
    name: "Manisha Chakraborty",
    position: "Marketing Officer",
    imageSrc: "/Officers/manisha.png",
    email: "mchakr11@asu.edu",
    linkedin: "https://www.linkedin.com/in/manisha-chakraborty",
  },
  {
    name: "Om Patel",
    position: "Finance Officer",
    imageSrc: "/Officers/om.jpg",
    email: "opatel7@asu.edu",
    linkedin: "https://www.linkedin.com/in/om-patel-1512om/",
  },
  {
    name: "Rutuja Patil",
    position: "Marketing Officer",
    imageSrc: "/Officers/rutuja.jpg",
    email: "rpatil46@asu.edu",
    linkedin: "https://www.linkedin.com/in/rutuja-patil-bb5996254/",
  },
  {
    name: "Ronak Koyani",
    position: "Design Officer",
    imageSrc: "/Officers/ronak.png",
    email: "rkoyani@asu.edu",
    linkedin: "https://www.linkedin.com/in/ronak-koyani/",
  },
  {
    name: "Kashish Bhutani",
    position: "Design Officer",
    imageSrc: "/Officers/kashish.jpg",
    email: "kbhutan1@asu.edu",
    linkedin: "https://www.linkedin.com/in/kashish-bhutani-239137350",
  },
  {
    name: "Saksham Kochar",
    position: "Event Logistics Officer",
    imageSrc: "/Officers/saksham.jpg",
    email: "sakshamkochar@gmail.com",
    linkedin: "https://www.linkedin.com/in/saksham-kochar-95555030a/",
  },
  {
    name: "Harshita Prasad",
    position: "Event Logistics Officer",
    imageSrc: "/Officers/harshita.jpg",
    email: "hprasad4@asu.edu",
    linkedin: "https://www.linkedin.com/in/harshitaprasad2905/",
  },
  {
    name: "Debopam Banerjee",
    position: "Marketing Officer",
    imageSrc: "/Officers/debopam.jpg",
    email: "dbaner10@asu.edu",
    linkedin: "https://www.linkedin.com/in/debopam-banerjee/",
  },
]

export const AIS_ALUMNI: TeamMember[] = [
  {
    name: "Poojah Ganesan",
    position: "Ex-President",
    imageSrc: "/Officers/Poojah_AIS.jpg",
    email: "pganesa4@asu.edu",
  },
  {
    name: "Rajat Aayush Jha",
    position: "Ex-Vice President",
    imageSrc: "/Officers/Rajat_AIS.jpg",
    email: "rjha16@asu.edu",
  },
  {
    name: "Krisha Waghela",
    position: "Ex-President",
    imageSrc: "/Officers/KrishaWaghela.jpeg",
    email: "kmwaghel@asu.edu",
  },
  {
    name: "Venkata Gunji",
    position: "Ex-Operations Director",
    imageSrc: "/Officers/venkata.webp",
    email: "vgunji1@asu.edu",
  },
  {
    name: "Prabakaran Annadurai",
    position: "Ex-Operations Director",
    imageSrc: "/Officers/Prabakaran_Annadurai.png",
    email: "pannadur@asu.edu",
  },
]

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

export const SPONSORS = [
  { id: 1, logo: "/sponsors/Alani_Logo.png", name: "Alani Nu" },
  // Add more sponsors as needed
]
