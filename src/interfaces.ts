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
     }
   }

export interface RootState {
    selected_locale: string;
  }

// export interface Translations {
//     [key: string]: string
//   }
  
export interface ThisExpressions {
    [key: string]: string
  }
  
 export interface ThisExpressionsTranslations {
     this_expressions: ThisExpressions
   }
  
// export interface TranslationsLocale {
//     en: ThisExpressionsTranslations
//     ru: ThisExpressionsTranslations
//   }