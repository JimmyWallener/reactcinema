export interface IMovie {
  id?: string;
  title: string;
  description: string;
  long_description: string;
  poster?: string;
  link?: string;
  addedAt: Date | string;
  publisher: string;
}
