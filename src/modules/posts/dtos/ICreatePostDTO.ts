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
  latitude: number;
  longitude: number;
}

export { ICreatePostDTO };
