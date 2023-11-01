import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

import GoogleOauth from './parts/auth';
import IconButton from './parts/iconButton';

export default function SignUpForm() {
  const [toggle, setToggle] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFilled = email !== '' && password !== '';

  const bgClass = [
    'p-2',
    'rounded-lg',
    'border',
    isFilled ? 'bg-rose-300' : 'bg-neutral-50',
  ];

  const emailRegex =
    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$/;

  const validation = (regex: RegExp, content: string) => {
    return regex.test(content);
  };

  return (
    <div className="flex flex-col items-center justify-center shadow-lg space-y-3 py-5 px-3 w-1/5">
      <GoogleOauth />

      <div className="flex space-x-8">
        <button
          type="button"
          className={`text-xl my-3 px-3 py-1 ${
            toggle === 0 ? 'border-b-2' : ''
          }`}
          onClick={() => setToggle(0)}
        >
          ログイン
        </button>
        <button
          type="button"
          className={`text-xl my-3 px-3 py-1 ${
            toggle === 1 ? 'border-b-2' : ''
          }`}
          onClick={() => setToggle(1)}
        >
          新規登録
        </button>
      </div>

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
          <p className="text-red-100 text-xs">
            有効なメールアドレスを入力してください
          </p>
        )}
      </div>

      {/* password */}
      <div className="w-5/6">
        <input
          type="password"
          className="bg-slate-100 px-3 py-1 w-full"
          placeholder="パスワード"
          onChange={(e) => setPassword(e.target.value)}
        />
        {validation(passwordRegex, password) ? (
          <p />
        ) : (
          <p className="text-red-100 text-xs">
            大文字・小文字・数字を使用した8~16字
          </p>
        )}
      </div>

      <IconButton
        icon={faArrowRight}
        bgClass={bgClass}
        color={isFilled ? '#ffffff' : '#bbbbbb'}
        iconClass="h-[40px]"
        isDisabled={!isFilled}
        setClickHandler={() => {
          alert('login');
        }}
      />
    </div>
  );
}
