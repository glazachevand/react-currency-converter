import React from 'react';
import { Block } from './Block';
import './index.scss';

// API: https://cdn.cur.su/api/
// Запрос: https://cdn.cur.su/api/latest.json
function App() {
  // названия валют
  const [fromCurrency, setFromCurrency] = React.useState('USD');
  const [toCurrency, setToCurrency] = React.useState('RUB');

  // значение в инпутах
  const [fromPrice, setFromPrice] = React.useState(1);
  const [toPrice, setToPrice] = React.useState(0);

  // курсы валют
  const ratesRef = React.useRef<{ [item: string]: number }>({});

  React.useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then((res) => res.json())
      .then((data) => {
        ratesRef.current = data.rates;
        onChangeFromPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert('Не удалось получить информацию с сервера - с сайта https://cdn.cur.su/api');
      });
  }, []);

  const onChangeFromPrice = (value: number) => {
    const result = (value / ratesRef.current[fromCurrency]) * ratesRef.current[toCurrency];
    setFromPrice(value);
    setToPrice(+result.toFixed(5));
  };

  const onChangeToPrice = (value: number) => {
    const result = (value / ratesRef.current[toCurrency]) * ratesRef.current[fromCurrency];
    setToPrice(value);
    setFromPrice(+result.toFixed(5));
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <h1 className="title">Конвертер валют</h1>
      <div className="row">
        <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
        <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice} />
      </div>
    </div>
  );
}

export default App;
