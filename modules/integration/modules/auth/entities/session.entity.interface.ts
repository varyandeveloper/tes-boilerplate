export default interface Session {
  id: string;
  dateCreated: number;
  username: string;
  issued: number;
  expires: number;
}
