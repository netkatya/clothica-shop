import { Field, FieldProps } from 'formik';
import css from './TextField.module.css';

type Props = {
  name: string;
  id?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

export const TextField = ({
  name,
  id,
  type = 'text',
  placeholder,
  required,
}: Props) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps<string>) => {
        const hasError = form.touched[name] && form.errors[name];

        return (
          <>
            <input
              {...field}
              id={id || name}
              type={type}
              placeholder={placeholder}
              required={required}
              className={`${css.input} ${hasError ? css.inputError : ''}`}
            />
          </>
        );
      }}
    </Field>
  );
};
