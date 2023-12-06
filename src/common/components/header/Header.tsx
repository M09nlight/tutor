import clsx from "clsx";
import { FC, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "../container/Container";
import "./header.scss";
import Button from "../button/Button";
import { useAuth } from "../../../modules/auth/hooks/use-auth";
interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const { isLoggedIn, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const headerClasses = clsx("header", {
    "menu-open": isMenuOpen,
  });
  function menuOpen() {
    setIsMenuOpen((prev) => !prev);
  }

  return (
    <header className={headerClasses}>
      <Container>
        <div className="header__inner">
          <div className="header__left">
            <Link className="header-logo" to="/">
              <img src="img/logo-blue.svg" alt="" />
            </Link>
            <div className="header__menu menu">
              <nav className="menu__body">
                <ul className="menu__list">
                  <li className="menu__item">
                    <NavLink className="menu__link" to="/">
                      Найти преподавателя
                    </NavLink>
                  </li>
                  <li className="menu__item">
                    <NavLink className="menu__link" to="/">
                      Стать преподавателем
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="header__right">
            <span className="select-lang">RU</span>
            <div className="auth-btns">
              {!isLoggedIn ? (
                <>
                  <div>
                    <NavLink to="/sign-in">
                      <Button btnBg={"LIGHT"}>Войти</Button>
                    </NavLink>
                  </div>
                  <div>
                    <NavLink to="/sign-up">
                      <Button>Зарегистироваться</Button>
                    </NavLink>
                  </div>
                </>
              ) : (
                <div>
                  <Button btnBg={"LIGHT"} onClick={logOut}>
                    Выйти
                  </Button>
                </div>
              )}
            </div>
            <button type="button" className="icon-menu" onClick={menuOpen}>
              <span></span>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
