import { useEffect, useRef, useState } from 'react';
import firebase from 'firebase/compat/app';
import { Controller, useForm } from 'react-hook-form';
import { firebaseAuth } from '../firebase';
import Logo from '../assets/logo.svg';

export function SignUp() {
  const [recaptcha, setRecaptcha] = useState(null);
  const captchaElement = useRef(null);

  useEffect(() => {
    if (!recaptcha) {
      const verifier = new firebase.auth.RecaptchaVerifier(captchaElement.current, {
        size: 'invisible',
      });

      verifier.verify().then(() => setRecaptcha(verifier));
    }
  }, []);

  return (
    <>
      {recaptcha && <PhoneNumberVerification recaptcha={recaptcha} />}
      <div ref={captchaElement}></div>
    </>
  );
}

function PhoneNumberVerification({ recaptcha }) {
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [code, setCode] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
    control,
  } = useForm({});

  const phoneNumber = watch('phone');
  const otp = watch('otp');

  // Step 2 - Sign in
  const signInWithPhoneNumber = async () => {
    console.log({ phoneNumber });
    setConfirmationResult(await firebase.auth().signInWithPhoneNumber(phoneNumber, recaptcha));
  };

  // Step 3 - Verify SMS code
  const verifyCode = async () => {
    return confirmationResult.confirm(otp);
  };

  return (
    <div>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-12 w-auto" src={Logo} alt="ink" />
        </div>

        <form
          className="mt-8 sm:mx-auto  sm:max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              {!confirmationResult && (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Номер телефона
                  </label>
                  <div className="mt-1">
                    <input
                      type="phone"
                      {...register('phone')}
                      autoComplete="phone"
                      required
                      className="appearance-none block  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <button
                    className="mt-3 inline-flex items-center mb-2.5 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-50 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={signInWithPhoneNumber}
                    type="submit"
                  >
                    Отправить код
                  </button>
                </div>
              )}

              {confirmationResult && (
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    Код
                  </label>
                  <div className="mt-1">
                    <input
                      type="numeric"
                      {...register('otp')}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <button
                    className="mt-3 inline-flex items-center mb-2.5 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-50 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={verifyCode}
                    type="submit"
                  >
                    Логин
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
