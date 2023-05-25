export interface IProps {
  register: any;
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
  handleImageChange: (file) => void;
  onFinishHandler: (data: FieldValues) => Promise<void> | void;
  date: any;
  handleDateChange: any;
  userImage: { name: string; url: string };
}
