import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sign-in-up-page.scss";
import { useForm } from "react-hook-form";
import Container from "../../../common/components/container/Container";
import About from "../../../common/components/about/About";
import { Input } from "../../../common/components/input/Input";
import Button from "../../../common/components/button/Button";
import { SingUpOut } from "../dto/sign-up.out";
import Select from "react-select";
import { countries } from "../../../assets/data/countries_RU.data";
import { useAuth } from "../hooks/use-auth";
import { useSelector } from "react-redux";
import { selectApp } from "../app/service/app.slice";

interface SignUp extends Omit<SingUpOut, "device"> {
  confirm_password: string;
}
interface SignUpPageProps {}

const SignUpPage: FC<SignUpPageProps> = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isAgreement, setIsAgreement] = useState<boolean>(false);
  const [userType, setUserType] = useState<number>(0);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const { signUp, loading, error } = useAuth();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<SignUp>({
    mode: "onBlur",
    defaultValues: {
      user_type: "0",
      country: 1,
    },
  });
  const onSubmit = (data: SignUp) => {
    const { confirm_password, ...restData } = data;
    signUp(restData);
  };
  const handleChangeAgreement = () => {
    setIsAgreement((prev) => !prev);
  };

  const updatePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const updateResetPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };
  const updateUserType = (value: number) => {
    setUserType(value);
  };
  return (
    <main className="main">
      <Container>
        <div className="blocks blocks--register">
          <About />
          <div className="form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="form__title">Регистрация</h2>

              <div className="alternative-register">
                <label className="alternative-label">
                  <Input
                    type="radio"
                    inputType="RADIO"
                    value="0"
                    {...register("user_type")}
                    onChange={() => updateUserType(0)}
                  />
                  Ученик
                </label>
                <label className="alternative-label">
                  <Input
                    type="radio"
                    inputType="RADIO"
                    value="1"
                    {...register("user_type")}
                    onChange={() => updateUserType(1)}
                  />
                  Преподаватель
                </label>
              </div>
              <div className="form__element">
                <label className="label">
                  <div className="label-top">
                    Имя
                    <div className="form__error">
                      {errors?.first_name && (
                        <p>{errors?.first_name?.message || "Error"}</p>
                      )}
                    </div>
                  </div>
                  <Input
                    placeholder="Имя"
                    type="text"
                    {...register("first_name", {
                      required: "Required field",
                    })}
                  />
                </label>
              </div>
              <div className="form__element">
                <label className="label">
                  <div className="label-top">
                    Фамилия
                    <div className="form__error">
                      {errors?.last_name && (
                        <p>{errors?.last_name?.message || "Error"}</p>
                      )}
                    </div>
                  </div>
                  <Input
                    placeholder="Фамилия"
                    type="text"
                    {...register("last_name", {
                      required: "Required field",
                    })}
                  />
                </label>
              </div>
              <div className="form__element">
                <label className="label">
                  <div className="label-top">
                    Дата рождения
                    <span className="label-remarks">(необязательно)</span>
                    <div className="form__error">
                      {errors?.date_of_birthday && (
                        <p>{errors?.date_of_birthday?.message || "Error"}</p>
                      )}
                    </div>
                  </div>
                  <Input
                    placeholder="Дата рождения"
                    type="text"
                    {...register("date_of_birthday")}
                  />
                </label>
              </div>
              {!!userType && (
                <div className="form__element">
                  <label className="label">
                    <div className="label-top">
                      Откуда вы?
                      <div className="form__error">
                        {errors?.country && (
                          <p>{errors?.country?.message || "Error"}</p>
                        )}
                      </div>
                    </div>
                    <Select
                      classNamePrefix="custom-select"
                      name="country"
                      options={countries}
                      placeholder="Выберите страну"
                      onChange={(selectedOption) => {
                        setValue(
                          "country",
                          selectedOption ? selectedOption.value : 1
                        );
                      }}
                    />
                  </label>
                </div>
              )}
              <div className="form__element">
                <label className="label">
                  <div className="label-top">
                    Электронная почта
                    <div className="form__error">
                      {errors?.email && (
                        <p>{errors?.email?.message || "Error"}</p>
                      )}
                    </div>
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
                <label className="label">
                  <div className="label-top">
                    Пароль
                    <div className="form__error">
                      {errors?.password && (
                        <p>{errors?.password?.message || "Error"}</p>
                      )}
                    </div>
                  </div>
                  <div className="password-wrapper">
                    <Input
                      placeholder="Пароль"
                      inputType="PASSWORD"
                      type={isPasswordVisible ? "text" : "password"}
                      {...register("password", {
                        required: "Required field",
                        minLength: {
                          value: 8,
                          message: "Password must be 8 <= 32",
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
              <div className="form__element">
                <label className="label">
                  <div className="label-top">
                    Повторите пароль
                    <div className="form__error">
                      {errors?.confirm_password && (
                        <p>{errors?.confirm_password?.message || "Error"}</p>
                      )}
                    </div>
                  </div>
                  <div className="password-wrapper">
                    <Input
                      placeholder="Пароль"
                      inputType="PASSWORD"
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      {...register("confirm_password", {
                        required: "Required field",
                        validate: (val: string) => {
                          if (watch("password") != val) {
                            return "Your passwords do no match";
                          }
                        },
                      })}
                    />
                    <div
                      className="password-wrapper__icon"
                      onClick={updateResetPasswordVisibility}
                    ></div>
                  </div>
                </label>
              </div>
              <div className="link agreement">
                <Input
                  type="checkbox"
                  name="agreement"
                  inputType="CHECKBOX"
                  onChange={handleChangeAgreement}
                />
                <div>
                  Я согласен&nbsp;
                  <Link className="link" to="/">
                    с условиями использования
                  </Link>
                  &nbsp;и&nbsp;
                  <Link className="link" to="/">
                    политикой конфиденциальности
                  </Link>
                </div>
              </div>
              <Button btnSize="FULL" disabled={!isAgreement}>
                Зарегистрироваться
              </Button>
            </form>
            <div className="alternative-login">
              <div>У вас уже есть аккаунт?</div>
              <Link className="link" to="/sign-in">
                Войти
              </Link>
            </div>
            <div className="form__error">{error && <p>{error}</p>}</div>
            <div>{loading && <p>Loading...</p>}</div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default SignUpPage;
