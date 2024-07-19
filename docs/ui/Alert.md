# Alert
Компонент для отображения модального окна по смыслу аналогичного `window.alert()`.

Компонент для своей работы использует [Modal](./Modal.md) и [Message](./Message.md), поэтому наследует их свойства.

```tsx
const [ isAlertOpen, setIsAlertOpen ] = useState(false);

return (
    <Alert
        icon='https://dailytelefrag.ru/warning.png'
        type='round'
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title='Заголовок'
        message='Тестовое сообщение'
        close='Понятно'
        closeType='Success'
    />
);
```

## Свойства и методы
|Prop name|Type|Default|Description|
|---------|----|-------|-----------|
|icon?|string \| null||Ссылка на SRC иконки|
|type?|`round` \| `square`|`square`|Тип иконки: круглая или квадратная|
|title?|string \| null||Заголовок сообщения|
|message|string \| ReactNode||Текст сообщения|
|isOpen|boolean||Флаг показа|
|onClose|() => void||Обработчик закрытия|
|close?|string|`Ok`|Надпись на кнопке закрытия|
|closeType?|`Accent`\|`Error`\|`Success`\|`Default`|`Accent`|Тип кнопки закрытия|

Клик вне модального окна или по кнопке закрытия модального окна приравнивается к клику по кнопке закрытия.