interface ICreatePostDTO {
  id?: string;
  title: string;
  description: string;
  author_id: string;
  state?: string;
  city?: string;
  district?: string;
  street?: string;
  number?: number;
  picture?: string;
  video?: string;
  latitude: number;
  longitude: number;
}

export { ICreatePostDTO };
