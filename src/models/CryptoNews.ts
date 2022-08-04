export default interface CryptoNews {
  name: string;
  url: string;
  image: Image;
  description: string;
  about: About[];
  mentions: Mention[];
  provider: Provider[];
  datePublished: Date;
  category: string;
}

export interface Thumbnail {
  contentUrl: string;
  width: number;
  height: number;
}

export interface Image {
  thumbnail: Thumbnail;
}

export interface About {
  readLink: string;
  name: string;
}

export interface Mention {
  name: string;
}

export interface Thumbnail2 {
  contentUrl: string;
}

export interface Image2 {
  thumbnail: Thumbnail2;
}

export interface Provider {
  name: string;
  image: Image2;
}
