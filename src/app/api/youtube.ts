export default class Youtube {
  public apiKey: string | undefined;

  public clientId: string | undefined;

  public GoogleAuth: any | undefined;

  public gapi: any;

  constructor() {
    this.apiKey = process.env.GOOGLE_API_KEY;
    this.clientId = process.env.GOOGLE_CLIENT_ID;
    this.gapi = (window as any).gapi;
  }

  public signIn() {
    console.log('start signIn');
    this.gapi.load('client:auth2', () => {
      this.gapi.client
        .init({
          clientId: this.clientId,
          scope: 'https://www.googleapis.com/auth/youtube.readonly',
        })
        .then(() => {
          this.GoogleAuth = this.gapi.auth2.getAuthInstance();
          if (this.GoogleAuth.isSignedIn.get()) {
            console.log('ログイン済み');
          } else {
            console.log('未ログイン');
            this.GoogleAuth.signIn();
          }

          const googleUser = this.GoogleAuth.currentUser.get();
          console.log(googleUser);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  public getThumbnail() {
    this.gapi.load('client', () => {
      this.gapi.client.init({ apiKey: this.apiKey });
    });
  }
}
