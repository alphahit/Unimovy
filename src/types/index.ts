export interface MovieItem {
  id: number;
  poster_path: string;
  title: string;
  name: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type?: string;
  // Add other properties as needed
}

export interface HeaderProps {
  navigation: any; // Consider using a more specific type if possible
  searchPhrase: string;
  setSearchPhrase: React.Dispatch<React.SetStateAction<string>>;
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  isFavoritePage: boolean;
}

