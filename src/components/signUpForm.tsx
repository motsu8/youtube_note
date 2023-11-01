import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GoogleOauth from './parts/auth';

export default function SignUpForm() {
  return (
    <div className="flex flex-col items-center justify-center shadow-lg space-y-3 py-5 px-3 w-1/5">
      <GoogleOauth />
      <div className="text-3xl my-3">ログイン</div>
      <input
        type="email"
        className="bg-slate-100 px-3 py-1 w-5/6"
        placeholder="メールアドレス"
      />
      <input
        type="password"
        className="bg-slate-100 px-3 py-1 w-5/6"
        placeholder="パスワード"
      />

      <div className="shadow-lg max-w-fit p-3 rounded-xl">
        <FontAwesomeIcon
          icon={faArrowRight}
          className="h-[40px]"
          color="#555555"
        />
      </div>
      <div>ログインできない場合</div>
      <div>新規登録</div>
    </div>
  );
}
