import './PasswordGenerator.css'
import { useState, useRef, useEffect } from 'react'
import Settings from './Settings'
import typingSound from '../assets/typing-sound.mp3'
import PasswordStrengthBar from 'react-password-strength-bar';
import { FaRegCopy } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PasswordGenerator() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [passwordLength, setPasswordLength] = useState(12); // Default password length is 12
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const passwordInputRef = useRef(null);
  const typingSoundRef = useRef(new Audio(typingSound));

  const validChars =
    (includeUppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '') +
    (includeLowercase ? 'abcdefghijklmnopqrstuvwxyz' : '') +
    (includeNumbers ? '0123456789' : '') +
    (includeSymbols ? '!@#$%^&*()_+{}|:"<>?-=[];,./' : '');

  useEffect(() => {
    if (isGenerating) {
      setIsSettingsOpen(false);
      let generatedPassword = '';
      let currentIndex = 0;
      const interval = setInterval(() => {
        generatedPassword += validChars[Math.floor(Math.random() * validChars.length)];
        setGeneratedPassword(generatedPassword);
        typingSoundRef.current.play();
        currentIndex++;
        if (currentIndex === passwordLength) {
          setIsGenerating(false);
          setGeneratedPassword(generatedPassword);
          clearInterval(interval);
          typingSoundRef.current.pause();
          typingSoundRef.current.currentTime = 0;
        }
      }, 30);
    }
  }, [isGenerating, passwordLength, validChars]);

  const copyToClipboard = () => {
    passwordInputRef.current.select();
    document.execCommand('copy');
    if (generatedPassword.length > 0) {
      toast.success('Password copied to clipboard!')

    }
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+{}|:"<>?-=[];,./';
    let validChars = '';
    if (includeUppercase) validChars += uppercaseChars;
    if (includeLowercase) validChars += lowercaseChars;
    if (includeNumbers) validChars += numberChars;
    if (includeSymbols) validChars += symbolChars;
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      setGeneratedPassword('Unable to create a secure password');
      return;
    }
    let newPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      newPassword += validChars[randomIndex];
    }
    setIsGenerating(true);
    setGeneratedPassword(newPassword);
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={300}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <div className='main-content'>
        <h1 className='title'>Password generator</h1>
        <div className='password-container'>
          <input
            className='password-field'
            type='text'
            value={generatedPassword}
            readOnly
            ref={passwordInputRef}
            id = 'password-field'
          />
          <button className='copy-btn' onClick={copyToClipboard}>
            <FaRegCopy />
          </button>
        </div>
        <PasswordStrengthBar password={generatedPassword} />
        <div className="buttons-container">
          <button className={`settings-btn ${isSettingsOpen ? 'hidden' : ''}`} onClick={isGenerating ? "" : toggleSettings}>Settings</button>
          <button className='generate-btn' onClick={generatePassword}>Generate</button>
        </div>
        <Settings
          isSettingsOpen={isSettingsOpen}
          includeUppercase={includeUppercase}
          setIncludeUppercase={setIncludeUppercase}
          includeLowercase={includeLowercase}
          setIncludeLowercase={setIncludeLowercase}
          includeNumbers={includeNumbers}
          setIncludeNumbers={setIncludeNumbers}
          includeSymbols={includeSymbols}
          setIncludeSymbols={setIncludeSymbols}
          passwordLength={passwordLength}
          setPasswordLength={setPasswordLength}
          closeSettings={toggleSettings}
        />
      </div>
    </>
  )
}
export default PasswordGenerator