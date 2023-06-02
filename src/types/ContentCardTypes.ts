export interface ContentCardProps {
  show: boolean;
  title: string | React.ReactNode;
  content: React.ReactNode;
}

export interface ContentCardHeaderProps {
  toggleContentVisibility: () => void;
  contentVisible: boolean;
  title: string | React.ReactNode;
}
