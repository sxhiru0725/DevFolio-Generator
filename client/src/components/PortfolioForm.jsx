import { useEffect, useState } from "react";
import { parseCvToPortfolioData } from "../utils/cvParser";
import { uploadResumeFile } from "../api/uploadApi";

function PortfolioForm({ initialData, onSubmit, buttonText }) {
  const emptyForm = {
    username: "",
    fullName: "",
    title: "",
    bio: "",
    profileImage: "",
    resumeUrl: "",
    theme: "default",
    contact: {
      email: "",
      linkedin: "",
      github: "",
      website: ""
    },
    skills: [""],
    projects: [
      {
        name: "",
        description: "",
        techStack: [""],
        githubLink: "",
        liveDemo: ""
      }
    ],
    experience: [
      {
        company: "",
        role: "",
        duration: "",
        description: ""
      }
    ]
  };

  const [formData, setFormData] = useState(initialData || emptyForm);
  const [cvImporting, setCvImporting] = useState(false);
  const [cvMessage, setCvMessage] = useState("");
  const [resumeUploading, setResumeUploading] = useState(false);
  const [resumeMessage, setResumeMessage] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...emptyForm,
        ...initialData,
        contact: {
          ...emptyForm.contact,
          ...initialData.contact
        },
        skills: initialData.skills?.length ? initialData.skills : [""],
        projects: initialData.projects?.length ? initialData.projects : emptyForm.projects,
        experience: initialData.experience?.length
          ? initialData.experience
          : emptyForm.experience
      });
    }
  }, [initialData]);

  const handleCvImport = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setCvMessage("Please upload a PDF CV only.");
      return;
    }

    try {
      setCvImporting(true);
      setCvMessage("Reading CV and filling the form...");

      const importedData = await parseCvToPortfolioData(file);

      setFormData((prev) => ({
        ...prev,
        fullName: importedData.fullName || prev.fullName,
        title: importedData.title || prev.title,
        bio: importedData.bio || prev.bio,
        contact: {
          ...prev.contact,
          email: importedData.contact.email || prev.contact.email,
          linkedin: importedData.contact.linkedin || prev.contact.linkedin,
          github: importedData.contact.github || prev.contact.github,
          website: importedData.contact.website || prev.contact.website
        },
        skills: importedData.skills.length > 0 ? importedData.skills : prev.skills,
        projects:
          importedData.projects.length > 0 ? importedData.projects : prev.projects,
        experience:
          importedData.experience.length > 0
            ? importedData.experience
            : prev.experience
      }));

      setCvMessage(
        "CV imported successfully. Please review and edit the details before previewing."
      );
    } catch (error) {
      setCvMessage("Could not read this CV. Please fill the form manually.");
    } finally {
      setCvImporting(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setResumeMessage("Please upload a PDF resume only.");
      return;
    }

    try {
      setResumeUploading(true);
      setResumeMessage("Uploading resume to Cloudinary...");

      const response = await uploadResumeFile(file);

      setFormData((prev) => ({
        ...prev,
        resumeUrl: response.data.url
      }));

      setResumeMessage("Resume uploaded successfully.");
    } catch (error) {
      setResumeMessage(
        error.response?.data?.message ||
          "Resume upload failed. You can paste a resume link manually."
      );
    } finally {
      setResumeUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      contact: {
        ...formData.contact,
        [name]: value
      }
    });
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData({ ...formData, skills: updatedSkills });
  };

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ""] });
  };

  const removeSkill = (index) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updatedSkills.length ? updatedSkills : [""] });
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  const handleProjectTechChange = (projectIndex, techIndex, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[projectIndex].techStack[techIndex] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  const addProjectTech = (projectIndex) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[projectIndex].techStack.push("");
    setFormData({ ...formData, projects: updatedProjects });
  };

  const removeProjectTech = (projectIndex, techIndex) => {
    const updatedProjects = [...formData.projects];
    const newStack = updatedProjects[projectIndex].techStack.filter(
      (_, i) => i !== techIndex
    );
    updatedProjects[projectIndex].techStack = newStack.length ? newStack : [""];
    setFormData({ ...formData, projects: updatedProjects });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          name: "",
          description: "",
          techStack: [""],
          githubLink: "",
          liveDemo: ""
        }
      ]
    });
  };

  const removeProject = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      projects: updatedProjects.length ? updatedProjects : emptyForm.projects
    });
  };

  const handleProjectDragStart = (e, index) => {
    e.dataTransfer.setData("projectIndex", String(index));
  };

  const handleProjectDrop = (e, dropIndex) => {
    e.preventDefault();

    const dragIndex = Number(e.dataTransfer.getData("projectIndex"));

    if (dragIndex === dropIndex) return;

    const updatedProjects = [...formData.projects];
    const [draggedProject] = updatedProjects.splice(dragIndex, 1);
    updatedProjects.splice(dropIndex, 0, draggedProject);

    setFormData({ ...formData, projects: updatedProjects });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index][field] = value;
    setFormData({ ...formData, experience: updatedExperience });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          company: "",
          role: "",
          duration: "",
          description: ""
        }
      ]
    });
  };

  const removeExperience = (index) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      experience: updatedExperience.length ? updatedExperience : emptyForm.experience
    });
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      return "Username is required.";
    }

    if (!/^[a-z0-9-]+$/.test(formData.username.trim().toLowerCase())) {
      return "Username can only use lowercase letters, numbers, and hyphens.";
    }

    if (!formData.fullName.trim()) {
      return "Full name is required.";
    }

    if (formData.contact.email && !formData.contact.email.includes("@")) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validateForm();

    if (error) {
      setFormError(error);
      return;
    }

    setFormError("");

    const cleanedData = {
      ...formData,
      username: formData.username.toLowerCase().trim(),
      skills: formData.skills.filter((skill) => skill.trim() !== ""),
      projects: formData.projects
        .filter((project) => project.name.trim() !== "")
        .map((project) => ({
          ...project,
          techStack: project.techStack.filter((tech) => tech.trim() !== "")
        })),
      experience: formData.experience.filter(
        (item) => item.company.trim() !== "" || item.role.trim() !== ""
      )
    };

    onSubmit(cleanedData);
  };

  return (
    <form className="portfolio-form" onSubmit={handleSubmit}>
      <div className="cv-import-box">
        <div>
          <h2>Import from CV</h2>
          <p>
            Upload a PDF CV to auto fill the form, or skip this and enter details
            manually.
          </p>
        </div>

        <label className="cv-upload-label">
          Choose CV PDF
          <input type="file" accept="application/pdf" onChange={handleCvImport} />
        </label>

        {cvImporting && <p className="cv-message">Importing CV...</p>}
        {cvMessage && <p className="cv-message">{cvMessage}</p>}
      </div>

      <div className="cv-import-box">
        <div>
          <h2>Resume Upload</h2>
          <p>
            Upload a resume PDF to Cloudinary, or paste a resume URL manually below.
          </p>
        </div>

        <label className="cv-upload-label">
          Upload Resume PDF
          <input type="file" accept="application/pdf" onChange={handleResumeUpload} />
        </label>

        {resumeUploading && <p className="cv-message">Uploading resume...</p>}
        {resumeMessage && <p className="cv-message">{resumeMessage}</p>}
      </div>

      {formError && <div className="form-error">{formError}</div>}

      <div className="form-section-header">
        <span>01</span>
        <div>
          <h2>Personal Information</h2>
          <p>Add your main portfolio identity and introduction.</p>
        </div>
      </div>

      <div className="form-grid">
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="example: sahiru"
            required
          />
        </div>

        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Your full name"
            required
          />
        </div>

        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Full Stack Developer"
          />
        </div>

        <div>
          <label>Portfolio Theme</label>
          <select name="theme" value={formData.theme} onChange={handleChange}>
            <option value="default">Default Blue</option>
            <option value="dark">Dark Premium</option>
            <option value="minimal">Minimal Light</option>
            <option value="emerald">Emerald</option>
          </select>
        </div>

        <div>
          <label>Profile Image URL</label>
          <input
            type="text"
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
            placeholder="https://placehold.co/150x150"
          />
        </div>

        <div>
          <label>Resume PDF URL</label>
          <input
            type="text"
            name="resumeUrl"
            value={formData.resumeUrl}
            onChange={handleChange}
            placeholder="Paste resume PDF link or upload above"
          />
        </div>
      </div>

      <label>Bio</label>
      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Write a short professional bio"
      />

      <div className="form-section-header">
        <span>02</span>
        <div>
          <h2>Contact Information</h2>
          <p>Add your professional links.</p>
        </div>
      </div>

      <div className="form-grid">
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.contact.email}
            onChange={handleContactChange}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label>LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            value={formData.contact.linkedin}
            onChange={handleContactChange}
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div>
          <label>GitHub</label>
          <input
            type="text"
            name="github"
            value={formData.contact.github}
            onChange={handleContactChange}
            placeholder="https://github.com/username"
          />
        </div>

        <div>
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={formData.contact.website}
            onChange={handleContactChange}
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>

      <div className="form-section-header">
        <span>03</span>
        <div>
          <h2>Skills</h2>
          <p>Add technical and professional skills.</p>
        </div>
      </div>

      {formData.skills.map((skill, index) => (
        <div className="dynamic-row" key={index}>
          <input
            type="text"
            value={skill}
            onChange={(e) => handleSkillChange(index, e.target.value)}
            placeholder="React"
          />

          <button type="button" onClick={() => removeSkill(index)}>
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={addSkill} className="secondary-btn">
        Add Skill
      </button>

      <div className="form-section-header">
        <span>04</span>
        <div>
          <h2>Projects</h2>
          <p>Drag project cards to reorder them.</p>
        </div>
      </div>

      {formData.projects.map((project, projectIndex) => (
        <div
          className="form-card draggable-card"
          key={projectIndex}
          draggable
          onDragStart={(e) => handleProjectDragStart(e, projectIndex)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleProjectDrop(e, projectIndex)}
        >
          <div className="drag-label">Drag to reorder</div>

          <label>Project Name</label>
          <input
            type="text"
            value={project.name}
            onChange={(e) =>
              handleProjectChange(projectIndex, "name", e.target.value)
            }
            placeholder="Project name"
            required
          />

          <label>Description</label>
          <textarea
            value={project.description}
            onChange={(e) =>
              handleProjectChange(projectIndex, "description", e.target.value)
            }
            placeholder="Short project description"
          />

          <label>Tech Stack</label>
          {project.techStack.map((tech, techIndex) => (
            <div className="dynamic-row" key={techIndex}>
              <input
                type="text"
                value={tech}
                onChange={(e) =>
                  handleProjectTechChange(
                    projectIndex,
                    techIndex,
                    e.target.value
                  )
                }
                placeholder="Node.js"
              />

              <button
                type="button"
                onClick={() => removeProjectTech(projectIndex, techIndex)}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addProjectTech(projectIndex)}
            className="small-btn"
          >
            Add Tech
          </button>

          <div className="form-grid">
            <div>
              <label>GitHub Link</label>
              <input
                type="text"
                value={project.githubLink}
                onChange={(e) =>
                  handleProjectChange(projectIndex, "githubLink", e.target.value)
                }
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label>Live Demo</label>
              <input
                type="text"
                value={project.liveDemo}
                onChange={(e) =>
                  handleProjectChange(projectIndex, "liveDemo", e.target.value)
                }
                placeholder="https://..."
              />
            </div>
          </div>

          <button type="button" onClick={() => removeProject(projectIndex)}>
            Remove Project
          </button>
        </div>
      ))}

      <button type="button" onClick={addProject} className="secondary-btn">
        Add Project
      </button>

      <div className="form-section-header">
        <span>05</span>
        <div>
          <h2>Experience</h2>
          <p>Add internships, work experience, or academic project roles.</p>
        </div>
      </div>

      {formData.experience.map((item, index) => (
        <div className="form-card" key={index}>
          <div className="form-grid">
            <div>
              <label>Company</label>
              <input
                type="text"
                value={item.company}
                onChange={(e) =>
                  handleExperienceChange(index, "company", e.target.value)
                }
                placeholder="Company name"
              />
            </div>

            <div>
              <label>Role</label>
              <input
                type="text"
                value={item.role}
                onChange={(e) =>
                  handleExperienceChange(index, "role", e.target.value)
                }
                placeholder="Role title"
              />
            </div>

            <div>
              <label>Duration</label>
              <input
                type="text"
                value={item.duration}
                onChange={(e) =>
                  handleExperienceChange(index, "duration", e.target.value)
                }
                placeholder="2025 to Present"
              />
            </div>
          </div>

          <label>Description</label>
          <textarea
            value={item.description}
            onChange={(e) =>
              handleExperienceChange(index, "description", e.target.value)
            }
            placeholder="What did you do?"
          />

          <button type="button" onClick={() => removeExperience(index)}>
            Remove Experience
          </button>
        </div>
      ))}

      <button type="button" onClick={addExperience} className="secondary-btn">
        Add Experience
      </button>

      <button type="submit" className="primary-btn submit-btn">
        {buttonText}
      </button>
    </form>
  );
}

export default PortfolioForm;
