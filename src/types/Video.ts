export interface VideoProps {
  src: string;
  title: string;
  tag: string;
  poster: string;
  onOpen: () => void;
}