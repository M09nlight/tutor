import { FC } from "react";
import { Link } from "react-router-dom";
import Container from "../container/Container";
import "./footer.scss";
import Toggle from "../toggle/Toggle";

interface HeaderProps {}

const Footer: FC<HeaderProps> = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__inner">
          <div className="footer__logo">
            <Link to="/" className="logo--white">
              <img src="img/logo-white.svg" alt="" />
            </Link>
          </div>
          <div className="footer__links">
            <div className="footer-list">
              <Toggle defaultState={false} titleName="О компании">
                <ul className="">
                  <li className="footer-list__item">
                    <Link to="/">О нас</Link>
                  </li>
                  <li className="footer-list__item">
                    <Link to="/">Найти репетитора</Link>
                  </li>
                  <li className="footer-list__item">
                    <Link to="/">Стать преподавателем</Link>
                  </li>
                  <li className="footer-list__item">
                    <Link to="/">Задать вопрос</Link>
                  </li>
                </ul>
              </Toggle>
            </div>
            <div className="footer-list">
              <Toggle defaultState={false} titleName="Преподаватели">
                <div className="footer-list__columns">
                  <ul className="footer-list__column-left ">
                    <li className="footer-list__item">
                      <Link to="/">Английского</Link>
                    </li>
                    <li className="footer-list__item">
                      <Link to="/">Испанского </Link>
                    </li>
                    <li className="footer-list__item">
                      <Link to="/">Немецкого </Link>
                    </li>
                    <li className="footer-list__item">
                      <Link to="/">Китайского</Link>
                    </li>
                    <li className="footer-list__item">
                      <Link to="/">Русского</Link>
                    </li>
                  </ul>
                  <ul className="footer-list__column-right">
                    <li className="footer-list__item">
                      <Link to="/">Португальского</Link>
                    </li>
                    <li className="footer-list__item">
                      <Link to="/">Иврита</Link>
                    </li>
                    <li className="footer-list__item">
                      <Link to="/">Японского</Link>
                    </li>
                    <li className="footer-list__item">
                      <Link to="/">Греческого</Link>
                    </li>
                    <li className="footer-list__item">
                      <Link to="/">Арабского</Link>
                    </li>
                    <li className="footer-list__item extend">
                      <Link to="/">Еще</Link>
                    </li>
                  </ul>
                </div>
              </Toggle>
            </div>
            <div className="footer-list">
              <h2 className="footer-list__title">Связаться с нами</h2>
              <ul>
                <li className="footer-list__item">
                  <a href="mailto:asktutor24@gmail.com">asktutor24@gmail.com</a>
                </li>
              </ul>
            </div>
            <Link className="footer-bottom-link" to="/">
              Условия использования
            </Link>
            <Link className="footer-bottom-link" to="/">
              Политика конфиденциальности
            </Link>
            <Link className="footer-bottom-link" to="/">
              © 2021–2022 All rights reserved
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
