import { ObjectID } from 'typeorm';

export default interface AccessSchema {
  id: string | ObjectID;
  name: string;
}
