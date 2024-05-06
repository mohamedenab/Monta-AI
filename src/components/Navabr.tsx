import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faXmark} from "@fortawesome/free-solid-svg-icons";

export const Navabr = ({toggleVisible, visible}: {
    toggleVisible: () => void,
    visible: boolean,
}) => {
    return (
        <>
            <div className="navbar bg-base-100 lg:hidden">
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost" onClick={toggleVisible}>
                        {visible ?
                            <FontAwesomeIcon icon={faXmark}/> : <FontAwesomeIcon icon={faBars}/>
                        }
                    </button>
                </div>
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Monta AI</a>
                </div>
            </div>
        </>
    );
};
