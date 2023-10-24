import { VideoData } from '@/types/components';

interface Window {
  gapi: any;
}
declare const window: Window;

export default class Youtube {
  public static apiKey: string | undefined =
    process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  public static clientId: string | undefined =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  public static videoUrl: string =
    'https://www.googleapis.com/youtube/v3/videos';

  public static channelUrl: string =
    'https://www.googleapis.com/youtube/v3/channels';

  public static discoveryUrl: string =
    'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';

  public static clientConfig: { apiKey: string | undefined } = {
    apiKey: Youtube.apiKey,
  };

  public static getVideoParams(videoUrl: string) {
    const url = new URL(videoUrl);
    const params = new URLSearchParams(url.search);
    const videoId = params.getAll('v').pop();
    return videoId;
  }

  public static getVideoSnippet(
    videoUrl: string,
    videoDataHooks: (data: VideoData) => void
  ) {
    const videoId = Youtube.getVideoParams(videoUrl);
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
      window.gapi.client.request(videoRequest).execute((res: any) => {
        const resData = res.items[0].snippet;
        const channelRequest = {
          path: this.channelUrl,
          params: {
            part: ['snippet'],
            id: [resData.channelId],
          },
        };
        window.gapi.client.request(channelRequest).execute((response: any) => {
          const data = {
            url: videoUrl,
            channel: resData.channelTitle,
            title: resData.title,
            thumbnails: resData.thumbnails,
            channel_thumbnails: response.items[0].snippet.thumbnails,
          };
          videoDataHooks(data);
        });
      });
    });
  }
}
