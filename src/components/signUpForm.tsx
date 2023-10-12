import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GoogleOauth from './auth';

export default function SignUpForm() {
  return (
    <div className="flex flex-col items-center shadow-lg space-y-3 p-3 max-w-fit">
      <div className="text-3xl my-3">ログイン</div>
      <div>
        <input
          type="email"
          className="bg-slate-100 px-3 py-1"
          placeholder="メールアドレス"
        />
      </div>
      <div>
        <input
          type="password"
          className="bg-slate-100 px-3 py-1"
          placeholder="パスワード"
        />
      </div>

      <GoogleOauth />

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
