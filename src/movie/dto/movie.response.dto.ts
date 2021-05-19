export class MovieResponseDto {
  public data: MovieDto;
}

export class MoviePopularResponseDto {
  public data: MoviePopularDto;
}

export class MoviePopularDto {
  public page: number;

  public results: MovieDto[];
}

export class MovieDto {
  public id: number;

  public title: string;

  public release_date: string;

  public poster_path: string;

  public genres: Genre[];

  public production_countries: ProductionCountry[];

  public runtime: number;

  public overview: string;
}

class Genre {
  public id: number;

  public name: string;
}

class ProductionCountry {
  public iso_3166_1: string;
}
