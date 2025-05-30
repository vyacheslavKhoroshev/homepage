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

const createElement = ({ tagName, className, attributes = {} }) => {
  const element = document.createElement(tagName);

  if (className) {
    const classNames = className.split(" ").filter(Boolean);
    element.classList.add(...classNames);
  }

  Object.keys(attributes).forEach((key) =>
    element.setAttribute(key, attributes[key])
  );

  return element;
};

const createPanelHeader = ([title1, title2]) => {
  const header = createElement({
    tagName: "div",
    className: "panel__header fh",
  });
  const title1Element = createElement({
    tagName: "h4",
    className: "panel__header-title",
  });
  const title2Element = createElement({
    tagName: "h4",
    className: "panel__header-title",
  });

  title1Element.textContent = title1;
  title2Element.textContent = title2;

  header.appendChild(title1Element);
  header.appendChild(title2Element);

  return header;
};

const createPanelBody = ({
  name,
  period,
  info,
  nameTag = "div",
  descriptionTag = "div",
}) => {
  const wrapper = createElement({
    tagName: "div",
    className: "panel__wrapper fh",
  });
  const nameElement = createElement({
    tagName: nameTag,
    className: "panel__name",
  });
  const descriptionElement = createElement({
    tagName: descriptionTag,
    className: "panel__description",
  });

  nameElement.textContent = name;
  descriptionElement.textContent = info || "";

  if (period) {
    const periodSpan = createElement({
      tagName: "span",
      className: "panel__durability",
    });
    console.log(period);
    periodSpan.textContent = period;
    nameElement.appendChild(periodSpan);
  }

  wrapper.appendChild(nameElement);
  wrapper.appendChild(descriptionElement);

  return wrapper;
};

const createSkillBody = ({ name, info }) => {
  const wrapper = createElement({
    tagName: "div",
    className: "panel__wrapper fh",
  });
  const nameElement = createElement({
    tagName: "div",
    className: "panel__name",
  });
  const levelContainer = createElement({
    tagName: "div",
    className: "skill__level",
  });

  const levelBarContainer = createElement({
    tagName: "div",
    className: "skill__level-bar-container",
  });

  const levelBar = createElement({
    tagName: "div",
    className: "skill__level-bar",
  });
  const levelText = createElement({
    tagName: "span",
    className: "skill__level-text",
  });

  nameElement.textContent = name;
  levelBarContainer.style.width = `${info * 20}%`;
  levelText.textContent = `${info}`;

  levelBarContainer.appendChild(levelBar);
  levelContainer.appendChild(levelBarContainer);
  levelContainer.appendChild(levelText);
  wrapper.appendChild(nameElement);
  wrapper.appendChild(levelContainer);

  return wrapper;
};

const createPanel = (data, titles, skill = false) => {
  const container = createElement({ tagName: "div" });
  const header = createPanelHeader(titles);
  container.appendChild(header);

  data.forEach((item) => {
    const panelItem = skill ? createSkillBody(item) : createPanelBody(item);
    container.appendChild(panelItem);
  });

  return container;
};

const createSocialsLinkIcon = (socials) => {
  const container = createElement({
    tagName: "div",
    className: "social-icons ",
  });

  socials.forEach((contact) => {
    const link = createElement({
      tagName: "a",
      className: "contact-info__item",
    });
    link.href = contact.link;
    link.target = "_blank";

    const icon = createElement({ tagName: "i", className: contact.icon });
    link.appendChild(icon);

    container.appendChild(link);
  });

  return container;
};

const createContactInfo = (contacts) => {
  const container = createElement({
    tagName: "div",
    className: "contact-infomations",
  });

  contacts.forEach((contact) => {
    const item = createElement({
      tagName: "a",
      className: "contact-info__item",
    });

    const icon = createElement({ tagName: "i", className: contact.icon });
    const text = createElement({
      tagName: "span",
      className: "contact-info__text",
    });

    if (contact.link) {
      item.href = contact.link;
      item.target = "_blank";
    }

    text.textContent = contact.text;
    item.appendChild(icon);
    item.appendChild(text);

    container.appendChild(item);
  });

  return container;
};

const loadData = async () => {
  const [
    experiencesData,
    educationData,
    skillsData,
    socialsData,
    contactsData,
  ] = await Promise.all([
    fetchData("assets/data/experiences.json"),
    fetchData("assets/data/educations.json"),
    fetchData("assets/data/skills.json"),
    fetchData("assets/data/socials.json"),
    fetchData("assets/data/contacts.json"),
  ]);

  if (experiencesData) {
    document
      .querySelector(".experiences__panel")
      .appendChild(
        createPanel(experiencesData.experiences, ["Company", "Role"])
      );
  }

  if (educationData) {
    document
      .querySelector(".educations__panel")
      .appendChild(
        createPanel(educationData.educations, ["Place of study", "Speciality"])
      );
  }

  if (skillsData) {
    document
      .querySelector(".skills__panel-soft")
      .appendChild(
        createPanel(skillsData.skills.soft, ["Skill", "Level"], true)
      );
    document
      .querySelector(".skills__panel-technical")
      .appendChild(
        createPanel(skillsData.skills.technical, ["Skill", "Level"], true)
      );
  }

  if (socialsData) {
    document
      .querySelector(".contact-info__block.socials")
      .appendChild(createSocialsLinkIcon(socialsData.socials));
  }

  if (contactsData) {
    document
      .querySelector(".contact-info__block.main")
      .appendChild(createContactInfo(contactsData.contacts));
  }
};

loadData();
