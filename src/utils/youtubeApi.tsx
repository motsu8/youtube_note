'use client';

import React, { useEffect } from 'react';

import { SupabaseSession } from '@/types/components';

function YoutubeApi({ session }: SupabaseSession) {
  const getUrl = 'https://www.googleapis.com/youtube/v3/videos';
  const videoId = 'eqjamjFU80Y';
  const videoRequest = {
    path: getUrl,
    params: {
      part: ['snippet'],
      id: [videoId],
    },
  };
  const clientConfig = {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
  };

  useEffect(() => {
    window.gapi.load('client', () => {
      window.gapi.client.load(
        'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
      );
      window.gapi.client.init(clientConfig);
      window.gapi.client.setToken(session?.provider_token);
      window.gapi.client
        .request(videoRequest)
        .execute((res) => console.log(res));
    });
  }, []);

  return <div className="bg-stone-100 space-x-3">youtube</div>;
}

export default YoutubeApi;
