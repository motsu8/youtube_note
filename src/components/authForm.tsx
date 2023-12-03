import {
  faArrowRight,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

import { signInWithEmail, signUpNewUser } from '@/app/api/supabase';
import { AUTH_SIGN_IN, AUTH_SIGN_UP } from '@/constants/lp';

import GoogleOauth from './parts/auth';
import IconButton from './parts/iconButton';

export default function AuthForm({
  type,
  title,
}: {
  type: string;
  title: string;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const emailRegex =
    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$/;

  const validation = (regex: RegExp, content: string): boolean => {
    return regex.test(content);
  };

  const validationCheck = () => {
    return validation(passwordRegex, password) && validation(emailRegex, email);
  };

  const bgClass = [
    'p-2',
    'rounded-lg',
    'border',
    validationCheck() ? 'bg-rose-300' : 'bg-neutral-50',
  ];

  const eyeClass = ['absolute', 'end-1', 'top-1/2', '-translate-y-1/2'];

  return (
    <div className="flex flex-col justify-around items-center h-full">
      <p className="text-2xl font-bold">{title}</p>

      {/* email */}
      <div className="w-5/6">
        <input
          type="email"
          className="bg-slate-100 px-3 py-1 w-full"
          placeholder="メールアドレス"
          onChange={(e) => setEmail(e.target.value)}
        />
        {validation(emailRegex, email) ? (
          <p />
        ) : (
          <p className="text-accent text-xs">
            有効なメールアドレスを入力してください
          </p>
        )}
      </div>

      {/* password */}
      <div className="w-5/6">
        <div className="relative">
          <input
            type={showPass ? 'text' : 'password'}
            className="bg-slate-100 px-3 py-1 w-full"
            placeholder="パスワード"
            onChange={(e) => setPassword(e.target.value)}
          />
          <IconButton
            icon={showPass ? faEyeSlash : faEye}
            bgClass={eyeClass}
            color="#bbbbbb"
            iconClass="h-[20px]"
            setClickHandler={() => {
              setShowPass(!showPass);
            }}
          />
        </div>
        {validation(passwordRegex, password) ? (
          <p />
        ) : (
          <p className="text-accent text-xs">
            大文字・小文字・数字を使用した8~16字
          </p>
        )}
      </div>

      <IconButton
        icon={faArrowRight}
        bgClass={bgClass}
        color={validationCheck() ? '#ffffff' : '#bbbbbb'}
        iconClass="h-[40px]"
        isDisabled={!validationCheck()}
        setClickHandler={async () => {
          let loginData;
          if (type === AUTH_SIGN_IN) {
            loginData = await signInWithEmail(email, password);
            if (loginData.session !== null) window.location.href = '/home';
          } else if (type === AUTH_SIGN_UP) {
            loginData = await signUpNewUser(email, password);
            alert('登録完了メールを確認してください。');
          }
        }}
      />

      <GoogleOauth />
    </div>
  );
}
