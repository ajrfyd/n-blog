export type Tags = {
  id: string;
  label: string;
};

export type PostType = {
  id: string;
  title: string;
  body: string;
  tags: Tags[];
  createdAt: Date;
};