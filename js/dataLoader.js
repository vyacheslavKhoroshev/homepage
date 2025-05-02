const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const createExperiencesHTML = (experiences) => {
  return experiences
    .map(
      (exp) =>
        `<div class="experiences__company-header">
          <span class="experiences__company-header-durability">${exp.period}</span>
          <h3 class="experiences__company-header-company">${exp.company}</h3>
          <h2 class="experiences__company-header-role">${exp.role}</h2>
        </div>`
    )
    .join("");
};

const createEducationsHTML = (educations) => {
  return educations
    .map(
      (edu) =>
        `<div class="educations__company-header">
          <span class="education-durability">${edu.period}</span>
          <h3 class="education-name">${edu.university}</h3>
          <h2 class="education-speciality">${edu.speciality}</h2>
        </div>`
    )
    .join("");
};

const createSkillsHTML = (skills) => {
  return skills.soft
    .map(
      (skill) =>
        `<div class="experiences__company-header">
          <span class="skill-name">${skill.name}</span>
          <h3 class="skill-level">${skill.level}</h3>
        </div>`
    )
    .join("");
};

/*const createContactHTML = (contact) => {
  return `
    <div class="contact-info__header">
      <h1>${contact.name}</h1>
    </div>
    <div class="contact-info__sub-header">
      <h2>${contact.position}</h2>
    </div>
    <div class="contact-info__block">
      <div class="contact-info__item">
        <span class="contact-info__item-icon-wrapper">
          <svg class="contact-info__item-icon" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </span>
        <span>${contact.email}</span>
      </div>
      <div class="contact-info__item">
        <span class="contact-info__item-icon-wrapper">
          <svg class="contact-info__item-icon" viewBox="0 0 24 24">
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
          </svg>
        </span>
        <span>${contact.phone}</span>
      </div>
      <div class="contact-info__item">
        <span class="contact-info__item-icon-wrapper">
          <svg class="contact-info__item-icon" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </span>
        <span>${contact.location}</span>
      </div>
    </div>
  `;
};*/

const loadData = async () => {
  const experiencesData = await fetchData("assets/data/experiences.json");
  const educationData = await fetchData("assets/data/educations.json");
  const skillsData = await fetchData("assets/data/skills.json");
  //const contactData = await fetchData("assets/data/contact.json");

  if (experiencesData) {
    document.querySelector(".experiences__container").innerHTML =
      createExperiencesHTML(experiencesData.experiences);
  }

  if (educationData) {
    document.querySelector(".educations__container").innerHTML =
      createEducationsHTML(educationData.educations);
  }

  if (skillsData) {
    document.querySelector(".skills__container").innerHTML = createSkillsHTML(
      skillsData.skills
    );
  }
  /*if (contactData) {
    document.querySelector(".contact-info").innerHTML = createContactHTML(
      contactData.contact
    );
  }
 */
};

// Load data when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadData);
