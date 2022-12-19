# Files
Компонент для выбора файлов.

Список выбранных файлов отображается в элементе ввода. Указывается размер каждого файла и общий размер всех выбранных файлов. Для удаления файла из списка выбора надо кликнуть по его имени.

```jsx
// Тестовый файл
const file = new File(['CONTENT'], 'test.txt', { type: 'text/plain;charset=utf-8' });
// Пример инициализации
const [ files, setFiles ] = useState<File[]>([file]);
// Отработка выбора
const onFilesChange = (files: File[]) => {
    setFiles(files);
};
// Пример рендеринга
return(
    <Form>
        <Fieldset
            legend='File legend'
            required={true}
        >
            <Files
                id='file'
                label='File choice'
                files={files}
                onChange={onFilesChange}
            />
        </Fieldset>
    </Form>
);
```

## Свойства и методы
|Prop name|Type|Default|Description|
|---------|----|-------|-----------|
|id|string||Идентификатор элемента ввода|
|onChange|(files: File[]) => void||Обработчик выбора|
|label|string||Текст на кнопке выбора|
|top?|string||Текст над элементом ввода|
|bottom?|string||Текст под элементом ввода|
|accept?|string||Фильтр разрешенных для выбора типов файлов|
|multiple?|boolean|false|Флаг разрешения множественного выбора|
|required?|boolean|false|Флаг обязательности для заполнения|
|disabled?|boolean|false|Флаг запрета выбора|

