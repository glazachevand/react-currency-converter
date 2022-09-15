import React from 'react';

const defaultCurrencies = [
  { title: 'RUB', translation: 'Российский рубль' },
  { title: 'USD', translation: 'Доллар США' },
  { title: 'EUR', translation: 'ЕВРО' },
  { title: 'GBP', translation: 'Фунт стерлингов' },
  { title: 'BYN', translation: 'Белорусский рубль' },
  { title: 'KZT', translation: 'Казахстанский тенге' },
];

type BlockProps = {
  value: number;
  currency: string;
  onChangeValue: (value: number) => void;
  onChangeCurrency: (cur: string) => void;
};

export const Block: React.FC<BlockProps> = ({
  value,
  currency,
  onChangeValue,
  onChangeCurrency,
}) => (
  <div className="block">
    <ul className="currencies">
      {defaultCurrencies.map((cur) => (
        <li
          onClick={() => onChangeCurrency(cur.title)}
          className={currency === cur.title ? 'active' : ''}
          key={cur.title}
          title={cur.translation}>
          {cur.title}
        </li>
      ))}
    </ul>
    <input
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeValue(Number(e.target.value))}
      value={String(value)}
      type="number"
      placeholder={'0'}
    />
  </div>
);
