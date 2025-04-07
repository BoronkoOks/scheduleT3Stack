import { updateButtonStyle, divForm } from "~/styles/daisystyles"


export default function SignForm () {
    const inputClassStyle = "input input-bordered"

    return (
        <form className = "align-middle w-full">
        <div className = {divForm}>
            <label className = "mr-2 mt-1"><b>Вход</b></label>
            <div className= "mx-auto flex align-middle mb-4">
                <label className = "mr-6 mt-2">Email</label>
                <input
                    type="email"
                    name="email"
                    required
                    className={inputClassStyle + " w-52"}
                />
            </div>
            <div className= "flex align-middle mb-4">
                <label className = "mr-2 mt-2">Пароль</label>
                <input
                    type="password"
                    name="password"
                    required
                    className={inputClassStyle + " w-52"}
                />
            </div>
            <button type="submit" className={updateButtonStyle}>
                Войти
            </button>
        </div>
        </form>
    )
}