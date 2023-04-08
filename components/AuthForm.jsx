import { useNavigation } from '@react-navigation/native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth, db } from '../config/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/slices/userSlice';

const AuthForm = () => {
  const navigation = useNavigation();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const pattern = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$';
    if (!email.match(pattern)) {
      alert('Invalid email id');
      return;
    }
    if (password.length < 4) {
      alert('Password must be atleast 4 character long');
      return;
    }
    try {
      if (isSignIn) {
        const userCredentail = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const { user } = userCredentail;

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
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(db, 'users', user.uid), {
          username,
        });
        dispatch(signIn({ username, email: user.email, uid: user.uid }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <View style={{ margin: 15 }}>
        <Text> {isSignIn ? 'Sign In' : 'Sign Up'}</Text>
        {!isSignIn && (
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder='your name'
          />
        )}
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder='you@gmail.com'
          keyboardType='email-address'
          textContentType='emailAddress'
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder='password'
        />
        <Button
          title={isSignIn ? 'Sign In' : 'Sign Up'}
          onPress={handleSubmit}
        />
      </View>
      <Button
        title={!isSignIn ? 'Sign In' : 'Sign Up'}
        onPress={() => setIsSignIn((prevIsSignIn) => !prevIsSignIn)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default AuthForm;
