# DatePicker
Компонент отображающий календарь для выбора даты. Изготовлен для компонента [Date](./Date.md), но может использоваться и самостоятельно, если необходимо статически отобразить выбор даты через календарь.

```jsx
const [ date, setDate ] = useState('01.01.2023');

const onPickerChange = (date: DatePickerResult) => {
    const day = `0${date.day}`.slice(-2);
    const month = `0${date.month}`.slice(-2);
    const year = date.year;
    setDate(`${day}.${month}.${year}`);
};

return(
    <Form>
        <DatePicker
            year={date.split('.')[2]}
            month={date.split('.')[1]}
            day={date.split('.')[0]}
            onChange={onPickerChange}
        />
    </Form>
);
```

## Свойства и методы
|Prop name|Type|Default|Description|
|---------|----|-------|-----------|
|year?|string \| number||Год|
|month?|string \| number||Месяц|
|day?|string \| number||День|
|onChange?|(result: DatePickerResult) => void||Обработчик ввода|

```ts
type DatePickerResult = {
    year: number;
    month: number;
    day: number;
};
```

## Особенности
Если при инициализации элемент даты не указан или указан в неверном формате, будет использовано значение из текущей даты.

Названия месяцев в календаре выводится на языке локали пользователя.
