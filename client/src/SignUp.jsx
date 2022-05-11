import { useEffect, useRef, useState } from 'react';
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseAuth } from './firebase';

export function SignUp() {
  const [recaptcha, setRecaptcha] = useState(null);
  const element = useRef(null);

  useEffect(() => {
    if (!recaptcha) {
      const verifier = new firebase.auth.RecaptchaVerifier(element.current, {
        size: 'invisible',
      });

      verifier.verify().then(() => setRecaptcha(verifier));
    }
  }, []);

  return (
    <>
      {recaptcha && <PhoneNumberVerification recaptcha={recaptcha} />}
      <div ref={element}></div>
    </>
  );
}

function PhoneNumberVerification({ recaptcha }) {
  const [digits, setDigits] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [code, setCode] = useState('');

  const phoneNumber = digits;

  // Step 2 - Sign in
  const signInWithPhoneNumber = async () => {
    setConfirmationResult(await firebase.auth().signInWithPhoneNumber(phoneNumber, recaptcha));
  };

  // Step 3 - Verify SMS code
  const verifyCode = async () => {
    const result = await confirmationResult.confirm(code);
  };

  return (
    <div>
      <h1>Sign Up!</h1>
      <fieldset>
        <input value={digits} onChange={(e) => setDigits(e.target.value)} />

        <button onClick={signInWithPhoneNumber}>Sign In</button>
      </fieldset>

      {confirmationResult && (
        <fieldset>
          <label>Verify code</label>
          <br />
          <input value={code} onChange={(e) => setCode(e.target.value)} />

          <button onClick={verifyCode}>Verify Code</button>
        </fieldset>
      )}
    </div>
  );
}
