import { SigninLink } from "./signlink";


export function ForGuest() {
    return (
        <div>
            <p>Здравствуйте! Вы зашли как гость.</p>
            <p>Для гостей доступен только просмотр и поиск. Если вас это устраивает, авторизация необязательна.</p>
            <p>Если этого мало и вы хотите получить возможность что-либо редактировать, войдите в свой аккаунт.</p>
            <SigninLink />
        </div>
    )
}

export function ForUser ({role} : {role: string}) {
    if (role == "ADMIN") {
        return (
            <ForAdmin />
        )
    }

    if (role == "TEACHER") {
        return (
            <ForTeacher />
        )
    }

    if (role == "STUDENT") {
        return (
            <ForStudent />
        )
    }

    return (
        <>???</>
    )
}



function ForAdmin() {
    return (
        <>
        <p>Вы зашли как администратор.</p>
        <div className = "border-2 border-gray-500 rounded-lg pl-2 w-max mt-2">
            <details className = "collapse" tabIndex={0}>
                <summary className = "collapse-title font-medium">
                    <b>Что это даёт?</b>
                </summary>
                <div className = "collapse-content w-max" >
                    <p>Полную власть.</p>
                    <p>Например:</p>
                        <ul className="list-disc list-inside">
                            <li>Добавление пользователей</li>
                            <li>Редактирование своего профиля пользователя</li>
                            <li>Редактирование других пользователей (кроме имени пользователя, которое не видно никому, кроме самого пользователя)</li>
                            <li>Привязка преподавателя к аккаунту пользователя</li>
                            <li>Просмотр, добавление, редактирование и удаление всего остального</li>
                        </ul>
                </div>
            </details>
        </div>
        </>
    )
}


function ForTeacher() {
    return (
        <>
        <p>Вы зашли как преподаватель.</p>
        <div className = "border-2 border-gray-500 rounded-lg pl-2 w-max mt-2">
            <details className = "collapse" tabIndex={0}>
                <summary className = "collapse-title font-medium">
                    <b>Что это даёт?</b>
                </summary>
                <div className = "collapse-content w-max" >
                    <ul className = "list-disc list-inside">
                        <li>Редактирование своего профиля пользователя</li>
                        <li>Редактирование своего расписания</li>
                    </ul>
                </div>
            </details>
        </div>
        </>
    )
}


function ForStudent() {
    return (
        <>
        <p>Вы зашли как студент.</p>
        <div className = "border-2 border-gray-500 rounded-lg pl-2 w-max mt-2">
            <details className = "collapse" tabIndex={0}>
                <summary className = "collapse-title font-medium">
                    <b>Что это даёт?</b>
                </summary>
                <div className = "collapse-content w-max" >
                    <ul className = "list-disc list-inside">
                        <li>Редактирование своего профиля пользователя</li>
                        <li>на этом всё :)</li>
                    </ul>
                </div>
            </details>
        </div>
        </>
    )
}
