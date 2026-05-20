import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const extractTextFromPdf = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();

    const pageText = textContent.items
      .map((item) => item.str)
      .join(" ");

    fullText += pageText + "\n";
  }

  return fullText;
};

const findEmail = (text) => {
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : "";
};

const findUrl = (text, keyword) => {
  const urlRegex = /https?:\/\/[^\s)]+/gi;
  const urls = text.match(urlRegex) || [];

  return urls.find((url) => url.toLowerCase().includes(keyword)) || "";
};

const guessName = (text) => {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const firstUsefulLine = lines.find(
    (line) =>
      line.length >= 3 &&
      line.length <= 60 &&
      !line.includes("@") &&
      !line.toLowerCase().includes("github") &&
      !line.toLowerCase().includes("linkedin") &&
      !line.toLowerCase().includes("curriculum") &&
      !line.toLowerCase().includes("resume")
  );

  return firstUsefulLine || "";
};

const guessTitle = (text) => {
  const lowerText = text.toLowerCase();

  const titles = [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer",
    "Software Developer",
    "Web Developer",
    "Computer Science Student",
    "Technical Product Management Intern",
    "IT Support Technician",
  ];

  return titles.find((title) => lowerText.includes(title.toLowerCase())) || "";
};

const guessSkills = (text) => {
  const possibleSkills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Mongoose",
    "Python",
    "Java",
    "C",
    "C++",
    "SQL",
    "MySQL",
    "SQLite",
    "Git",
    "GitHub",
    "REST API",
    "Flask",
    "Tailwind CSS",
    "Bootstrap",
    "Cybersecurity",
    "Networking",
    "Agile",
    "Scrum",
  ];

  const lowerText = text.toLowerCase();

  return possibleSkills.filter((skill) =>
    lowerText.includes(skill.toLowerCase())
  );
};

const guessProjects = (text) => {
  const possibleProjects = [
    "ExpiryGuard",
    "DevFolio",
    "Horizon Travels",
    "Build",
    "Saved",
    "PublishMe",
    "HelpdeskPro",
    "Crazy Cobra",
  ];

  const lowerText = text.toLowerCase();

  const matchedProjects = possibleProjects.filter((project) =>
    lowerText.includes(project.toLowerCase())
  );

  return matchedProjects.map((project) => ({
    name: project,
    description: "Imported from CV. Please review and update this description.",
    techStack: [],
    githubLink: "",
    liveDemo: "",
  }));
};

const guessExperience = (text) => {
  const experience = [];

  if (text.toLowerCase().includes("projectset")) {
    experience.push({
      company: "ProjectSet",
      role: "Technical Product Management Intern",
      duration: "",
      description:
        "Imported from CV. Please review and update this experience description.",
    });
  }

  return experience;
};

export const parseCvToPortfolioData = async (file) => {
  const text = await extractTextFromPdf(file);

  const email = findEmail(text);
  const linkedin = findUrl(text, "linkedin");
  const github = findUrl(text, "github");
  const website = findUrl(text, "github.io");

  const fullName = guessName(text);
  const title = guessTitle(text);
  const skills = guessSkills(text);
  const projects = guessProjects(text);
  const experience = guessExperience(text);

  return {
    fullName,
    title,
    bio:
      title || skills.length > 0
        ? `I am a ${title || "developer"} with experience in ${skills
            .slice(0, 5)
            .join(", ")}.`
        : "",
    contact: {
      email,
      linkedin,
      github,
      website,
    },
    skills,
    projects,
    experience,
    extractedText: text,
  };
};
