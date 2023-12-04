import React, { FC } from "react";
import "./about.scss";

interface aboutProps {}

const About: FC<aboutProps> = ({}) => {
  return (
    <div className="about">
      <h1 className="about-title">
        <span className="about-title--colorized">TUTOR</span> — платформа
        для онлайн-обучения иностранным языкам
      </h1>
      <p className="about-desc about-desc--one">
        Занимайтесь онлайн в удобное время суток из любого места
      </p>
      <p className="about-desc about-desc--two">
        Выбирайте опытных преподавателей со всего мира
      </p>
      <img src="img/img-1.png" alt="" className="about-img" />
    </div>
  );
};

export default About;
