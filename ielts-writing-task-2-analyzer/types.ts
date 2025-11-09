
export interface EssayStructure {
  introduction: string;
  bodyParagraph1: string;
  bodyParagraph2: string;
  conclusion: string;
}

export interface Analysis {
  questionType: string;
  essayStructure: EssayStructure;
  suggestedVocabulary: string[];
}
