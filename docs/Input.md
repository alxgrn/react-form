# Input
Компонент ввода текста.

```jsx
const [ value, setValue ] = useState('');

return(
    <Form>
        <Input
            id='id'
            value={value}
            onChange={setValue}
        />
    </Form>
);
```

## Свойства и методы
|Prop name|Type|Default|Description|
|---------|----|-------|-----------|
|id|string||Идентификатор элемента ввода|
|value|string||Значение элемента ввода|
|onChange|(value: string) => void||Обработчик ввода|
|type?|"text" \| "password" \| "textarea"|"text"|Тип элемента ввода|
|label?|string||Название элемента ввода|
|placeholder?|string||Подсказка внутри поля ввода|
|top?|string||Текст перед элементом ввода|
|bottom?|string||Текст под элементом ввода|
|required?|boolean|false|Флаг обязательности для заполнения|
|disabled?|boolean|false|Флаг запрещения ввода данных|
|limit?|number||Ограничитель на число вводимых символов|
|rows?|number|5|Для textarea число строк|

## Особенности
При отсуствии ввода и одновременном включении флага `required` поле будет подсвечиваться как ошибочное, а кнопка отправки данных у формы будет обозначена как некликабельная.