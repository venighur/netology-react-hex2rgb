import React from 'react';

function Converter() {
  const [form, setForm] = React.useState({
    hexValue: '#e1e1e1',
    rgbValue: 'rgb(225, 225, 225)',
  });
  const [isError, setIsError] = React.useState(false);

  const convert = () => {
    const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    const match = form.hexValue.match(regex);

    if (!match) {
      setForm(prevState => ({
        ...prevState,
        rgb: 'rgb(255, 20, 20)',
      }));
      setIsError(true)
      return;
    }

    const rgb = parseInt(match[1], 16) + ', ' + parseInt(match[2], 16) + ', ' + parseInt(match[3], 16);

    setForm(prevState => ({
      ...prevState,
      rgbValue: 'rgb(' + rgb + ')',
    }));
    setIsError(false);
  }

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prevState => ({
      ...prevState,
      hexValue: e.target.value,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      convert();
    }
  };

  return (
    <div className="container" style={{backgroundColor: isError ? 'red' : form.rgbValue}}>
      <form className="form">
        <input
          className="form-input hex"
          onChange={handleHexChange}
          onKeyDown={handleKeyDown}
          value={form.hexValue}
        />
        <input
          className="form-input rgb"
          style={{
            backgroundColor: isError ? 'darkred' : 'white',
            color: isError ? 'white' : 'black',
          }}
          value={isError ? 'Ошибка!' : form.rgbValue}
          readOnly
        />
      </form>
    </div>
  );
}

export default Converter;
