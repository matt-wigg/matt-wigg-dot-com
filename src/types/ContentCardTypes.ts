export interface ContentCardProps {
  show: boolean;
  title: string;
  content: React.ReactNode;
}

export interface ContentCardHeaderProps {
  toggleContentVisibility: () => void;
  contentVisible: boolean;
  title: string;
}
