# Modal
Компонент для отображения модального окна. Окно располагается поверх интерфейса затемняя его.

Компонент отлавливает клик вне модального окна и нажатие на `Esc`.

```tsx
const [ isModalOpen, setIsModalOpen ] = useState(false);

return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        Привет участникам соревнований!
    </Modal>
);
```

## Свойства и методы
|Prop name|Type|Default|Description|
|---------|----|-------|-----------|
|isOpen|boolean||Флаг показа|
|onClose|() => void||Обработчик закрытия|
|close?|boolean|true|Флаг того, что надо отрисовать кнопку закрытия|

Компонент сам себя не закрывает, а вызывает функцию `onClose`. Для закрытия необходимо сбросить флаг `isOpen`.
