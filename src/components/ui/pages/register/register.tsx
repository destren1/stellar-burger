import { FC, useEffect, useState } from 'react';
import {
  Input,
  Button,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import styles from '../common.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUIProps } from './type';
import { useDispatch } from '../../../../services/store';
import { registerUser } from '../../../../services/slices/userSlice';
import { TRegisterData } from '@api';

export const RegisterUI: FC<RegisterUIProps> = ({
  errorText,
  email,
  setEmail,
  handleSubmit,
  password,
  setPassword,
  userName,
  setUserName
}) => {
  const [buttonState, setButtonState] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegisterData: TRegisterData = {
    email: email,
    name: userName,
    password: password
  };
  const emailRegex = /\w+@\w+\.\w+/gi;

  const handleRegister = () => {
    dispatch(registerUser(userRegisterData));
    navigate(-1);
  };

  const validEmail = (): boolean => emailRegex.test(email);

  useEffect(() => {
    if (userName.length >= 2 && validEmail() && password.length >= 6) {
      setButtonState(false);
    } else {
      setButtonState(true);
    }
  }, [userName, email, password]);

  return (
    <main className={styles.container}>
      <div className={`pt-6 ${styles.wrapCenter}`}>
        <h3 className='pb-6 text text_type_main-medium'>Регистрация</h3>
        <form
          className={`pb-15 ${styles.form}`}
          name='register'
          onSubmit={handleSubmit}
        >
          <>
            <div className='pb-6'>
              <Input
                type='text'
                placeholder='Имя'
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                value={userName}
                name='name'
                error={false}
                errorText=''
                size='default'
              />
            </div>
            <div className='pb-6'>
              <Input
                type='email'
                placeholder='E-mail'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                name={'email'}
                error={false}
                errorText=''
                size={'default'}
              />
            </div>
            <div className='pb-6'>
              <PasswordInput
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                name='password'
              />
            </div>
            <div className={`pb-6 ${styles.button}`}>
              <Button
                type='primary'
                size='medium'
                htmlType='submit'
                onClick={handleRegister}
                disabled={buttonState}
              >
                Зарегистрироваться
              </Button>
            </div>
            {errorText && (
              <p className={`${styles.error} text text_type_main-default pb-6`}>
                {errorText}
              </p>
            )}
          </>
        </form>
        <div className={`${styles.question} text text_type_main-default pb-6`}>
          Уже зарегистрированы?
          <Link to='/login' className={`pl-2 ${styles.link}`}>
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
};
