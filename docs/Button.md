# Button
Компонент для отображения кнопки.

```jsx
const onClick = () => {
    window.alert('Button clicked!');
};

return(
    <Form>
        <Button
            label='My button'
            onClick={() => onClick()}
        />
    </Form>
);
```

## Свойства и методы
|Prop name|Type|Default|Description|
|---------|----|-------|-----------|
|label?|string||Текст кнопки|
|type?|`Submit`\|`Error`\|`Success`\|`Cancel`||Тип кнопки|
|disabled?|boolean|false|Флаг отображения запрещенного варианта|
|onClick?|() => void||Обработчик клика|
