export class UserModel {
  constructor(
    public name: string,
    public email: string,
    public location: string,
    public telegram: string,
    public skills: string[],
    public additional: { title: string; isProcessing: boolean }[],
    public aboutMe: string,
    public education: { title: string; content: string }[],
    public certificate: string[],
    public experiences: { title: string; content: string; date: string }[],
    public projects: { title: string; content: string; date?: string }[],
    public image?: any
  ) {
  }
}
