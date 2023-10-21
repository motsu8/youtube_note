import { VideoData } from '@/types/components';

export default class Youtube {
  public static apiKey: string | undefined =
    process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  public static clientId: string | undefined =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  public static videoUrl: string =
    'https://www.googleapis.com/youtube/v3/videos';

  public static discoveryUrl: string =
    'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';

  public static clientConfig: { apiKey: string | undefined } = {
    apiKey: Youtube.apiKey,
  };

  public static getVideoSnippet(
    videoUrl: string,
    videoDataHooks: (data: VideoData) => void
  ) {
    const url = new URL(videoUrl);
    const params = new URLSearchParams(url.search);
    const videoId = params.getAll('v').pop();

    const videoRequest = {
      path: this.videoUrl,
      params: {
        part: ['snippet'],
        id: [videoId],
      },
    };

    window.gapi.load('client', () => {
      window.gapi.client.load(Youtube.discoveryUrl);
      window.gapi.client.init(Youtube.clientConfig);
      window.gapi.client.request(videoRequest).execute((res) => {
        console.log(res.items[0]);
        const resData = res.items[0].snippet;
        const data = {
          channel: resData.channelTitle,
          title: resData.title,
          thumbnails: resData.thumbnails,
        };
        videoDataHooks(data);
      });
    });
  }
}