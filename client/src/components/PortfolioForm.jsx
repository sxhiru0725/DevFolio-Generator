import { useState } from "react";

function PortfolioForm({ initialData, onSubmit, buttonText }) {
    const [formData, setFormData] = useState(
        initialData || {
            username: "",
            fullName: "",
            title: "",
            bio: "",
            profileImage: "",
            contact: {
                email: "",
                linkedin: "",
                github: "",
                website: "",
            },
            skills: [""],
            projects: [
                {
                    name: "",
                    description: "",
                    techStack: [""],
                    githubLink: "",
                    liveDemo: "",
                },
            ],
            experience: [
                {
                    company: "",
                    role: "",
                    duration: "",
                    description: "",
                },
            ],
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            contact: {
                ...formData.contact,
                [name]: value,
            },
        });
    };

    const handleSkillChange = (index, value) => {
        const updatedSkills = [...formData.skills];
        updatedSkills[index] = value;

        setFormData({
            ...formData,
            skills: updatedSkills,
        });
    };

    const addSkill = () => {
        setFormData({
            ...formData,
            skills: [...formData.skills, ""],
        });
    };

    const removeSkill = (index) => {
        const updatedSkills = formData.skills.filter((_, i) => i !== index);

        setFormData({
            ...formData,
            skills: updatedSkills,
        });
    };

    const handleProjectChange = (index, field, value) => {
        const updatedProjects = [...formData.projects];
        updatedProjects[index][field] = value;

        setFormData({
            ...formData,
            projects: updatedProjects,
        });
    };

    const handleProjectTechChange = (projectIndex, techIndex, value) => {
        const updatedProjects = [...formData.projects];
        updatedProjects[projectIndex].techStack[techIndex] = value;

        setFormData({
            ...formData,
            projects: updatedProjects,
        });
    };

    const addProjectTech = (projectIndex) => {
        const updatedProjects = [...formData.projects];
        updatedProjects[projectIndex].techStack.push("");

        setFormData({
            ...formData,
            projects: updatedProjects,
        });
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
                    liveDemo: "",
                },
            ],
        });
    };

    const removeProject = (index) => {
        const updatedProjects = formData.projects.filter((_, i) => i !== index);

        setFormData({
            ...formData,
            projects: updatedProjects,
        });
    };

    const handleExperienceChange = (index, field, value) => {
        const updatedExperience = [...formData.experience];
        updatedExperience[index][field] = value;

        setFormData({
            ...formData,
            experience: updatedExperience,
        });
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
                    description: "",
                },
            ],
        });
    };

    const removeExperience = (index) => {
        const updatedExperience = formData.experience.filter((_, i) => i !== index);

        setFormData({
            ...formData,
            experience: updatedExperience,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const cleanedData = {
            ...formData,
            username: formData.username.toLowerCase().trim(),
            skills: formData.skills.filter((skill) => skill.trim() !== ""),
            projects: formData.projects.map((project) => ({
                ...project,
                techStack: project.techStack.filter((tech) => tech.trim() !== ""),
            })),
        };

        onSubmit(cleanedData);
    };

    return (
        <form className="portfolio-form" onSubmit={handleSubmit}>
            <h2>Personal Information</h2>

            <label>Username</label>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="example: sahiru"
                required
            />

            <label>Full Name</label>
            <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                required
            />

            <label>Title</label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Full Stack Developer"
            />

            <label>Profile Image URL</label>
            <input
                type="text"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
            />

            <label>Bio</label>
            <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Write a short bio"
            />

            <h2>Contact Information</h2>

            <label>Email</label>
            <input
                type="email"
                name="email"
                value={formData.contact.email}
                onChange={handleContactChange}
            />

            <label>LinkedIn</label>
            <input
                type="text"
                name="linkedin"
                value={formData.contact.linkedin}
                onChange={handleContactChange}
            />

            <label>GitHub</label>
            <input
                type="text"
                name="github"
                value={formData.contact.github}
                onChange={handleContactChange}
            />

            <label>Website</label>
            <input
                type="text"
                name="website"
                value={formData.contact.website}
                onChange={handleContactChange}
            />

            <h2>Skills</h2>

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

            <h2>Projects</h2>

            {formData.projects.map((project, projectIndex) => (
                <div className="form-card" key={projectIndex}>
                    <label>Project Name</label>
                    <input
                        type="text"
                        value={project.name}
                        onChange={(e) =>
                            handleProjectChange(projectIndex, "name", e.target.value)
                        }
                        required
                    />

                    <label>Description</label>
                    <textarea
                        value={project.description}
                        onChange={(e) =>
                            handleProjectChange(projectIndex, "description", e.target.value)
                        }
                    />

                    <label>Tech Stack</label>
                    {project.techStack.map((tech, techIndex) => (
                        <input
                            key={techIndex}
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
                    ))}

                    <button
                        type="button"
                        onClick={() => addProjectTech(projectIndex)}
                        className="small-btn"
                    >
                        Add Tech
                    </button>

                    <label>GitHub Link</label>
                    <input
                        type="text"
                        value={project.githubLink}
                        onChange={(e) =>
                            handleProjectChange(projectIndex, "githubLink", e.target.value)
                        }
                    />

                    <label>Live Demo</label>
                    <input
                        type="text"
                        value={project.liveDemo}
                        onChange={(e) =>
                            handleProjectChange(projectIndex, "liveDemo", e.target.value)
                        }
                    />

                    <button type="button" onClick={() => removeProject(projectIndex)}>
                        Remove Project
                    </button>
                </div>
            ))}

            <button type="button" onClick={addProject} className="secondary-btn">
                Add Project
            </button>

            <h2>Experience</h2>

            {formData.experience.map((item, index) => (
                <div className="form-card" key={index}>
                    <label>Company</label>
                    <input
                        type="text"
                        value={item.company}
                        onChange={(e) =>
                            handleExperienceChange(index, "company", e.target.value)
                        }
                    />

                    <label>Role</label>
                    <input
                        type="text"
                        value={item.role}
                        onChange={(e) =>
                            handleExperienceChange(index, "role", e.target.value)
                        }
                    />

                    <label>Duration</label>
                    <input
                        type="text"
                        value={item.duration}
                        onChange={(e) =>
                            handleExperienceChange(index, "duration", e.target.value)
                        }
                    />

                    <label>Description</label>
                    <textarea
                        value={item.description}
                        onChange={(e) =>
                            handleExperienceChange(index, "description", e.target.value)
                        }
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