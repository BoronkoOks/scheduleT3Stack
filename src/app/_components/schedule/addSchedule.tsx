import { updateButtonStyle, divForm } from "~/styles/daisystyles"

export function AddSchedule () {
    const labelStyle = "mx-4"
    return (

        <form className = "">
            <div className = "ml-6">
                <div className = "mt-4">
                <label className = {labelStyle}>Неделя: </label>
                <select>
                    <option value = "Чётная">Чётная</option>
                    <option value = "Нечётная">Нечётная</option>
                </select>

                <label className = {labelStyle}>День: </label>
                    <select >
                    <option value = "Понедельник">Понедельник</option>
                    <option value = "Вторник">Вторник</option>
                    <option value = "Среда">Среда</option>
                    <option value = "Четверг">Четверг</option>
                    <option value = "Пятница">Пятница</option>
                    <option value = "Суббота">Суббота</option>
                </select>

                <label className = {labelStyle}>Пара: </label>
                <select>
                    <option value = "1">1</option>
                    <option value = "2">2</option>
                    <option value = "3">3</option>
                    <option value = "4">4</option>
                    <option value = "5">5</option>
                </select>
                </div>

                <div className = "mt-4">
                <label className = {labelStyle}>Дисциплина: </label>
                <select>
                    <option>[Список дисциплин специальности]</option>
                </select>
                </div>

                <div className = "mt-4">
                <label className = {labelStyle}>Тип занятия: </label>
                <select>
                    <option value = "Лекция">Лекция</option>
                    <option value = "Практика">Практика</option>
                    <option value = "Лабораторная">Лабораторная</option>
                    <option value = "кср">кср</option>
                    <option value = "крб">крб</option>
                    <option value = "кпр">кпр</option>
                </select>
                </div>

                <div className = "mt-4">
                <label className = {labelStyle}>Преподаватель: </label>
                <select >
                <option value = "кпр">[Список преподавателей  / опр.]</option>
                </select>
                </div>

                <div className = "mt-4">
                <label className = {labelStyle}>Группа: </label>
                <select>
                <option>[Список групп / опр.]</option>
                </select>

                <label className = {labelStyle}>Подгруппа: </label>
                <select>
                    <option value = "Все">Все</option>
                    <option value = "1">1</option>
                    <option value = "2">2</option>
                </select>
                </div>

                <div className = "mt-4">
                <label className = {labelStyle}>Кабинет: </label>
                <select>
                    <option>[Список / опр.]</option>
                </select>
                <label className = "ml-4">[хар-ки кабинета]</label>
                </div>

                <div className = "mt-4">
                <button className = {updateButtonStyle}>Сохранить</button>
                </div>
            </div>
        </form>
    )
}