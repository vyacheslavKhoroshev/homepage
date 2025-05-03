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
  nameTag = "h4",
  descriptionTag = "h4",
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

  if (period) {
    const periodSpan = createElement({
      tagName: "span",
      className: "panel__durability",
    });
    periodSpan.textContent = period;
    nameElement.appendChild(periodSpan);
  }

  nameElement.textContent = name;
  descriptionElement.textContent = info || "";

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
    tagName: "h3",
    className: "panel__name",
  });
  const levelContainer = createElement({
    tagName: "div",
    className: "skill__level",
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
  levelBar.style.width = `${info * 20}%`;
  levelText.textContent = `${info}/5`;

  levelContainer.appendChild(levelBar);
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

const loadData = async () => {
  const [experiencesData, educationData, skillsData] = await Promise.all([
    fetchData("assets/data/experiences.json"),
    fetchData("assets/data/educations.json"),
    fetchData("assets/data/skills.json"),
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
};

loadData();
