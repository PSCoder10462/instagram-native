import { SafeAreaView } from 'react-native-safe-area-context';
import AuthForm from '../components/AuthForm';

const AuthScreen = () => {
  return (
    <SafeAreaView>
      <AuthForm />
    </SafeAreaView>
  );
};

export default AuthScreen;
