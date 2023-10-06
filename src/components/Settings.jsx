import './Settings.css';

const Settings = ({
  isSettingsOpen,
  includeUppercase,
  setIncludeUppercase,
  includeLowercase,
  setIncludeLowercase,
  includeNumbers,
  setIncludeNumbers,
  includeSymbols,
  setIncludeSymbols,
  passwordLength,
  setPasswordLength
}) => {

  return (
    <div className={`settings-form ${isSettingsOpen ? 'open' : ''}`}>
      <div className='settings-header'>Settings</div>
      <div className='settings-inputs'>
        <label className='label toggle'>
          <input
            className='input'
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
            id = 'uppercase'
          />
          <span className='slider'></span>
          Uppercase
        </label>
        <label className='label toggle'>
          <input
            className='input'
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
            id = 'lowercase'
          />
          <span className='slider'></span>
          Lowercase
        </label>
        <label className='label toggle'>
          <input
            className='input'
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
            id = 'numbers'
          />
          <span className='slider'></span>
          Numbers
        </label>
        <label className='label toggle'>
          <input
            className='input'
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
            id = 'symbols'
          />
          <span className='slider'></span>
          Symbols
        </label>
        <label htmlFor='length' className='label length'>
          Length: {passwordLength}
        </label>
        <input
          className='input range'
          type="range"
          min="2"
          max="64"
          value={passwordLength}
          onChange={(e) => setPasswordLength(parseInt(e.target.value))}
          id="length"
        />
      </div>
    </div>
  );
}

export default Settings;
