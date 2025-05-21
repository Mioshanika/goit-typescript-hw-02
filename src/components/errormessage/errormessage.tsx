interface IErrorMessageProps { 
  message: string;
}

export default function ErrorMessage({ message }: IErrorMessageProps) {
  return <p>{message}</p>;
}
