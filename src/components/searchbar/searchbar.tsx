import s from './searchbar.module.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Formik, Form, Field, FormikHelpers } from 'formik';

interface ISearchBarProps { 
  onSubmit: (query: string) => void;
}
interface IFormValues {
  query: string;
}
export default function SearchBar({ onSubmit }: ISearchBarProps) {
  const handleSubmit = (values:IFormValues, actions:FormikHelpers<IFormValues>) => {
    onSubmit(values.query);
    actions.resetForm();
  };
  return (
    <header>
      <Formik<IFormValues> initialValues={{ query: '' }} onSubmit={handleSubmit}>
        <Form className={s.query}>
          <a
            className={s.unsplash_logo}
            href="https://unsplash.com/?utm_source=js_react_gallery&utm_medium=referral"
            target="_blank">
            <svg height="32" width="32">
              <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z" />
            </svg>
          </a>
          <Field
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search photos"
          />
          <button type="submit">
            <FaMagnifyingGlass />
          </button>
        </Form>
      </Formik>
    </header>
  );
}
