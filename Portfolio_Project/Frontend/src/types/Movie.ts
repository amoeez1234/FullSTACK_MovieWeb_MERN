export interface Movie {
  id: string;
  title: string;
  rating: number;
  description: string;
  poster: string;
  year: number;
  genre: string[];
  duration: string;
  downloadLink: string;
  size: string;
  quality: string;
}

export interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}