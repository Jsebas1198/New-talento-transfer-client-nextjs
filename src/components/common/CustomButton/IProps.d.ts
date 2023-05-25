export interface IProps {
  type?: string;
  title: string;
  backgroundColor: string;
  color: string;
  fullWidth?: boolean;
  disabled?: boolean;
  handleClick?: () => void;
}
