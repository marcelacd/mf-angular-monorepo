export interface IResponseAnime {
  data: Datum[];
}

interface Data {
  name: string;
  url: string;
}

interface Datum {
  mal_id: number;
  url: string;
  images: Images;
  title: string;
  status: string;
  synopsis?: string;
}

interface Images {
  jpg: image_url
}

interface image_url {
  image_url: string
}







