export type TagType = {
  value: string;
  label: string;
};

export type ServerTagType = {
  id: string;
  label: string;
};

export type PostType = {
  id: string;
  title: string;
  body: string;
  tags: ServerTagType[];
  createdAt: Date;
};

