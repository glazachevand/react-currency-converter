import React from 'react';
import { Block } from './Block';
import beginData from './data.json';
import { DataRates } from './types';
import './index.scss';

// API: https://www.cbr-xml-daily.ru/latest.js или https://cdn.cur.su/api/latest.json

function App() {
  // названия валют
  const [fromCurrency, setFromCurrency] = React.useState('USD');
  const [toCurrency, setToCurrency] = React.useState('RUB');

  // значение в инпутах
  const [fromPrice, setFromPrice] = React.useState(1);
  const [toPrice, setToPrice] = React.useState(0);

  // курсы валют
  let dataRates: DataRates = beginData.rates;

  // открыть окно с выбором валют
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    //fetch('https://cdn.cur.su/api/latest.json')
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then((res) => res.json())
      .then((data) => {
        dataRates = data.rates;
        dataRates.RUB = 1;
      })
      .catch((err) => {
        console.warn(err);
        alert('Не удалось получить информацию с сервера - с сайта https://www.cbr-xml-daily.ru/latest.js. Показаны данные за 2022-11-17');
      })
      .finally(() => onChangeFromPrice(1));
  }, []);

  const onChangeFromPrice = (value: number) => {
    const result = (value / dataRates[fromCurrency]) * dataRates[toCurrency];
    setFromPrice(value);
    setToPrice(+result.toFixed(3));
  };

  const onChangeToPrice = (value: number) => {
    const result = (value / dataRates[toCurrency]) * dataRates[fromCurrency];
    setToPrice(value);
    setFromPrice(+result.toFixed(3));
  };

  const onChangeCurrencyTable = (key: string, side: string) => {
    if (side === 'left') {
      setFromCurrency(key);
    } else if (side === 'right') {
      setToCurrency(key);
    }
    setOpen(false);
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [toCurrency, fromCurrency]);

  return (
    <div className="app">
      <h1 className="title">Конвертер валют</h1>
      <div className="row">
        <Block
          value={fromPrice}
          currency={fromCurrency}
          onChangeCurrency={setFromCurrency}
          onChangeValue={onChangeFromPrice}
          dataRates={dataRates}
          onChangeCurrencyTable={onChangeCurrencyTable}
          side="left"
          open={open}
          setOpen={setOpen}
          key="left"
        />
        <Block
          value={toPrice}
          currency={toCurrency}
          onChangeCurrency={setToCurrency}
          onChangeValue={onChangeToPrice}
          dataRates={dataRates}
          onChangeCurrencyTable={onChangeCurrencyTable}
          side="right"
          open={open}
          setOpen={setOpen}
          key="right"
        />
      </div>
    </div>
  );
}

export default App;
