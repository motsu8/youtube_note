'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import 'swiper/css/bundle';

import Button from '@/components/parts/button';

import { getSession } from './api/supabase';

export default function Landing() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const data = await getSession();
      if (data) router.push('/home');
    })();
  }, []);

  const baseBtnClass = [
    'hover:bg-neutral-50',
    'rounded-lg',
    'px-4',
    'py-2',
    'text-[#F59236]',
    'font-bold',
  ];

  const accentBtnClass = [
    'hover:bg-[#E0822A]',
    'bg-[#F59236]',
    'rounded-lg',
    'px-4',
    'py-2',
    'text-white',
    'font-extrabold',
  ];

  return (
    <div className="font-mono w-screen flex flex-col items-center">
      <div id="header" className="w-full flex justify-around py-3">
        <div className="w-3/4 flex justify-between">
          <div className="flex space-x-3 items-center">
            <Image
              src="/icon.png"
              alt="YouTube Note Icon"
              height={40}
              width={40}
              style={{ objectFit: 'contain' }}
            />
            <p className="text-3xl font-extrabold align-middle">YouTube Note</p>
            <ul className="pl-8 flex text-black font-bold space-x-4">
              <li>プレイリスト</li>
              <li>ノート</li>
            </ul>
          </div>
          <div className="auth">
            <Button
              title="ログイン"
              className={baseBtnClass}
              setClickHandler={() => alert('click')}
            />
            <Button
              title="新規登録"
              className={accentBtnClass}
              setClickHandler={() => alert('click')}
            />
          </div>
        </div>
      </div>

      <div
        id="section-1"
        className="w-full bg-[#FFFBF8] flex justify-center shadow-sm"
      >
        <div className="w-3/4 py-40 flex justify-between">
          <div className="space-y-8">
            <div>
              <p className="text-6xl">エンジニア志向</p>
              <p className="text-6xl">ノート学習アプリ</p>
            </div>
            <p className="w-96">
              YouTube動画を見ながら、マークダウンエディタでノートを取って学習することができます。
            </p>
            <Button
              title="新規登録"
              className={accentBtnClass}
              setClickHandler={() => alert('click')}
            />
          </div>

          <Image
            src="/service.png"
            alt="サービスイメージ"
            height={400}
            width={600}
            style={{
              borderWidth: 2,
              borderRadius: 10,
              boxShadow: '1px 2px 9px #aaaaaa',
            }}
          />
        </div>
      </div>

      <div
        id="section-2"
        className="w-full flex flex-col justify-center items-center space-y-10 py-10 shadow-sm"
      >
        <p className="text-3xl">YouTube動画のURLで追加・検索</p>
        <Image src="/demo.gif" alt="検索イメージ" height={400} width={600} />
      </div>

      <div
        id="section-3"
        className="w-full bg-[#BD3246] py-10 space-y-10 flex flex-col justify-center items-center shadow-sm"
      >
        <p className="text-3xl text-white">エンジニアライクなノートを提供</p>

        <div className="w-3/4 grid grid-cols-2 gap-10">
          <div className="bg-[#FFFBF8] w- py-5 px-5 rounded-tl-3xl rounded-br-3xl">
            <p className="text-xl font-bold">マークダウンエディタ</p>
            <p>
              YouTube動画を見ながら、マークダウン記法でノートをとることができる。
            </p>
          </div>
          <div className="bg-[#FFFBF8] py-5 px-5 rounded-tl-3xl rounded-br-3xl">
            <p className="text-xl font-bold">HTMLプレビュー</p>
            <p>
              GitHubでのスタイルを適用しており、プログラミング言語別でシンタックスハイライトに対応。
            </p>
          </div>
        </div>
      </div>

      <div
        id="section-4"
        className="w-full bg-[#FFFBF8] py-10 space-y-10 flex flex-col justify-center items-center shadow-sm"
      >
        <p className="text-3xl">無料で始める</p>
        <Button
          title="新規登録"
          className={accentBtnClass}
          setClickHandler={() => alert('click')}
        />
      </div>
    </div>
  );
}
