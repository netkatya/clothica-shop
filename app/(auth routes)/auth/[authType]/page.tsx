import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import LoginForm from '@/components/LoginForm/LoginForm';

type Props = {
  params: Promise<{ authType: 'register' | 'login' }>;
};

const AuthPage = async ({ params }: Props) => {
  const { authType } = await params;

  return (
    <>
      <section className="container">
        {authType === 'register' ? (
          <RegistrationForm authType={authType} />
        ) : (
          <LoginForm authType={authType} />
        )}
      </section>
    </>
  );
};

export default AuthPage;
