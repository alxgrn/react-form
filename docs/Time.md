# Time
Компонент выбора времени.

```jsx
const [ time, setTime ] = useState('13:45');

return(
    <Form>
        <Time
            id='time'
            step={5}
            value={time}
            onChange={setTime}
            label='Choose time'
        />
    </Form>
);
```

## Свойства и методы
|Prop name|Type|Default|Description|
|---------|----|-------|-----------|
|id|string||Идентификатор элемента ввода|
|step?|number|1|Шаг вывода списка выбора минут|
|value|string||Значение элемента ввода в формате ЧЧ:ММ|
|onChange|(date: string) => void||Обработчик ввода в формате ЧЧ:ММ|
|label?|string \| null||Название элемента ввода|
|top?|string \| null \| React.ReactNode||Текст перед элементом ввода|
|bottom?|string \| null \| React.ReactNode||Текст под элементом ввода|
|required?|boolean \| null|false|Флаг обязательности для заполнения|
|disabled?|boolean \| null|false|Флаг запрещения ввода данных|

## Особенности
При инициализации компонент проверяет корректность формата и сбрасывает значение часов и/или минут в ноль, если они не указаны или указаны в неверном диапазоне.
