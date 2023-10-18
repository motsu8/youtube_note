'use client';

import React, { useEffect } from 'react';

import Youtube from '@/app/api/youtube';
import { SupabaseSession } from '@/types/components';

function YoutubeApi({ session }: SupabaseSession) {
  // const getUrl = 'https://www.googleapis.com/youtube/v3/videos';
  const videoId = 'eqjamjFU80Y';
  // const videoRequest = {
  //   path: getUrl,
  //   params: {
  //     part: ['snippet'],
  //     id: [videoId],
  //   },
  // };
  // const clientConfig = {
  //   apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  // };

  useEffect(() => {
    // window.gapi.load('client', () => {
    //   window.gapi.client.load(
    //     'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
    //   );
    //   window.gapi.client.init(clientConfig);
    //   window.gapi.client.setToken(session?.provider_token);
    //   window.gapi.client
    //     .request(videoRequest)
    //     .execute((res) => console.log(res));
    // });
    Youtube.getVideoSnippet(videoId);
  }, []);

  return <div className="bg-stone-100 space-x-3">youtube</div>;
}

export default YoutubeApi;
