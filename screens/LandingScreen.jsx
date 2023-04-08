import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../config/firebaseConfig';
// import AuthForm from '../components/AuthForm';
import { endLoading, isLoadingSelector } from '../redux/slices/loaderSlice';
import { userSelector } from '../redux/slices/userSlice';
import AuthScreen from './AuthScreen';
import HomeScreen from './HomeScreen';

const LandingScreen = () => {
  // make the auth listener
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector);
  const user = useSelector(userSelector);
  const navigation = useNavigation();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const docRef = doc(db, 'users', user.uid);

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const { username } = docSnap.data();
            dispatch(signIn({ username, email: user.email, uid: user.uid }));
          } else {
            // docSnap.data() will be undefined in this case
            console.log('No such document!');
          }
        } else {
          // User is signed out
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(endLoading());
      }
    });
  }, []);

  useEffect(() => {
    if (isLoading) return;
    navigation.navigate(user ? 'home' : 'auth');
  }, [isLoading, user]);

  if (isLoading) return <Text> loading... </Text>;
};

export default LandingScreen;
