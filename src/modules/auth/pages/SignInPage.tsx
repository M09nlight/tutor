import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sign-in-up-page.scss";
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Container from "../../../common/components/container/Container";
import About from "../../../common/components/about/About";
import { Input } from "../../../common/components/input/Input";
import Button from "../../../common/components/button/Button";
import { SignInOut } from "../dto/sign-in.out";
import { useAuth } from "../hooks/use-auth";

interface SignInPageProps {}

const SignInPage: FC<SignInPageProps> = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Omit<SignInOut, "device">>({
    mode: "onBlur",
  });
  const onSubmit = (data: Omit<SignInOut, "device">) => {
    signIn(data);
    navigate("/profile");
    reset();
  };

  const updatePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  return (
    <main className="main">
      <Container>
        <div className="blocks">
          <About />
          <div className="form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="form__title">Вход</h2>
              <div className="form__element">
                <label htmlFor="" className="label">
                  Электронная почта
                  <div className="form__error">
                    {errors?.email && (
                      <p>{errors?.email?.message || "Error"}</p>
                    )}
                  </div>
                  <Input
                    placeholder="Электронная почта"
                    type="email"
                    {...register("email", {
                      required: "Required field",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                      },
                    })}
                  />
                </label>
              </div>
              <div className="form__element">
                <label htmlFor="" className="label">
                  Пароль
                  <div className="form__error">
                    {errors?.password && (
                      <p>{errors?.password?.message || "Error"}</p>
                    )}
                  </div>
                  <div className="password-wrapper">
                    <Input
                      placeholder="Пароль"
                      inputType="PASSWORD"
                      type={isPasswordVisible ? "text" : "password"}
                      {...register("password", {
                        required: "Required field",
                        minLength: {
                          value: 5,
                          message: "Minimum is 5 symbols",
                        },
                      })}
                    />
                    <div
                      className="password-wrapper__icon"
                      onClick={updatePasswordVisibility}
                    ></div>
                  </div>
                </label>
              </div>
              <div className="link link--forget">
                <Link to="/">Забыли пароль?</Link>
              </div>
              <Button btnSize="FULL">Войти</Button>
              <div className="no-acc">
                У вас ещё нет аккаунта?
                <Link className="link" to="/sign-up">
                  Зарегистрироваться
                </Link>
              </div>
            </form>
            <div className="alternative-login">
              <div>или</div>
              <div>Войдите с помощью</div>
              <div className="alternative-login__icons">
                <Button btnContext="ICON">
                  <FaFacebookF />
                </Button>
                <Button btnContext="ICON">
                  <FaTwitter />
                </Button>
                <Button btnContext="ICON">
                  <FaGoogle />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default SignInPage;
