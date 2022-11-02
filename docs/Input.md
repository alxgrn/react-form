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
|hint?|string||Подсказка под элементом ввода|
|error?|string||Текст ошибки под элементом ввода|
|className?|string||Имя css-класса для установки элементу ввода|
|required?|boolean||Флаг обязательности для заполнения|
|disabled?|boolean||Флаг запрещения ввода данных|
|limit?|number||Ограничитель на число вводимых символов|
|rows?|number|5|Для textarea число строк|
