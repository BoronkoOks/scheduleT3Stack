import { updateButtonStyle, divForm } from "~/styles/daisystyles"


export default function Logout () {
    const inputClassStyle = "input input-bordered"

    return (
        <form className = "align-middle w-full">
            <button type="submit" className={updateButtonStyle}>
                Выйти
            </button>
        </form>
    )
}