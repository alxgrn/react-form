# Confirm
Компонент для отображения модального окна по смыслу аналогичного `window.confirm()`.

Компонент для своей работы использует [Modal](./Modal.md) и [Message](./Message.md), поэтому наследует их свойства.

```tsx
const [ isConfirmOpen, setIsConfirmOpen ] = useState(false);

return (
    <Confirm
        icon='https://dailytelefrag.ru/warning.png'
        type='square'
        isOpen={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => setIsConfirmOpen(false)}
        title='Заголовок'
        message='Тестовое сообщение'
        cancel='Отменить'
        confirm='Продолжить'
        cancelType='Error'
        confirmType='Success'
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
|onCancel|() => void||Обработчик клика по кнопке отмены|
|onConfirm|() => void||Обработчик клика по кнопке подтверждения|
|cancel?|string|`Cancel`|Надпись на кнопке отмены|
|confirm?|string|`Confirm`|Надпись на кнопке подтверждения|
|cancelType?|`Accent`\|`Error`\|`Success`\|`Default`|`Accent`|Тип кнопки отмены|
|confirmType?|`Accent`\|`Error`\|`Success`\|`Default`|`Error`|Тип кнопки подтверждения|

Клик вне модального окна или по кнопке закрытия модального окна приравнивается к клику по кнопке отмены.