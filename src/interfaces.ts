export interface UserName {
    first: string;
    last: string;
  }

  export interface User {
    _id: string;
    name: UserName;
  }

  export interface CatFact {
    _id: string;
    __v: number;
    updatedAt: DataTransfer;
    deleted: boolean;
    source: string;
    text: string;
    type: string;
    user: User;
  }

  export interface Translations {
    [key: string]: {
      this_expressions: { [key: string]: string };
    };
  }